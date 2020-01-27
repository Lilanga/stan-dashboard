import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MessageIcon from '@material-ui/icons/Note';
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ContactsIcon from "@material-ui/icons/Contacts";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DnsIcon from "@material-ui/icons/Dns";

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/messages">
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    <ListItem button component="a" href="/channels">
      <ListItemIcon>
        <SwapHorizIcon />
      </ListItemIcon>
      <ListItemText primary="Channels" />
    </ListItem>
    <ListItem button component="a" href="/clients">
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>
    <ListItem button component="a" href="/subscriptions">
      <ListItemIcon>
        <DeviceHubIcon />
      </ListItemIcon>
      <ListItemText primary="Subscriptions" />
    </ListItem>
    <ListItem button component="a" href="/configurations">
      <ListItemIcon>
        <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="Configurations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Current week" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Last two weeks" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Last month" />
    </ListItem>
  </div>
);
