import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <div className="px-4 py-8">
        <div className="header flex flex-row justify-between">
          <h1 className="logo text-natural-700 font-bold">devfinder</h1>
          <div>Dark</div>
        </div>
        <div className="searchbar"></div>
        <div className="results">
          <div className="userPFP"></div>
          <div className="userInfo">
            <div className="userName"></div>
            <div className="userIntro"></div>
            <div className="commits"></div>
            <div className="links"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
