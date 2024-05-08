import { campuses } from "../../programs2024.json";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { editEntry, getEntries, addWalkInEntry } from "../../handlers/entry";
import dayjs from "dayjs";
import "./styles/dataGrid.css";
import {
  AccountCircle,
  DirectionsWalk,
  HighlightOff,
  Logout,
} from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { getSlotMapping } from "../../utils/utils";
import { useCookies } from "react-cookie";

const defaultValues = {
  lrn: "",
  givenName: "",
  middleName: "",
  lastName: "",
  sexAtBirth: "",
  birthDate: "",
  phoneNumber: "",
  campus: "",
  program: "",
  examCenter: "",
};
export const Component = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const actionData = useActionData;
  const submit = useSubmit();
  const { campus } = useParams();
  const siteCookies = ["session_id", "session_campus"];
  const [cookies, setCookie, removeCookie] = useCookies(siteCookies);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pictureModal, setPictureModal] = useState({
    url: "",
    fullName: "",
    open: false,
  });
  const [cancelModal, setCancelModal] = useState({
    row: {},
    open: false,
  });
  const [walkInModal, setWalkinModal] = useState(false);
  const [form, setForm] = useState(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelHandler = (row) =>
    setCancelModal((prev) => ({ ...prev, row, open: true }));

  const columns = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 300,
        valueGetter: ( value, rows ) => {
          const { givenName, middleName, lastName } = rows;
          return `${lastName}, ${givenName} ${
            middleName ? middleName : ""
          } `.toUpperCase();
        },
      },
      {
        field: "slotID",
        headerName: "Slot ID",
        width: 200,
      },
      {
        field: "examCenter",
        headerName: "Exam Center",
        width: 200,
      },
      {
        field: "examDateTime",
        headerName: "Exam Date Time",
        width: 200,
        valueGetter: ( value, rows ) => {
          let { slotID, timeSlot } = rows;
          return getSlotMapping(slotID).date;
        },
      },
      {
        field: "isReserved",
        type: "string",
        headerName: "Status",
        width: 200,
        valueGetter: ( value, rows ) =>
          value ? (value === 1 ? "Reserved" : "Walk-In") : "Cancelled",
      },
      {
        field: "campus",
        headerName: "Campus",
        width: 200,
      },
      {
        field: "program",
        headerName: "Program",
        width: 200,
      },
      {
        field: "LRN",
        headerName: "LRN",
        width: 200,
      },
      {
        field: "sexAtBirth",
        headerName: "Sex At Birth",
        width: 200,
      },
      {
        field: "birthDate",
        headerName: "Birth Date",
        width: 200,
        valueGetter: ( value, rows ) => dayjs(value).format("MMM D, YYYY"),
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        valueGetter: ( value, rows ) => (value.includes("@") ? value : "-"),
      },
      {
        field: "timestamp",
        headerName: "Timestamp",
        width: 200,
        valueGetter: ( value, rows ) => dayjs(value).format("MMM D, YYYY h:mm A"),
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AccountCircle sx={{ color: "primary.main" }} />}
            label="View Picture"
            onClick={() => showPicture(params.row)}
          />,
          <GridActionsCellItem
            sx={{ display: params.row.isReserved ? "block" : "none" }}
            icon={<HighlightOff sx={{ color: "error.main" }} />}
            label="Cancel"
            onClick={() => cancelHandler(params.row)}
          />,
        ],
      },
    ],
    [cancelHandler]
  );
  const initialState = {
    columns: {
      columnVisibilityModel: {
        givenName: false,
        middleName: false,
        lastName: false,
      },
    },
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dateChangeHandler = (val) =>
    setForm((prev) => ({
      ...prev,
      birthDate: val,
    }));

  const campusFromJSNO = campuses.find(({ campus }) => campus === form.campus);
  const options = campusFromJSNO
    ? campusFromJSNO.colleges.map(({ college, full, courses }) => [
        <ListSubheader
          sx={{
            textAlign: "center",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "primary.main",
          }}
          key={college}
        >{`${college} - ${full}`}</ListSubheader>,
        courses.map(({ course, full: fullCourseName }, i) => (
          <MenuItem
            sx={{ whiteSpace: "normal" }}
            key={`${course}${i}`}
            value={fullCourseName}
          >{`${course} - ${fullCourseName}`}</MenuItem>
        )),
      ])
    : [];
  const showPicture = (row) => {
    const { uuid, fullName } = row;
    setPictureModal((prev) => ({
      ...prev,
      url: `${import.meta.env.VITE_API_URL}/uploads/picture/${uuid}.png`,
      fullName,
      open: true,
    }));
  };

  const showWalkinModal = () => setWalkinModal(true);
  const closeDialog = () =>
    setPictureModal((prev) => ({ ...prev, open: false }));
  const closeCancelModal = () =>
    setCancelModal((prev) => ({ ...prev, open: false }));
  const proceedCancel = () => {
    setCancelModal((prev) => ({ ...prev, open: false }));
    setLoading(true);
    submit(cancelModal.row, {
      method: "POST",
      action: `/admin/${campus}`,
      encType: "application/json",
    });
  };

  const closeWalkInModal = () => setWalkinModal(false);
  const logout = () => {
    removeCookie("session_id");
    removeCookie("session_campus");
    location.reload();
  };
  
  const addHandler = () => {
    setIsSubmitting(true);

    submit(
      { type: "walkIn", form },
      {
        action: `/admin/${campus}`,
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const complete = Object.keys(form).every(
    (key) => key === "middleName" || Boolean(form[key])
  );

  useEffect(() => {
    if(cookies.session_id !== '' && cookies.session_campus !== '') {
      if (loaderData) {
        setRows(loaderData.entries);
        setLoading(false);
      }
      // console.log(loaderData.entries);
      // console.log(cookies?.session_id);
    }
  }, [loaderData, cookies, navigate]);

  return (
    <Paper sx={{ width: "100%", maxHeight: "70vh", height: "100%" }}>
      <Box sx={{ width: "100%", height: "100%", mb: 1 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={initialState}
          getRowId={({ uuid }) => uuid}
          getRowHeight={() => "auto"}
          getRowClassName={({ row }) => {
            return row.isReserved ? "" : "isNotReserved";
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          loading={loading}
        />
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "end", gap: 1 }}
      >
        <Button
          variant="contained"
          endIcon={<DirectionsWalk />}
          onClick={showWalkinModal}
        >
          Add Walk-in Entry
        </Button>
        <IconButton onClick={logout}>
          <Logout sx={{ color: "primary.main" }} />
        </IconButton>
      </Box>
      <Dialog open={pictureModal.open} onClose={closeDialog} maxWidth="md">
        <DialogTitle>{pictureModal.fullName}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", maxHeight: "85vh", height: "100%" }}>
            <img
              src={pictureModal.url}
              alt={pictureModal.fullName}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={cancelModal.open} onClose={closeCancelModal} maxWidth="lg">
        <DialogTitle>Cancel Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to cancel this entry?
          </DialogContentText>
          <Typography variant="body1">{`Name: ${cancelModal.row.givenName} ${cancelModal.row.lastName}`}</Typography>
          <Typography variant="body1">{`SlotID: ${cancelModal.row.slotID}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCancelModal} color="primary">
            No
          </Button>
          <Button onClick={proceedCancel} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={walkInModal} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Walk-in Entry</DialogTitle>
        <DialogContent>
          {" "}
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
                <MenuItem value="Fortune Towne">Fortune Towne</MenuItem>
                <MenuItem value="Alijis">Alijis</MenuItem>
                <MenuItem value="Binalbagan">Binalbagan</MenuItem>
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
                  required
                >
                  <MenuItem value={campus} selected>
                    {campus}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body" fontWeight={700}>
                Program
              </Typography>
              <br />
              <FormControl
                fullWidth
                sx={{ maxWidth: "100%", overflow: "auto" }}
              >
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWalkInModal} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!complete || isSubmitting}
            onClick={addHandler}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

// export const loader = async ({ params }) => {
//   const { campus } = params;
//   return await getEntries(campus);
// };

export const loader = async () => {
  // const { campus } = params;
  const campus = document.cookie.split(';')[1].split('=')[1];
  console.log(campus);
  // console.log(request.headers.get('session_id'));
  return await getEntries(campus);
};

export const action = async ({ request }) => {
  let body = await request.json();
  if (body.type && body.type === "walkIn")
    return await addWalkInEntry(body.form);
  else return await editEntry(body);
};
