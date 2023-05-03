import React from "react";
import { makeStyles } from "@mui/styles";

const TicketCard = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.main}></div>
    </>
  );
};

export default TicketCard;

const useStyles = makeStyles(() => ({
  main: {
    padding: "10px 20px",
    width: "28%",
    height: "450px",
    gap: 20,
    color: "#FFFFFF",
    backgroundColor: "#645CAA",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    marginTop: "12vh",
  },
  subTitle: {
    color: "#000000",
    fontSize: 36,
    margin: 0,
  },
  h3Title: {
    color: "#000000",
    margin: 0,
  },
  eventHeader: {
    width: "100%",
    paddingLeft: "15%",
    height: "15vh",
    backgroundColor: "#645CAA",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    borderRadius: "15px",
    color: "#FFFFFF",
    fontSize: "24px",
    gap: "20%",
  },
  container: {
    // backgroundColor: "rgb(29, 31, 33)",
  },
  containerBtn: {
    display: "flex",
    gap: 15,
    // justifyContent: "space-between",
  },
  tab: {
    padding: "5px 15px",
    backgroundColor: "#FCF8E8",
    marginBottom: 10,
  },
  listHover: {
    "&:hover": {
      color: "#FF9551",
    },
  },
  input: {
    maxWidth: 350,
    width: "100%",
    padding: "12px 12px",
    color: "#e6e6e6",
    outline: "1px solid #5B3320",
    backgroundColor: "#151520",
    borderRadius: 6,
    border: "none",
  },
}));
