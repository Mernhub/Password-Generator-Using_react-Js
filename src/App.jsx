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
  }, [Cher, NumberAllowed, length, setPassword]);

  useEffect(() => {
    passGen();
  }, [Cher, NumberAllowed, length, passGen]);

  const passRef = useRef(null);
  let passCopy = () => {
    passRef.current?.setSelectionRange(8, 50);
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="mt-60 max-w-md m-auto bg-transparent rounded-3xl">
        <div
          className="w-full max-w-md mx-auto shadow-md  px-4 py-8 
    font-extrabold text-2xl text-center"
        >
          <h1>Password-Generator</h1>
        </div>
        <div className="w-full max-w-md mx-auto shadow-md p-4  ">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-black"
              placeholder="Password"
              ref={passRef}
              readOnly
            />
            <button
              className="btn outline-none bg-gray-600 text-white
        px-3 py-0.5 shrink-0"
              onClick={passCopy}
            >
              Copy
            </button>
          </div>

          <div>
            <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                <input
                  type="range"
                  min={8}
                  max={50}
                  value={length}
                  className="cursor-pointer "
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label>Length: {length}</label>
                <input
                  type="checkbox"
                  defaultChecked={NumberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                  className="ml-5"
                />
                <label htmlFor="numberInput">Numbers</label>
                <input
                  type="checkbox"
                  defaultChecked={Cher}
                  id="cherInput"
                  onChange={() => {
                    setCher((prev) => !prev);
                  }}
                  className="ml-5"
                />
                <label htmlFor="cherInput">Cheracters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
