import { useEffect } from "react";
import { useState } from "react";
import { client } from "../server/axios";
import LineGraph from "./linegraph";

export default function Graph() {
  const [lastTenMinLogs, setLastTenMinLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      client
        .get("/air_quality/get_last_ten_minutes_logs/")
        .then((res) => setLastTenMinLogs(res.data));
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="garp-container">
      <LineGraph info={lastTenMinLogs} graphname="temperature" />
      <LineGraph info={lastTenMinLogs} graphname="humidity" />
      <LineGraph info={lastTenMinLogs} graphname="CO" />
    </div>
  );
}
