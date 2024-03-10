import { useState } from "react";
import Graph from "./Components/graph";
import MainPage from "./Components/main_page";

function App() {
  const [color_mode, setColor_mode] = useState(false);
  return (
    <div>
      <div className={`all-container`}>
        <MainPage color_mode={color_mode} setColor_mode={setColor_mode} />
        <div
          className={color_mode ? "graph-container_dark" : "graph-container"}
        >
          <Graph color_mode={color_mode} />
        </div>
      </div>
      <footer className="bottom">
        <p className="center_text transclucent">© Group 6 Exceed</p>
      </footer>
    </div>
  );
}

export default App;
