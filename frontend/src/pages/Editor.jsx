import React, { useEffect, useState,useRef } from "react";
import Navbar from "../components/Navbar";
import EditorVs from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const api_base_url = import.meta.env.VITE_API_BASE_URL;
const Editor = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); 
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      });
  }, [id]);

  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    console.log("Saving code:", trimmedCode);

    fetch(`${api_base_url}/saveProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
        code: trimmedCode, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        toast.error("Failed to save the project.");
      });
  };

    //  Ctrl+S se save karo
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault(); 
        saveProject(); 
      }
    };


   
    useEffect(() => {
      window.addEventListener("keydown", handleSaveShortcut);
      return () => {
        window.removeEventListener("keydown", handleSaveShortcut);
      };
    }, [code]); 

    const runProject = () => {
      fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: data.projLanguage,
          version: data.version,
          files: [
            {
              filename:
                data.name + data.projLanguage === "python"
                  ? ".py"
                  : data.projLanguage === "java"
                  ? ".java"
                  : data.projLanguage === "javascript"
                  ? ".js"
                  : data.projLanguage === "c"
                  ? ".c"
                  : data.projLanguage === "cpp"
                  ? ".cpp"
                  : data.projLanguage === "bash"
                  ? ".sh"
                  : "",
              content: code,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOutput(data.run.output);
          setError(data.run.code === 1 ? true : false);
        });
    };


  const [isOutputVisible, setOutputVisible] = useState(false);
  const [outputHeight, setOutputHeight] = useState(0);
  const touchStartRef = useRef(0);

  const startTouch = (e) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const moveTouch = (e) => {
    const touchEnd = e.touches[0].clientY;
    const diff = touchStartRef.current - touchEnd;
    if (diff > 0) {
     
      setOutputHeight(Math.max(0, outputHeight + diff));
    } else if (diff < 0) {
      
      setOutputHeight(Math.max(0, outputHeight + diff));
    }
  };

  const endTouch = () => {
    if (outputHeight > window.innerHeight * 0.5) {
      setOutputVisible(true);
    } else {
      setOutputVisible(false);
    }
    setOutputHeight(0); 
  };

  return (
    < >
      <Navbar />
      <div
        className="flex flex-col md:flex-row items-center justify-between h-[calc(100vh-178px)] md:h-[calc(100vh-90px)]"
        
      >
        <div className="left w-full md:w-[60%] h-full sticky top-0">
          <EditorVs
            onChange={(newCode) => {
              console.log("New Code:", newCode);
              setCode(newCode || ""); 
            }}
            theme="vs-dark"
            height="98%"
            width="100%"
            language="python"
            value={code}
            options={{
              fontSize: 15, 
              scrollBeyondLastLine: false,
              minimap: { enabled: false }, 
            }}
          />
        </div>

       

       

         <div className="hidden md:block right p-[10px] w-[50%] h-full bg-[#27272a] overflow-y-auto">
           <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px] mb-[10px]">
             <p className="p-0 m-0">Output Window</p>
           <button
             className="btnNormal !w-fit !px-[15px] bg-blue-500 transition-all hover:bg-blue-600"
               onClick={runProject}
             >
               Run
             </button>
             <button
        className="btnNormal !w-fit !px-[12px] bg-blue-500 transition-all hover:bg-blue-600 md:mt-0 mt-auto"
        onClick={saveProject}
      >
        Save Project
      </button>
        </div>
           <pre
             className={`w-full h-[75vh] mt-[10px] ${error ? "text-red-500" : ""}`}
             style={{ textWrap: "nowrap" }}
           >
           {output}
          </pre>
         </div> 
        <div
  className={`block md:hidden right w-full w-[100] bg-[#27272a] transition-all ${
    isOutputVisible ? 'h-[75vh]' : 'h-0'
  } md:h-auto`}
  style={{
    transition: 'height 0.5s ease',
    height: outputHeight ? `${outputHeight}px` : '0',
  }}
  onTouchStart={(e) => window.innerWidth < 768 && startTouch(e)}
  onTouchMove={(e) => window.innerWidth < 768 && moveTouch(e)}
  onTouchEnd={endTouch}
>
  <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[15px] md:px-[30px]">
    <p className="p-0 m-0 text-white">Output</p>
    <div className="flex space-x-2">
      <button
        className="btnNormal !w-fit !px-[20px] bg-green-500 transition-all hover:bg-green-600 md:mt-0 mt-auto"
        onClick={saveProject}
      >
        Save Project
      </button>
      <button
        className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600 md:mt-0 mt-auto"
        onClick={runProject}
      >
        Run
      </button>
    </div>
  </div>
  <pre
    className={`w-full h-full ${error ? "text-red-500" : "text-white"}`}
    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
  >
    {output}
  </pre>
</div>

      </div>
    </>
  );
};





 export default Editor;
