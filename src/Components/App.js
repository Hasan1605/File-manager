import React, { useState } from "react";
import Lock from "./Components/Lock/Lock";
import HomeExplorer from "./pages/homeExplorer";
import Home from "./pages/Home";
import "./styles/main.scss";
import ContextContainer from "./Components/Context/ContainerContext";

function App() {
  const [home, sethome] = useState(false);
  console.log(home);

  console.log(localStorage.getItem('password'));
  if (JSON.parse(localStorage.getItem('password') !== null && home !== true)) {
    sethome(true)
  }
  return (
    <div className="App">
      <>
        {home ?
          <ContextContainer><HomeExplorer /></ContextContainer> :
          <Home savechanges={() => { sethome(true) }} />
        }
      </>
    </div>
  );
}

export default App;
