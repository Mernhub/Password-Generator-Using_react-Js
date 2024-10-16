import { useCallback, useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [Cher, setCher] = useState(false);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumberAllowed) str += "123456789";
    if (Cher) str += " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let generated = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(generated);
    }
    setPassword(pass);
  }, [Cher, NumberAllowed, length]);

  useEffect(() => {
    passGen();
  }, [Cher, NumberAllowed, length, passGen]);

  const passRef = useRef(null);
  const passCopy = () => {
    passRef.current?.setSelectionRange(0, password.length);
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Password Generator
        </h1>

        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg text-gray-700 bg-gray-50 outline-none focus:ring-4 focus:ring-purple-500 shadow-lg"
            placeholder="Your Secure Password"
            ref={passRef}
            readOnly
          />
          <button
            className="absolute right-2 top-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={passCopy}
          >
            Copy
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password Length: {length}
          </label>
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-500"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={NumberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            Include Numbers
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={Cher}
              onChange={() => setCher((prev) => !prev)}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            Include Special Characters
          </label>
        </div>

        <button
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 transition-all"
          onClick={passGen}
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
