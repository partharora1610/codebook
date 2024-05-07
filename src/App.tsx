import { useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { Provider } from "react-redux";
import { store } from "./state";
import MarkdownCell from "./components/shared/MarkdownCell";
// import CodeCell from "./components/shared/CodeCell";
import "./App.css";

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
      <Provider store={store}>
        <div className="flex flex-col gap-12">
          <MarkdownCell />
        </div>
      </Provider>
    </>
  );
}

export default App;
