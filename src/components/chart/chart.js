import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { messageSubscriptionRequest } from "../../store/messages";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";
import Title from "../title/title";

export default function Chart(props) {
  const { data, title } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      messageSubscriptionRequest({
        channel: "coordinator-timeStamps-Ready",
        opts: { startSequence: 0, StartAt: 1 }
      })
    );
  }, []);

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Count
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="messages"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
