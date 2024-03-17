import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { campuses } from "../../programs2024.json";
import { getSlotMapping } from "../../utils/utils";

const Fillup = ({
  form,
  inputHandler,
  dateChangeHandler,
  submitHandler,
  uploadHandler,
  isSubmitting,
  programSlots,
}) => {
  const campus = campuses.find(({ campus }) => campus === form.campus);

  // list all open slots on campus selected
  const listOfApplicableSlots = [];
  let options;
  if (!programSlots) {
    options = <MenuItem>No slots left!</MenuItem>;
  } else {
    programSlots.forEach((slot) => {
      // console.log(`${slot.slotID} ${form.campus}`, getSlotMapping(slot.slotID));
      if (getSlotMapping(slot.slotID).campus === form.campus) {
        listOfApplicableSlots.push(slot);
      }
    });

    console.log("listOfApplicableSlots", listOfApplicableSlots);

    options = campus
      ? campus.colleges.map(({ college, full, courses }) => {
          const applicableSlotsPerCollege = listOfApplicableSlots.filter(
            (slot) => slot.college === college
          );
          if (applicableSlotsPerCollege.length) {
            const listSubHeader = (
              <ListSubheader
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "primary.main",
                }}
                key={college}
              >{`${college} - ${full}`}</ListSubheader>
            );
            const menuItems = courses.map(
              ({ course, full: fullCourseName, code }, i) => {
                const courseWithMatchingCode = applicableSlotsPerCollege.find(
                  ({ slotID }) => slotID.startsWith(code)
                );
                if (
                  courseWithMatchingCode &&
                  Object.keys(courseWithMatchingCode).length
                ) {
                  return (
                    <MenuItem
                      sx={{ whiteSpace: "normal" }}
                      key={`${course}${i}`}
                      value={fullCourseName}
                    >{`${course} - ${fullCourseName}`}</MenuItem>
                  );
                }
              }
            );

            return [listSubHeader, menuItems];
          }
        })
      : [];
  }

  const complete = Object.keys(form).every(
    (key) => key === "middleName" || Boolean(form[key])
  );
  // const complete = true;

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={700}
        color="primary.main"
        textAlign="right"
        sx={{ p: 1, bgcolor: "primary.main", color: "white" }}
      >
        FILL UP SECTION
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          my: 1,
          color: "primary.main",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>1</Avatar>
        <Typography fontWeight={600} textTransform="uppercase">
          Personal Information
        </Typography>
      </Box>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12}>
          <Typography variant="body" fontWeight={700}>
            LRN
          </Typography>
          <Input
            name="lrn"
            value={form.lrn}
            onChange={inputHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Given Name
          </Typography>
          <Input
            name="givenName"
            value={form.givenName}
            onChange={inputHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Middle Name
          </Typography>
          <Input
            name="middleName"
            value={form.middleName}
            onChange={inputHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Last Name
          </Typography>
          <Input
            name="lastName"
            value={form.lastName}
            onChange={inputHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body" fontWeight={700}>
            Sex at Birth
          </Typography>
          <br />
          <Select
            required
            name="sexAtBirth"
            value={form.sexAtBirth}
            onChange={inputHandler}
            fullWidth
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body" fontWeight={700}>
            Birth Date
          </Typography>
          <br />
          <MobileDatePicker
            value={dayjs(form.birthDate || undefined)}
            onChange={dateChangeHandler}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Phone Number
          </Typography>
          <Input
            startAdornment={
              <InputAdornment position="start">+63</InputAdornment>
            }
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={inputHandler}
            fullWidth
            size="medium"
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Campus to Enroll
          </Typography>
          <br />
          <Select
            value={form.campus}
            onChange={inputHandler}
            fullWidth
            size="small"
            name="campus"
            required
          >
            <MenuItem value="Talisay">Talisay</MenuItem>
            {/* <MenuItem value="Fortune Towne">Fortune Towne</MenuItem> */}
            <MenuItem value="Alijis">Alijis</MenuItem>
            {/* <MenuItem value="Binalbagan">Binalbagan</MenuItem> */}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body" fontWeight={700}>
            Exam Center
          </Typography>
          <br />
          <FormControl fullWidth>
            <Select
              value={form.examCenter}
              onChange={inputHandler}
              fullWidth
              size="small"
              name="examCenter"
              disabled
            >
              <MenuItem value="Talisay">Talisay</MenuItem>
              <MenuItem value="Fortune Towne" disabled>
                Fortune Towne
              </MenuItem>
              <MenuItem value="Alijis" disabled>
                Alijis
              </MenuItem>
              <MenuItem value="Binalbagan" disabled>
                Binalbagan
              </MenuItem>
            </Select>
            <FormHelperText>
              Campus where you wish to take the exam.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="body" fontWeight={700}>
            Program
          </Typography>
          <br />
          <FormControl fullWidth sx={{ maxWidth: "100%", overflow: "auto" }}>
            <Select
              name="program"
              value={form.program}
              onChange={inputHandler}
              fullWidth
              size="small"
              disabled={!Boolean(form.campus)}
              required
            >
              {options}
            </Select>
            <FormHelperText>
              {form.campus ? "" : "Select a campus first"}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          my: 1,
          color: "primary.main",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>2</Avatar>
        <Typography fontWeight={600} textTransform="uppercase">
          Upload
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography fontWeight={700} mb={1}>
              Photo
            </Typography>
            <Box>
              <Input
                type="file"
                id="pictureUpload"
                sx={{ display: "none" }}
                name="picture"
                onChange={uploadHandler}
                accept="image/*"
              />
              <label htmlFor="pictureUpload">
                {form.picture ? (
                  <Paper>
                    <img
                      width={150}
                      height={150}
                      src={form.picture}
                      style={{ margin: 0 }}
                    />
                  </Paper>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 150,
                      height: 150,
                      border: "3px dashed",
                      borderColor: "primary.main",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <Add />
                    </Avatar>
                  </Box>
                )}
              </label>
            </Box>
            <Typography variant="caption" mt={3}>
              <strong>Guidelines:</strong> <br />
              1. The photo must be taken in full-face view directly facing the
              camera. <br />
              2. Entire face must be visible and should not be covered by hair.{" "}
              <br />
              3. Both ears and shoulders must be visible. <br />
              4. The applicant's photo must be recent (within the past 3
              months).
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          mx: "auto",
          width: "fit-content",
          display: "flex",
          mt: 3,
        }}
        disabled={!complete || isSubmitting}
        onClick={submitHandler}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default Fillup;
