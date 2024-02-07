import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CHMSU Admission System for A.Y. 2024 - 2025
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
