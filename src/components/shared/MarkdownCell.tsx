import MDEditor from "@uiw/react-md-editor";
import React from "react";

const MarkdownCell = () => {
  const [editing, setEditing] = React.useState(true);
  const [value, setValue] = React.useState("### Hello, world!");

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
  };

  if (editing) {
    return (
      <div className="w-[500px]">
        <div data-color-mode="light">
          <MDEditor height={200} value={value} onChange={handleEditorChange} />
        </div>
        <button onClick={() => setEditing(false)}>Close</button>
      </div>
    );
  }

  return (
    <div className="w-[500px]">
      <MDEditor.Markdown source={value} />
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};

export default MarkdownCell;
