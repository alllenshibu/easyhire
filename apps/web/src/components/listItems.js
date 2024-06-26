import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import {
  NotificationAddRounded,
  NotificationImportant,
  NotificationImportantOutlined,
} from "@mui/icons-material";

import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton href="/profile">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton href="/openings">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Openings" />
    </ListItemButton>
    <ListItemButton href="/applications">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItemButton>
    <ListItemButton href="/notifications">
      <ListItemIcon>
        <NotificationImportant />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton href="/training">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Training" />
    </ListItemButton>
    <ListItemButton href="/aptitude-tests">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Aptitude Training" />
    </ListItemButton>
    <ListItemButton
      onClick={() => {
        try {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin
    </ListSubheader>
    <ListItemButton href="/admin/students">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItemButton>
    <ListItemButton href="/admin/groups">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Groups" />
    </ListItemButton>
    <ListItemButton href="openings">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Openings" />
    </ListItemButton>
    <ListItemButton href="/admin/aptitude-tests">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Aptitude Tests" />
    </ListItemButton>
  </React.Fragment>
);

const AdminListItems = () => {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Openings" />
      </ListItemButton>
    </React.Fragment>
  );
};
