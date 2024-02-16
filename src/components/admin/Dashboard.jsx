import { Box, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";

export const Component = () => {
  const campus = useOutletContext();
  return (
    <Box>
      <Typography>{campus}</Typography>
      <Typography>asdad</Typography>
    </Box>
  );
};
