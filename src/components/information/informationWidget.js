import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import {
  selectAllMessagesCount,
  selectAllClients,
  selectAllChannels
} from "../../utils/selectorUtils";
import { channelRequest } from "../../store/channel";
import { SubTitle } from "../title/title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  messageContext: {
    flex: 1
  }
});

export default function InformationWidget() {
  const classes = useStyles();
  const messagesCount = useSelector(selectAllMessagesCount);
  const channels = useSelector(selectAllChannels);
  const dispatch = useDispatch();
  const [lastUpdated, setLastUpdated] = useState("--");

  useEffect(() => {
    dispatch(channelRequest({ params: { subs: 1 } }));
  }, []);

  useEffect(() => {
    setLastUpdated(moment(new Date()).format("LLL"));
  }, [messagesCount]);

  return (
    <Grid display="flex" flexDirection="row" container spacing={3}>
      <Grid justify="center" item>
        <Box>
          <SubTitle>Total Messages</SubTitle>
          <Typography component="p" variant="h5">
            {messagesCount}
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.messageContext}
            variant="caption"
            display="block"
          >
            on {lastUpdated}
          </Typography>
        </Box>
        <Box>
          <Link color="primary" href="#" onClick={preventDefault}>
            View messages
          </Link>
        </Box>
      </Grid>

      <Grid justify="center" item>
        <Box>
          <SubTitle>Total Channels</SubTitle>
          <Typography component="p" variant="h5">
            {channels !== [] ? channels.count : 0}
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.messageContext}
            variant="caption"
            display="block"
          >
            on {channels !== [] ? moment(channels.now).format("LLL") : "--"}
          </Typography>
        </Box>
        <Box>
          <Link color="primary" href="#" onClick={preventDefault}>
            View channels
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
