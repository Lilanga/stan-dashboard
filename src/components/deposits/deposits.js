import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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

export default function Deposits() {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(channelRequest({ params: { subs: 1 } }));
  }, []);

  return (
    <React.Fragment>
      <Title>Total Messages</Title>
      <Typography component="p" variant="h4">
        3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 23 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View messages
        </Link>
      </div>
    </React.Fragment>
  );
}
