import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    color: "#ebf6f7",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    lineHeight: "50px",
    position: "absolute",
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  return <div className={classes.footer}>Copyright © 2021 BDO.AccountBooks. All Rights Reserved.</div>;
};

export default Footer;