import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import Preview from "./PreviewWindow";
import { useState } from "react";
import { unpkgPathPlugin } from "@/plugins/unpkg-path-plugin";
import { fetchPlugin } from "@/plugins/fetch-plugin";
import { Button } from "../ui/button";

const CodeCell = ({ esRef: ref }: any) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const inputSubmitHandler = async () => {
    if (!ref.current) {
      return;
    }

    try {
      const result = await ref.current.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,

        plugins: [unpkgPathPlugin(), fetchPlugin(input)],

        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
        },
      });

      setCode(result.outputFiles[0].text);
      setError("");
    } catch (error) {
      setError("Bundling Error: Invalid Code Provided by the user");
      setCode("");
    }
  };

  /**
   * We need to handle three types of error
   * 1. Sync Error
   * 2. Async Error
   * 3. Invalid Code request by the user => Bundling Error
   */

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    }

    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.error);
    })

    window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);         
    </script>
  </body>
</html>
`;

  return (
    <div className="w-[50vw] h-[30vh] ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            <CodeEditor
              initValue="// some commeny"
              onChange={(value) => setInput(value)}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            <Preview code={code} html={html} error={error} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Button onClick={inputSubmitHandler}>Submit</Button>
    </div>
  );
};

export default CodeCell;
