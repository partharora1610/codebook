import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import Preview from "./PreviewWindow";
import { Cell } from "@/state/cell.ts";
import { useAction } from "@/hooks/use-action.ts";
import { useTypesSelector } from "@/hooks/use-types-selector.tsx";
import { useEffect } from "react";

interface CodeCellProp {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProp> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const result = useTypesSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    // getting the initial bundle
    if (!result) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

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
              initValue=""
              onChange={(value) => updateCell(cell.id, value)}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            {!result || result.loading ? (
              <div className="">Loading bar</div>
            ) : (
              <Preview code={result.code} html={html} error={result.err} />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeCell;
