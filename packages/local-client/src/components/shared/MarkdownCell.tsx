import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useAction } from "@/hooks/use-action";
import { Cell } from "@/state";

interface MarkdownCellProps {
  cell: Cell;
}

const MarkdownCell: React.FC<MarkdownCellProps> = ({ cell }) => {
  const { updateCell } = useAction();
  const [editing, setEditing] = useState(true);

  const handleEditorChange = (newValue: any) => {
    updateCell(cell.id, newValue);
  };

  if (editing) {
    return (
      <div className="w-[500px]">
        <div data-color-mode="dark">
          <MDEditor
            height={200}
            value={cell.content}
            onChange={handleEditorChange}
          />
        </div>
        <button onClick={() => setEditing(false)}>Close</button>
      </div>
    );
  }

  return (
    <div className="w-[500px]">
      <MDEditor.Markdown source={cell.content} />
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};

export default MarkdownCell;
