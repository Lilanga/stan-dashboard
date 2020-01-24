import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { selectAllMessagesCount } from "../../utils/selectorUtils";
import { channelRequest } from "../../store/channel";
import Title from "../title/title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function InformationWidget() {
  const classes = useStyles();
  const messagesCount = useSelector(selectAllMessagesCount);
  const dispatch = useDispatch();
  const [lastUpdated, setLastUpdated] = useState("--");

  useEffect(() => {
    dispatch(channelRequest({ params: { subs: 1 } }));
  }, []);

  useEffect(() => {
    setLastUpdated(moment(new Date()).format("LLLL"));
  }, [messagesCount]);

  return (
    <React.Fragment>
      <Title>Total Messages</Title>
      <Typography component="p" variant="h4">
        {messagesCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {lastUpdated}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View messages
        </Link>
      </div>
    </React.Fragment>
  );
}
