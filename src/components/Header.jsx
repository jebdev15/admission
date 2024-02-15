import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  const nextLineStyle = (theme) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          sx={(theme) => ({
            display: "flex",
            width: "100%",
            alignItems: "center",
          })}
        >
          <img src="/logo.png" style={{ height: 40 }} />
          <Typography
            variant="h6"
            component="div"
            sx={(theme) => ({
              ml: 1,
              [theme.breakpoints.down("md")]: { display: "none" },
            })}
          >
            Carlos Hilado Memorial State University
          </Typography>
          <Typography variant="h6" component="div" sx={{ ml: "auto" }}>
            CHMSU Admission System <Box sx={nextLineStyle}></Box>for A.Y. 2024 -
            2025
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
