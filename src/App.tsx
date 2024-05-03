import { useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

import "./App.css";
import CodeCell from "./components/shared/CodeCell";

function App() {
  const ref = useRef<any>();

  const initEsbuild = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    initEsbuild();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-12">
        <CodeCell esRef={ref} />
        <CodeCell esRef={ref} />
        <CodeCell esRef={ref} />
      </div>
    </>
  );
}

export default App;
