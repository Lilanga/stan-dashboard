import React from "react";
import Box from "@material-ui/core/Box";
import Copyright from "../copyright/copyright";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./electrify-logo.svg";

const useStyles = makeStyles(theme => ({
  sponsorLink: {
    display: "block",
    color: "inherit",
    textDecoration: "none"
  },
  sponsorImage: {
    width: 120,
    position: "relative",
    top: 10,
    alignContent: "center"
  },
  footer: {
    position: "relative",
    bottom: 0,
    marginTop: "calc(1% + 5px)"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box pt={1} className={classes.footer}>
      <Copyright />
      <Typography variant="body2" color="textSecondary" align="center">
        {" "}
        <Link
          color="inherit"
          href="https://www.electrify.asia/"
          className={classes.sponsorLink}
        >
          Sponsored by <img className={classes.sponsorImage} src={logo} />
        </Link>
      </Typography>
    </Box>
  );
}
