import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  // const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setInput(e.target.value);
  // };

  const inputSubmitHandler = async () => {
    if (!ref.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

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

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );

    // setCode(result.outputFiles[0].text);

    // This is used to run the code in the iframe but it is not safe
    // There are certain things that can be done to make it safe
    // eval(result.outputFiles[0].text);
  };

  const initEsbuild = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    initEsbuild();
  }, []);

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);

        
      </script>
    </body>
  </html>
  
  `;

  return (
    <>
      <h1>Hello world</h1>
      <div>
        <CodeEditor
          onChange={(value) => setInput(value)}
          initValue="// Start writing your code..."
        />

        <button onClick={inputSubmitHandler}>Submit</button>
      </div>
      <div>
        <iframe
          title="Preview"
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-scripts"
        ></iframe>
      </div>
    </>
  );
}

export default App;
