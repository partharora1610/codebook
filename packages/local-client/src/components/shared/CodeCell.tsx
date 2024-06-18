import { useEffect } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "./CodeEditor"
import Preview from "./PreviewWindow"
import { Cell } from "@/state/cell.ts"
import { useAction } from "@/hooks/use-action.ts"
import { useTypesSelector } from "@/hooks/use-types-selector.tsx"

interface CodeCellProp {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProp> = ({ cell }) => {
  const { updateCell, createBundle } = useAction()
  const result = useTypesSelector((state) => state.bundles[cell.id])
  /**
   * Combine all the code cells before the current cell
   */
  const combinedCode = useTypesSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map((id) => data[id])

    const showFn = `
    import _React from "react"
    import _ReactDOM from "react-dom"

    var show = (value) => {
      const element = document.getElementById("root")
      
      if(value.$$typeof && value.props){
        _ReactDOM.render(value, element)
        return;
      }

      if(typeof value === 'object') element.innerHTML = JSON.stringify(value)
      else element.innerHTML = value;
    }      
  `

    const showFnNoop = `var show = () => {}`

    const code = []

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cell.id) {
          code.push(showFn)
        } else {
          code.push(showFnNoop)
        }

        code.push(c.content)
      }

      if (c.id === cell.id) {
        break
      }
    }
    return code
  })

  useEffect(() => {
    if (!result) {
      createBundle(cell.id, combinedCode.join("\n"))
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, combinedCode.join("\n"))
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [combinedCode.join("\n"), cell.id])

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
`

  return (
    <div className="w-[50vw] h-[30vh] ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            <CodeEditor
              initValue={cell.content}
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
  )
}

export default CodeCell
