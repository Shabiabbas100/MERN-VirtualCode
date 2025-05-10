import React, { useEffect, useState, version } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
 import { useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
import Footer from "../components/Footer";
const api_base_url = import.meta.env.VITE_API_BASE_URL;


const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [editProjId, setEditProjId] = useState("");
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [projects, setProjects] = useState(null);

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash",
    ];

    const options = data
      .filter((runtime) => filteredLanguages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    console.log("Selected language:", selectedOption);
  };

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      // backend me request send kardi
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error(data.msg);
        }
      });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      borderColor: "#555",
      color: "#fff",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      color: "#fff",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#000",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };
  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName("");
          navigate("/editor/" + data.projectId);
        } else {
          toast.error(data.msg);
        }
      });
  };
  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            getProjects();
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        } else {
          toast.error(data.msg);
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        }
      });
  };

 const fullName= localStorage.getItem("fullName");

  return (
    <>
      <div className=" min-h-screen">
        <Navbar />

        <div className="flex flex-col items-center px-5 sm:px-[100px] justify-between mt-5 md:flex-row ">
          {/* Welcome Message */}
          <h3 className="text-3xl font-semibold bg-clip-text  mt-4 text-center uppercase">
  <span className="h-4 inline-block animate-pulseSlow mr-2 text-white">🚀</span>
  Welcome back,{" "}
  <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-red-600 to-pink-700 animate-glowPulse tracking-wider">
    {fullName}
  </span>
  
</h3>




          {/* Create Project Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                setIsCreateModelShow(true);
              }}
              className="btnNormal bg-gradient-to-r from-orange-500 to-orange-800 transition-all hover:from-orange-600 hover:to-orange-900 px-[20px]"

            >
              Create Project
            </button>
          </div>
        </div>

        <div className="projects px-5 sm:px-[100px] mt-5 pb-10">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => {
              return (
                <div
                  key={project._id}
                  className="project w-full p-[15px] mt-4 flex items-center justify-between bg-[#0f0e0e] rounded-lg"
                >
                  <div
                    onClick={() => {
                      navigate("/editor/" + project._id);
                    }}
                    className="flex w-full items-center gap-4"
                  >
                    <img
                      className="w-[100px] h-[80px] object-cover"
                      src={project.projLanguage === "python"
                        ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                        : project.projLanguage === "javascript"
                        ? "https://quintagroup.com/cms/js/js-image/javascript-logo.png"
                        : project.projLanguage === "cpp"
                        ? "https://w7.pngwing.com/pngs/46/626/png-transparent-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template-blue.png"
                        : project.projLanguage === "c"
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uGiVrgFgwrxVhhFCAOPbwOl7rIcl3nYnsg&s"
                        : project.projLanguage === "java"
                        ? "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png"
                        : project.projLanguage === "bash"
                        ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png"
                        : ""}
                      alt=""
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl text-white">{project.name}</h3>
                      <p className="text-sm sm:text-[14px] text-gray-400">
                        {new Date(project.date).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      className="btnNormal bg-blue-500 transition-all hover:bg-blue-600"
                      onClick={() => {
                        setIsEditModelShow(true);
                        setEditProjId(project._id);
                        setName(project.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteProject(project._id);
                      }}
                      className="btnNormal bg-gradient-to-r from-orange-500 to-orange-800 transition-all hover:from-orange-600 hover:to-orange-900 px-[20px]"

                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-2xl font-bold text-red-700">
                ⚠️ No projects found! Start by creating a new one.
              </p>
            </div>
          )}
        </div>

        {/* Create Project Modal */}
        {isCreateModelShow && (
          <div
            onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsCreateModelShow(false);
                setName("");
              }
            }}
            className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
          >
            <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[80%] sm:w-[25vw] h-[auto] bg-[#0F0E0E]">
              <h3 className="text-xl font-bold text-center">Create Project</h3>
              <div className="inputBox mt-4">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="text-black w-full p-2 rounded-md"
                />
              </div>
              <Select
                placeholder="Select a Language"
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
              />
              {selectedLanguage && (
                <>
                  <p className="text-sm text-green-500 mt-2">
                    Selected Language: {selectedLanguage.label}
                  </p>
                  <button
                    onClick={createProj}
                    className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2 w-full"
                  >
                    Create
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {isEditModelShow && (
          <div
            onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsEditModelShow(false);
                setName("");
              }
            }}
            className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
          >
            <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[80%] sm:w-[25vw] h-[auto] bg-[#0F0E0E]">
              <h3 className="text-xl font-bold text-center">Update Project</h3>
              <div className="inputBox mt-4">
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="text-black w-full p-2 rounded-md"
                />
              </div>

              <button
                onClick={updateProj}
                className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2 w-full"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;



