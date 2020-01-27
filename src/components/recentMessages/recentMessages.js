import React, { useState } from "react";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import ReactJson from "react-json-view";
import moment from "moment-timezone";

// styles
import styles from "../../styles/tableStyle";
const useStyles = makeStyles(styles);

export default function RecentMessages(props) {
  const classes = useStyles();
  const { headerColor, recentMessages } = props;
  const [viewMessage, setViewMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const jsonViewStyle = {
    padding: "10px",
    borderRadius: "3px",
    margin: "10px 0px"
  };

  return (
    <React.Fragment>
      <Table className={classes.table}>
      <TableHead className={classes[headerColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Channel</TableCell>
            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Sequence</TableCell>
            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Time</TableCell>
            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} align="right">Data</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {recentMessages.map(message => (
            <TableRow key={message.sequence} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>{message.subject}</TableCell>
              <TableCell className={classes.tableCell}>{message.sequence}</TableCell>
              <TableCell className={classes.tableCell}>
                {moment(message.timestamp).format("YYYY-MM-DD hh:mm a")}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <Button
                  data-content={message.data}
                  onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setViewMessage(e.currentTarget.dataset.content);
                  }}
                  startIcon={<ChromeReaderModeIcon />}
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
        onClose={() => {
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
    </React.Fragment>
  );
}
