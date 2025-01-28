import { useEffect, useRef } from 'react';
import { transform } from '@babel/standalone'; // Correct named import

const Preview = ({ code, packages, setError }) => {
  const iframeRef = useRef();
  const CDN_URL = 'https://cdn.skypack.dev';

  useEffect(() => {
    const transpileCode = async () => {
      try {
        // Use the directly imported transform function
        const transpiled = transform(code, {
          presets: ['react'],
        }).code;

        const packageScripts = packages
          .map(pkg => `<script src="${CDN_URL}/${pkg}"></script>`)
          .join('\n');

        const html = `
          <html>
            <head>
              <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
              ${packageScripts}
            </head>
            <body>
              <div id="root"></div>
              <script>
                try {
                  ${transpiled}
                  ReactDOM.render(React.createElement(App), document.getElementById('root'));
                } catch (err) {
                  window.parent.postMessage({ error: err.toString() }, '*');
                }
              </script>
            </body>
          </html>
        `;

        iframeRef.current.srcdoc = html;
      } catch (err) {
        setError(err.toString());
      }
    };

    window.addEventListener('message', (e) => {
      if (e.data.error) setError(e.data.error);
    });

    transpileCode();
  }, [code, packages, setError]);

  return (
    <iframe 
      ref={iframeRef} 
      title="preview" 
      className="preview"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default Preview;