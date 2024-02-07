import React from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  AccessTime,
  CalendarMonth,
  MeetingRoom,
  Place,
} from "@mui/icons-material";
const Slot = () => {
  return (
    <>
      <Typography
        variant="h6"
        fontWeight={700}
        color="primary.main"
        textAlign="right"
        sx={{ p: 1, bgcolor: "primary.main", color: "white" }}
      >
        SLOT SECTION
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 5,
            my: 1,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={700}
              color="primary.main"
              textTransform="capitalize"
            >
              Dela Cruz
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textTransform="capitalize"
            >
              Juan
            </Typography>
          </Box>
          <Paper sx={{ width: 150, height: "auto", overflow: "hidden" }}>
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src="https://placehold.co/150x150"
            />
          </Paper>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container sx={{ p: 3 }} spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <AccessTime fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                08:00 AM
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <CalendarMonth fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                March 01, 2024
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <Place fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                Talisay Campus
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <MeetingRoom fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                ETG Building
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Alert severity="success">
          <AlertTitle>Slot Secured</AlertTitle>
          You have successfully submitted an entry for admission. Kindly proceed
          on the exam center at the day of the exam.
        </Alert>
      </Box>
    </>
  );
};

export default Slot;
