import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/PreviewWindow";

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef<any>();

  const inputSubmitHandler = async () => {
    if (!ref.current) {
      return;
    }

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
      <div>
        <CodeEditor
          onChange={(value) => setInput(value)}
          initValue="// Start writing your code.."
        />

        <button onClick={inputSubmitHandler}>Submit</button>
      </div>
      <div>
        <Preview code={code} html={html} />
      </div>
    </>
  );
}

export default App;
