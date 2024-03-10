import "./panal.css";

export default function Panel(props) {
  const choose_img = {
    "Very Hot": "very_hot.png",
    Hot: "hot.png",
    Cool: "cool.png",
    "Moderately Cold": "mod_cool.png",
    Cold: "cold.png",
    "Too Dry": "too_dry.png",
    Optimal: "optimal.png",
    "Too Humid": "too_humid.png",
    "Very Good": "very_good.png",
    Good: "good.png",
    Normal: "normal.png",
    "Health affected": "h_affected.png",
    Dangerous: "danger.png",
    CO_Normal: "co_normal.png",
    "Very Cold": "very_cold.png",
  };
  const unit = {
    temperature: "°C",
    co: "unit",
    humidity: "%RH",
  };
  return (
    <div className="container">
      <div className="img_frame">
        {props.TypeOfAir ? (
          <img
            className="icon_po"
            src={choose_img[props.TypeOfAir]}
            alt="1"
            border="0"
          />
        ) : (
          <div
            style={{
              width: "300px",
              height: "300px",
            }}
          ></div>
        )}
      </div>
      <div className="name_po">
        {props.TypeOfAir ? props.TypeOfAir : "Loading..."}
      </div>
      <div className="number">
        {props.value ? props.value + " " + unit[props.thismode] : "Loading..."}
      </div>
      <div id="type_measure">{props.thismode}</div>
    </div>
  );
}
