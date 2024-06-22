import { Cell, CellTypes } from "@/state"
import CodeCell from "../shared/CodeCell"
import MarkdownCell from "../shared/MarkdownCell"
import ActionBar from "../shared/ActionBar"
import { useState } from "react"
import { Button } from "../ui/button"
import { useAction } from "@/hooks/use-action"

interface CellListItemProp {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProp> = ({ cell }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { insertCellBefore } = useAction()

  let child: JSX.Element

  const addCellHandler = ({ type }: { type: CellTypes }) => {
    insertCellBefore(null, type)
  }

  if (cell.type == "code") {
    child = <CodeCell cell={cell} />
  } else {
    child = <MarkdownCell cell={cell} />
  }

  return (
    <div className=" relative">
      <div>
        <ActionBar cellId={cell.id} />
        <div>{child}</div>
      </div>
      <div>
        <div
          className="mt-4 h-[60px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <div className="absolute bottom-2 gap-8 flex w-full items-center justify-center">
              <Button onClick={() => addCellHandler({ type: "text" })}>
                Markdown
              </Button>
              <Button onClick={() => addCellHandler({ type: "code" })}>
                CodeCell
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CellListItem
