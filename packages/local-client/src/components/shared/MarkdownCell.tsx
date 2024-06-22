import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"

import { useAction } from "@/hooks/use-action"
import { Cell } from "@/state"

interface MarkdownCellProps {
  cell: Cell
}

const MarkdownCell: React.FC<MarkdownCellProps> = ({ cell }) => {
  const { updateCell } = useAction()
  const [editing, setEditing] = useState(true)

  const handleEditorChange = (newValue: any) => {
    updateCell(cell.id, newValue)
  }

  if (editing) {
    return (
      <div className="w-full">
        <div data-color-mode="light">
          <MDEditor
            height={300}
            value={cell.content}
            onChange={handleEditorChange}
          />
        </div>
        <button onClick={() => setEditing(false)}>Close</button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <MDEditor.Markdown source={cell.content} className="p-4 text-left" />
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  )
}

export default MarkdownCell
