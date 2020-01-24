import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Popover from "material-ui/Popover";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { selectLastFiveMessages } from "../../utils/selectorUtils";
import { clientsRequest } from "../../store/clients";
import Title from "../title/title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function RecentData() {
  const classes = useStyles();
  const recentMessages = useSelector(selectLastFiveMessages);
  const dispatch = useDispatch();
  const [viewMessage, setViewMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const jsonViewStyle = {
    padding: "10px",
    borderRadius: "3px",
    margin: "10px 0px"
  };

  useEffect(() => {
    dispatch(clientsRequest({ params: { subs: 1 } }));
  }, []);

  return (
    <React.Fragment>
      <Title>Recent messages</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="right">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentMessages.map(message => (
            <TableRow key={message.sequence}>
              <TableCell>{message.subject}</TableCell>
              <TableCell>{message.sequence}</TableCell>
              <TableCell>
                {moment(message.timestamp).format("YYYY-MM-DD hh:mm a")}
              </TableCell>
              <TableCell align="right">
                <Button
                  data-content={message.data}
                  onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setViewMessage(e.currentTarget.dataset.content);
                  }}
                >
                  View data
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popover
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        open={!!viewMessage}
        onRequestClose={() => {
          setViewMessage(null);
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
      >
        <ReactJson
          displayDataTypes={false}
          style={jsonViewStyle}
          iconStyle={"circle"}
          src={JSON.parse(viewMessage || "{}")}
        />
      </Popover>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more messages
        </Link>
      </div>
    </React.Fragment>
  );
}
