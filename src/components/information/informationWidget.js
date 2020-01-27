import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isArray, size } from 'lodash'
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

// @material-ui/icons
import MessageIcon from '@material-ui/icons/Note';
import ChannelIcon from '@material-ui/icons/SwapHoriz';
import ClientIcon from '@material-ui/icons/Contacts';
import SubscriptionIcon from '@material-ui/icons/DeviceHub';
import Update from "@material-ui/icons/Update";

// widgets
import GridItem from "../../widgets/grid/GridItem.js";
import GridContainer from "../../widgets/grid/GridContainer.js";
import Card from "../../widgets/cards/Card.js";
import CardHeader from "../../widgets/cards/CardHeader.js";
import CardIcon from "../../widgets/cards/CardIcon.js";
import CardFooter from "../../widgets/cards/CardFooter.js";
import styles from "../../styles/components/dashboardStyle";

import {
  selectAllClients,
  selectAllChannels
} from "../../utils/selectorUtils";
import { channelRequest } from "../../store/channel";
import { clientsRequest } from "../../store/clients";

const useStyles = makeStyles(styles);
let refreshTimer;

export default function InformationWidget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const clients = useSelector(selectAllClients);
  const [messagesUpdated, setMessagesUpdated] = useState("--");
  const [channelsUpdated, setChannelsUpdated] = useState("--");
  const [clientsUpdated, setClientsUpdated] = useState("--");
  const [subscriptionsUpdated, setSubscriptionsUpdated] = useState("--");
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    dispatch(channelRequest({ params: { subs: 1 } }));
    dispatch(clientsRequest({ params: { subs: 1 } }));

    // scheduled updates
    refreshTimer = setInterval(() => {
      dispatch(channelRequest({ params: { subs: 1 } }));
      dispatch(clientsRequest({ params: { subs: 1 } }));
    }, 60*1000);

    return function cleanup() {
      clearInterval(refreshTimer);
    };
    
  }, []);

  useEffect(() => {
    // calculate messages in all channels
    if(!channels.channels || !isArray(channels.channels)){
      return;
    }

    const countMsg = channels.channels.reduce(
      (count, channel) => (count += channel.msgs),
      0
    );

    setMessagesCount(countMsg);

    const updatedAt = moment(new Date()).format("LLL");
    setChannelsUpdated(updatedAt);
    setMessagesUpdated(updatedAt);
  }, [channels]);

  useEffect(() => {
    if(!clients.clients || !isArray(clients.clients)){
      return;
    }

    const countSubs = clients.clients.reduce((count, client) => {
      count += client.subscriptions ? size(client.subscriptions) : 0
      return count
    }, 0);
    setSubscriptionsCount(countSubs);

    const updatedAt = moment(new Date()).format("LLL");
    setSubscriptionsUpdated(updatedAt);
    setClientsUpdated(updatedAt);
  }, [clients]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <MessageIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Messages</p>
              <h3 className={classes.cardTitle}>
                {messagesCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Update />
                {messagesUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ChannelIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Channels</p>
              <h3 className={classes.cardTitle}>{channels.channels ? channels.channels.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {channelsUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <ClientIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Clients</p>
              <h3 className={classes.cardTitle}>{clients.clients ? clients.clients.length : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Update />
                {clientsUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <SubscriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Subscriptions</p>
              <h3 className={classes.cardTitle}>{subscriptionsCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {subscriptionsUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
