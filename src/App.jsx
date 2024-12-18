import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [Password, setPassword] = useState("");
let passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // condition checking
    if(setNumber) str += '012345678';
    if(setCharacters) str += '!@#$%^&*()-_=+[{]}|;:,<.>/?~`';

    for(let i=0; i<length; i++){

      //let char = Math.floor(Math.random() * str.length + 1);
      //pass += str(char)
     pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    };
    setPassword(pass)

  }, [length, setPassword, setNumber, setCharacters]);

  useEffect(()=>{
    generatePassword();
  },[length, generatePassword, setNumber, setCharacters]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [Password])
  return (
    <div className="w-full h-60 max-w-md mx-auto shadow-md rounded-lg px-6 py-3 my-8 bg-gray-800 text-orange-500 text-center">
      <h1 className="text-white text-center my-3 font-bold text-2xl" >Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className='="outline-none w-full py-1 px-3"'
          type="text"
          readOnly
          value={Password}
          ref={passwordRef}
        />
        <button
        className="bg-blue-700 text-white w-1/5 font-bold"
        onClick={copyPassword}
        >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
        <input
         className="flex items-center gap-x-1 cursor-pointer" 
         value={length}
         min={8}
         max={100}
        type="range" 
        onChange={(e)=> setLength(e.target.value)}
        />
        <label className="text-mds">Length : {length}</label>
      </div>
      <div className="lex items-center gap-x-1 mr-1">
        <input 
        value={number}
        onChange={()=> setNumber((prev)=>!prev)}
        type="checkbox"
        defaultChecked={setNumber}
         />
  <label htmlFor="numberInput" className="ml-1">Number</label>
      </div>
      <div>
       <input 
       type="checkbox"
        value={characters}
        onChange={()=> setCharacters((prev)=>!prev)}
        defaultChecked={setCharacters}
        /> 
        <label htmlFor="characterInput" className="ml-1">Character</label>
      </div>
      </div>
    </div>
  );
}

export default App;
