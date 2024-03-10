import React, { useState } from "react";

import "./nav_type.css";

export default function Nav_type(props) {
  const [point, setPoint] = useState("animation start-M");
  function tab_F() {
    props.setThismode("co");
    setPoint("animation start-F");
  }
  function tab_M() {
    props.setThismode("temperature");
    setPoint("animation start-M");
  }
  function tab_L() {
    props.setThismode("humidity");
    setPoint("animation start-L");
  }
  return (
    <nav>
      <a herf="/" onClick={tab_F}>
        CO
      </a>
      <a herf="/" onClick={tab_M}>
        Temperature
      </a>
      <a herf="/" onClick={tab_L}>
        Humidity
      </a>
      <div className={point}></div>
    </nav>
  );
}
