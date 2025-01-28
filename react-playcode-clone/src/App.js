import { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable'; // Correct import
import Editor from './components/Editor';
import Preview from './components/Preview';
import PackageManager from './components/PackageManager';

// Import resizable styles
import 'react-resizable/css/styles.css';

function App() {
  const [code, setCode] = useState(
    `import React from 'react';\n\nexport default () => <h1>Hello World</h1>;`
  );
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');

  return (
    <div className="app">
      <div className="header">
        <h1>React Playcode Clone</h1>
        <PackageManager packages={packages} setPackages={setPackages} />
      </div>
      <div className="editor-container">
        <Resizable 
          width={800} 
          height={600}
          resizeHandles={['e']}
          onResize={(e, { size }) => console.log(size)} // Add resize handler
        >
          <div style={{ width: '100%', height: '100%' }}>
            <Editor code={code} setCode={setCode} />
          </div>
        </Resizable>
        <Preview code={code} packages={packages} setError={setError} />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;