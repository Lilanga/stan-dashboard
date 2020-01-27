import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import ChartWidget from "../chart/chartWidget";
import InformationWidget from "../information/informationWidget";
import RecentMessagesWidget from "../recentMessages/recentMessagesWidget";
import Footer from "../footer/footer";
import { getMessageData } from "../../utils/dataTransformUtils";
import { selectAllMessages } from "../../utils/selectorUtils";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 280
  }
}));

let timeSeriesData = [];

export default function Dashboard() {
  const classes = useStyles();
  const messages = useSelector(selectAllMessages);
  const [messagesUpdated, setMessagesUpdated] = useState(new Date());

  useEffect(() => {
    timeSeriesData = getMessageData(messages);
    setMessagesUpdated(new Date());
  }, [messages]);

  return (
    <>
      <Grid container spacing={3}>
        {/* Information Widget */}
        <Grid item xs={12} md={12} lg={12}>
            <InformationWidget />
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
            <ChartWidget data={timeSeriesData} title="Messages Throughput" updatedAt={messagesUpdated} />
        </Grid>
        {/* Recent messages */}
        <Grid item xs={12}>
            <RecentMessagesWidget title={"Recent messages"}/>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
