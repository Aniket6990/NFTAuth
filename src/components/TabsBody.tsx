/* eslint-disable react/jsx-pascal-case */
import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TokenIcon from "@mui/icons-material/Token";
import EvStationIcon from "@mui/icons-material/EvStation";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import GamesIcon from "@mui/icons-material/Games";
import ContactlessIcon from "@mui/icons-material/Contactless";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Onboarding from "./Onboarding/index";
import Navbar from "./Navbar";
import Assets from "./Balance";
import Collapse from "@mui/material/Collapse/Collapse";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Faucet from "./Faucet";
// Account Abstraction
import AccountAbstraction from "./AA";
import MintNft from "./AA/MintNft";
// Forward
import ForwardFlow from "./Forward";
import MintNftForward from "./Forward/MintNft";
import BatchLiquidityForward from "./Forward/BatchLiquidity";
import Events from "./Events";
import { Divider } from "@mui/material";

const drawerWidth = 260;
const onboardingList = [
  {
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    name: "Faucet",
    icon: <SavingsIcon />,
  },
  {
    name: "Mint NFT",
    icon: <InsertPhotoIcon />,
  },
  {
    name: "Balance",
    icon: <AccountBalanceWalletIcon />,
  },
];

const TabsBody = ({ loading }: { loading: boolean }) => {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = React.useState(0);
  const [useCase, setUseCase] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [isAAOpen, setIsAAOpen] = React.useState(false);
  const [isForwardOpen, setIsForwardOpen] = React.useState(false);

  const handleChange = (event: any, newValue: any) => {
    if (newValue >= 4 && newValue <= 7) {
      setIsAAOpen(true);
    }
    setUseCase(0);
    setPageIndex(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return loading ? (
    <div className={classes.container}>
      <img width={50} src="/logo.svg" className={classes.animateBlink} alt="" />
    </div>
  ) : (
    <Box sx={{ display: "flex", width: "100%", height: "calc(100vh - 80px)" }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      {/* Left Panel */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            background: "rgba(0,0,0,0)",
            color: "#e6e6e6",
            border: 0,
          },
          "& .MuiTypography-root": {
            fontSize: 14,
          },
        }}
      >
        <DrawerHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              color: "#000000",
            }}
          >
            <img src="/logo.svg" alt="logo" width={60} />
            <h1>NFTAuth</h1>
          </div>
        </DrawerHeader>
        <Divider style={{ borderColor: "#e6e6e6", borderWidth: 1 }} />
        <List
          sx={{
            display: "block",
          }}
        >
          {onboardingList.map((ele, index) => (
            <ListItem key={ele.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "#000000",
                  fontStyle: "bold",
                }}
                onClick={(e: any) => handleChange(e, index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: pageIndex === index ? "#645CAA" : "#e6e6e6",
                  }}
                >
                  {ele.icon}
                </ListItemIcon>
                <ListItemText
                  primary={ele.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* AA Left Panel */}

        <Divider style={{ borderColor: "#e6e6e6", borderWidth: 1 }} />
      </Drawer>

      {/* content menu */}
      <TabPanel value={pageIndex} index={0}>
        <Onboarding setValue={setPageIndex} />
      </TabPanel>
      <TabPanel value={pageIndex} index={1}>
        <Faucet />
      </TabPanel>
      <TabPanel value={pageIndex} index={2}>
        <MintNft />
      </TabPanel>
      <TabPanel value={pageIndex} index={3}>
        <Assets />
      </TabPanel>
    </Box>
  );
};

function TabPanel(props: any) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={classes.tabpanel}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default TabsBody;

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    width: "100%",
    margin: "auto",
    height: "max-content",
    minHeight: "92vh",
    "@media (max-width:699px)": {
      flexDirection: "column",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    borderRight: `1.5px solid #323a43`,
    padding: "30px 10px",
    width: "15%",
    "@media (max-width:699px)": {
      width: "90%",
      margin: "auto",
    },
  },
  tabpanel: {
    width: "100%",
    height: "100%",
    "@media (max-width:699px)": {
      width: "100%",
      margin: "auto",
      minHeight: "80vh",
    },
  },
  animateBlink: {
    animation: "$blink 4s linear infinite",
  },
  "@keyframes blink": {
    "0%": {
      opacity: "0",
    },
    "25%": {
      opacity: "100",
    },
    "50%": {
      opacity: "0",
    },
    "75%": {
      opacity: "100",
    },
    "100%": {
      opacity: "0",
    },
  },
}));
