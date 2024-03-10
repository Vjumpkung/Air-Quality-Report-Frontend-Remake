import { useState } from "react";
import Nav_type from "./Nav_type";
import Panel from "./panel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { client } from "../server/axios";

export default function MainPage({ color_mode, setColor_mode }) {
  const [thismode, setThisMode] = useState("temperature");
  const [statusKey, setStatusKey] = useState(
    "temperature_status" || "humidity_status" || "CO_status"
  );
  const [led_state, setLed_state] = useState({
    co: true,
    temperature: true,
    humidity: true,
  });
  const [lastestData, setLastestData] = useState({});

  useEffect(() => {
    client.get("/air_quality/get_most_recent_log/").then((res) => {
      setLastestData(res.data[0]);
    });
    client.get("/air_quality/get_led_status/").then((res) => {
      setLed_state(res.data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      client.get("/air_quality/get_most_recent_log/").then((res) => {
        setLastestData(res.data[0]);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      client.get("/air_quality/get_led_status/").then((res) => {
        setLed_state(res.data);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (thismode === "temperature") {
      setStatusKey("temperature_status");
    }
    if (thismode === "co") {
      setStatusKey("CO_status");
    }
    if (thismode === "humidity") {
      setStatusKey("humidity_status");
    }
  }, [thismode]);

  return (
    <div className="App">
      <div className={color_mode ? "s_container_dark " : "s_container"}>
        <div id="topic_project">Air Quality Report</div>
        <Panel
          TypeOfAir={lastestData[statusKey]}
          thismode={thismode}
          value={lastestData[thismode === "co" ? "CO" : thismode]}
        />
        <Nav_type setThismode={setThisMode} />

        <div className="mini_container">
          <div id="bg_white">◽️ Dark Mode</div>
          <FormControlLabel
            control={
              <Switch
                checked={color_mode}
                onChange={() => {
                  setColor_mode(!color_mode);
                }}
              />
            }
            label={color_mode ? "enable" : "disable"}
          />
        </div>

        <div className="mini_container">
          <div id="bg_white">◽️ LED-SWITCH</div>
          <FormControlLabel
            control={
              <Switch
                checked={led_state[thismode]}
                onChange={() => {
                  setLed_state({
                    ...led_state,
                    [thismode]: !led_state[thismode],
                  });
                  client
                    .post(
                      `/air_quality/${
                        !led_state[thismode] ? "turn_on" : "turn_off"
                      }/${thismode}/`
                    )
                    .then(() => {
                      client.get("/air_quality/get_led_status/").then((res) => {
                        setLed_state(res.data);
                      });
                    });
                }}
              />
            }
            label={led_state[thismode] ? "ON" : "OFF"}
          />
        </div>

        {/* mock only not working */}
        <a className="remove_underline">
          <div id="bottom_project">Remake by vjumpkung</div>
        </a>
      </div>
    </div>
  );
}
