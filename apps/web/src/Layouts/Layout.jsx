import * as React from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import Link from "@mui/material/Link";
import Mail from "@mui/icons-material/Mail";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "../components/listItems";
import { Inbox, RouteRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { green, blue } from "@mui/material/colors";

import { ToastContainer, toast } from "react-toastify";
import { useNotifications } from "@/contexts/notificationContext";
import { Menu, MenuItem } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        jzf21
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    mode: "light",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
  shape: {
    borderRadius: 16, // Set a value for the border radius (adjust as needed)
  },
});

const Dashboard = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const router = useRouter();

  const toggleDrawerCart = () => () => {
    setOpenCart(!openCart);
  };
  const { loading, notifications } = useNotifications();
  const [filteredNotifications, setFilteredNotifications] = React.useState([]);
  //sort notification by deadline and return only ones with less than 2 days

  useEffect(() => {
    console.log("Welcome to the dashboard");
    if (notifications) {
      const filteredNotifications = notifications.filter((notification) => {
        const deadlineDate = new Date(notification.deadline);
        const currentDate = new Date();
        const timeDifference = deadlineDate - currentDate;
        const daysRemaining = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        return daysRemaining < 2;
      });
      setFilteredNotifications(filteredNotifications);
    }
  }, [notifications]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function calculateDeadline(opening) {
    const deadlineDate = new Date(opening.deadline);
    const currentDate = new Date();
    const timeDifference = deadlineDate - currentDate;

    if (timeDifference <= 0) {
      return "Deadline passed";
    } else {
      const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (daysRemaining > 0) {
        return `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} `;
      } else {
        return `${hoursRemaining} hour${hoursRemaining > 1 ? "s" : ""} `;
      }
    }
  }

  // Usage

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              backgroundColor: "#2b2b2b", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton
              id="basic-button"
              aria-controls={menuopen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuopen ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
            >
              <Badge
                badgeContent={filteredNotifications.length}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuopen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {filteredNotifications.map((notification) => (
                <MenuItem onClick={handleClose}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        router.push(`/openings/${notification.id}`);
                      }}
                    >
                      <ListItemIcon>
                        <Mail />
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.company.name}
                        secondary={`${calculateDeadline(notification)} left`}
                      />
                    </ListItemButton>
                  </ListItem>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(Dashboard);
