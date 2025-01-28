import { useState } from 'react';

const PackageManager = ({ packages, setPackages }) => {
  const [input, setInput] = useState('');

  const handleInstall = () => {
    if (input.trim()) {
      setPackages([...packages, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="package-manager">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter package name"
      />
      <button onClick={handleInstall}>Install Package</button>
      <div className="installed-packages">
        {packages.map((pkg, i) => (
          <span key={i}>{pkg}</span>
        ))}
      </div>
    </div>
  );
};

export default PackageManager;