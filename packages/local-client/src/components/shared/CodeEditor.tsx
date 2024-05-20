import MonacoEditor from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  initValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initValue, onChange }) => {
  const onEditorChange = (value: string | undefined) => {
    console.log(value);
    onChange(value || "");
  };

  return (
    <MonacoEditor
      onChange={onEditorChange}
      height="50vh"
      width={"70vw"}
      defaultLanguage="javascript"
      defaultValue={initValue}
      theme="vs-dark"
      options={{
        fontSize: 16,
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
export default CodeEditor;
