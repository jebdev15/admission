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
  BusinessCenter,
  CalendarMonth,
  MeetingRoom,
  Place,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const Slot = ({ form, slotData }) => {
  const { code } = useParams();
  const { lrn, givenName, middleName, lastName } = form;
  const { slotID, timeSlot, venue, campus } = slotData;

  const picture =
    form.picture ||
    `${import.meta.env.VITE_API_URL}/uploads/picture/${code}.png`;

  const map = [
    {
      key: "ALI",
      position: 2,
    },
    {
      key: "BIN",
      position: 2,
    },
    {
      key: "FT",
      position: 1,
    },
    {
      key: "TAL",
      position: 2,
    },
  ];

  const getDate = (name) => {
    const result = map.find((item) => name.includes(item.key));
    if (result) {
      const date = name.split(result.key)[1].slice(0, 4);
      const month = date.slice(0, 2);
      const day = date.slice(2);
      return dayjs(`${month}-${day}-2024`).format("MMMM DD, YYYY");
    }
  };

  const date = getDate(slotID);

  return (
    <>
      <Box
        sx={{
          p: 1,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">SLOT ID</Typography>
        <Typography fontWeight={700} variant="h6">
          {slotID}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 5,
            my: 1,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                order: 2,
                textAlign: "center",
                mt: 1,
              },
            })}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              color="primary.main"
              textTransform="capitalize"
            >
              {lastName}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textTransform="capitalize"
            >
              {`${givenName} ${middleName ? `${middleName.charAt(0)}.` : ""}`}
            </Typography>
            <Typography>LRN: {lrn}</Typography>
          </Box>
          <Paper sx={{ width: 150, height: "auto", overflow: "hidden" }}>
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src={picture}
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
                {timeSlot}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <CalendarMonth fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                {date}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <Place fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                {`${campus} Campus`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", height: 50, width: 50 }}>
                <MeetingRoom fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={500}>
                {venue}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "primary.main",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BusinessCenter />
            <Typography variant="h6" sx={{ ml: 1 }}>
              What to bring
            </Typography>
          </Box>
          <Grid container sx={{ p: 3 }} spacing={3}>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                1
              </Avatar>{" "}
              <Typography variant="subtitle2">1 Long Brown Envelope</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                2
              </Avatar>{" "}
              <Typography variant="subtitle2">2 pcs 2x2 ID picture</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                3
              </Avatar>{" "}
              <Typography variant="subtitle2">1 Pencil (Monggol 2)</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                4
              </Avatar>{" "}
              <Typography variant="subtitle2">1 ballpen</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                5
              </Avatar>{" "}
              <Typography variant="subtitle2">1 paste</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: "flex" }}>
              <Avatar
                sx={{ width: 25, height: 25, bgcolor: "primary.main", mr: 1 }}
              >
                6
              </Avatar>{" "}
              <Typography variant="subtitle2">
                Screenshot or Printed Copy of Registration Receipt
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Alert severity="success">
          <AlertTitle>Slot Secured</AlertTitle>
          You have successfully submitted an entry for admission. Kindly proceed
          on the exam center at the day of the exam.
        </Alert>
        <Alert severity="info">
          <AlertTitle>Note</AlertTitle>
          To access this data again, click previously received email link.
        </Alert>
      </Box>
    </>
  );
};

export default Slot;
