process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const userModel = require("../models/userModel");
  var bcrypt = require('bcryptjs');
  const projectModel = require("../models/projectModel");
  const nodemailer = require('nodemailer');   // user feedback lene ke liye
  var jwt = require('jsonwebtoken');
   require("dotenv").config();
  const secret = process.env.SECRET_KEY;

  function getStartupCode(language) {
  const startupCodes = {
    python: 'print("Hello World")',
   java: 'public class Main {\n' +
  '    public static void main(String[] args) {\n' +
  '        System.out.println("Hello World");\n' +
  '    }\n' +
  '}',
    javascript: 'console.log("Hello World");',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}',
    bash: 'echo "Hello World"'
  };

  return startupCodes[language.toLowerCase()] || 'Language not supported';
}

 
      
  exports.signUp = async (req, res) => {
  try {
         
    let { email, pwd, fullName } = req.body;
    let emailCon = await userModel.findOne({ email: email });

    if (emailCon) {
      return res.status(400).json({
        success: false,
        msg: "Email already exist"
      })
    }


     bcrypt.genSalt(8, function (err, salt) {
      bcrypt.hash(pwd, salt, async function (err, hash) {

        let user = await userModel.create({
          email: email,
          password: hash,
          fullName: fullName
        });

        return res.status(200).json({
          success: true,
          msg: "User created successfully",
        });

      });
    });

  } 


   catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    let { email, pwd } = req.body;

    // Start timing the DB lookup
    console.time('findUser');

    // Only fetch the password and name to reduce payload
    let user = await userModel
      .findOne({ email: email })
      .select("password fullName") // only needed fields
      .lean(); // plain JS object, faster

    console.timeEnd('findUser');

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    // bcrypt.compare is async, let's use async/await instead of callback
    const match = await bcrypt.compare(pwd, user.password);

    if (match) {
      let token = jwt.sign({ userId: user._id }, secret);

      return res.status(200).json({
        success: true,
        msg: "User logged in successfully",
        token,
        fullName: user.fullName
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Invalid password"
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};


exports.createProject = async (req, res) => {
  try {

    let { name, projLanguage, token, version } = req.body;
    let decoded = jwt.verify(token, secret);
    
    let user = await userModel.findOne({ _id: decoded.userId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.create({
      name: name,
      projLanguage: projLanguage,
      createdBy: user._id,
      code: getStartupCode(projLanguage),
      version: version
    });


    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      projectId: project._id
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};
exports.saveProject = async (req, res) => {
  try {

    let { token, projectId, code } = req.body;
    console.log("DATA: ",token, projectId, code)
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.findOneAndUpdate({ _id: projectId }, {code: code});

    return res.status(200).json({
      success: true,
      msg: "Project saved successfully"
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
}; 
exports.getProjects = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // Use filtering by createdBy and sorting by date to leverage the index
    let projects = await projectModel
      .find({ createdBy: user._id })
      .sort({ date: -1 })    // Sort by newest first
      .limit(50);            // Limit results to 50 for faster response

    return res.status(200).json({
      success: true,
      msg: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getProject = async (req, res) => {       // this Api will fetch an individual project💘
  try {

    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    let project = await projectModel.findOne({ _id: projectId });

    if (project) {
      return res.status(200).json({
        success: true,
        msg: "Project fetched successfully",
        project: project
      });
    }
    else {
      return res.status(404).json({
        success: false,
        msg: "Project not found"
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};
exports.deleteProject = async (req, res) => {
  try {

    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    let project = await projectModel.findOneAndDelete({ _id: projectId });

    return res.status(200).json({
      success: true,
      msg: "Project deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};
exports.editProject = async (req, res) => {
  try {

    let {token, projectId, name} = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.findOne({ _id: projectId });
    if(project){
      project.name = name;
      await project.save();
      return res.status(200).json({
        success: true,
        msg: "Project edited successfully"
      })
    }
    else{
      return res.status(404).json({
        success: false,
        msg: "Project not found"
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.EMAIL_USER,   // Recipient address
      subject: subject || 'New Contact Form Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      msg: 'Message sent successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};





