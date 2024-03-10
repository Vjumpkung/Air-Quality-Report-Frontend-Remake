import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import "./graphing.css";

export default function LineGraph({ info, graphname }) {
  const ggname = graphname.charAt(0).toUpperCase() + graphname.slice(1);
  const yname = (value) => {
    if (graphname === "temperature") {
      return `${value} (°C)`;
    }
    if (graphname === "CO") {
      return `${value}`;
    }
    if (graphname === "humidity") {
      return `${value} (%RH)`;
    }
  };

  const toolname = (value) => {
    if (graphname === "temperature") {
      return `${value} °C`;
    }
    if (graphname === "CO") {
      return `${value}`;
    }
    if (graphname === "humidity") {
      return `${value}% RH`;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="minute-graph"
            style={{ color: "white" }}
          >{`${label} minutes ago`}</p>
          <p
            className="value-graph"
            style={{ color: "white" }}
          >{`${ggname} : ${toolname(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <LineChart
      width={700}
      height={200}
      data={info}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" fontSize="15" stroke="white">
        <Label
          value="Minutes Ago (min)"
          offset={-10}
          position="insideBottomRight"
          stroke="white"
        />
      </XAxis>
      <YAxis
        type="number"
        domain={["dataMin-15", "dataMax + 10"]}
        fontSize="13"
        stroke="white"
      >
        <Label
          value={yname(ggname)}
          offset={10}
          position="insideBottomLeft"
          angle={-90}
          fontSize="16"
          stroke="white"
        />
      </YAxis>
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <Legend />
      <Line
        name={ggname}
        type="linear"
        dataKey={graphname}
        stroke="white"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
