import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={(value) => setCode(value)}
      options={{
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;