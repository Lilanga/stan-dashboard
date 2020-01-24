import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import Chart from "../chart/chart";
import Deposits from "../deposits/deposits";
import Orders from "../orders/orders";
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
    height: 240
  }
}));

let timeSeriesData = [];

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const messages = useSelector(selectAllMessages);

  useEffect(() => {
    timeSeriesData = getMessageData(messages);
  }, [messages]);

  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={timeSeriesData} title="Message Throughput" />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
