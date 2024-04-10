import { useState } from "react";
import Graph from "./Components/graph";
import MainPage from "./Components/main_page";
import { useEffect } from "react";

function App() {
  const [color_mode, setColor_mode] = useState(false);

  useEffect(() => {
    if (color_mode)
    {
      document.body.className = "dark";
    }
    else
    {
      document.body.className = "";
    }
  },[color_mode])

  return (
    <div>
      <div className={`all-container`}>
        <MainPage color_mode={color_mode} setColor_mode={setColor_mode} />
        <div
          className={color_mode ? "graph-container_dark" : "graph-container"}
        >
          <Graph />
        </div>
      </div>
      <footer className="bottom">
        <p className={`center_text ${color_mode ? "transclucent-dark" : "transclucent"}`}>© Group 6 Exceed</p>
      </footer>
    </div>
  );
}

export default App;
