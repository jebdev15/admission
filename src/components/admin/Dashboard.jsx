import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useParams, useSubmit } from "react-router-dom";
import { editEntry, getEntries } from "../../handlers/entry";
import dayjs from "dayjs";
import "./styles/dataGrid.css";
import { AccountCircle, HighlightOff } from "@mui/icons-material";

export const Component = () => {
  const loaderData = useLoaderData();
  const submit = useSubmit();
  const { campus } = useParams();

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
  const cancelHandler = (row) =>
    setCancelModal((prev) => ({ ...prev, row, open: true }));

  const columns = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 300,
        valueGetter: ({ row }) => {
          const { givenName, middleName, lastName } = row;
          return `${givenName} ${
            middleName ? middleName : ""
          } ${lastName}`.toUpperCase();
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
        valueGetter: ({ row }) => {
          let { slotID, timeSlot } = row;
          const prefix = ["TAL", "BIN", "ALI", "FT"].find((key) =>
            slotID.startsWith(key)
          );
          const date = slotID.substr(prefix.length, 4);
          const datetime = dayjs(
            `2024-${date.substr(0, 2)}-${date.substr(2, 2)} ${timeSlot}`,
            "YYYY-MM-DD h:mm A"
          ).format("MMM D, YYYY h:mm A");
          return datetime;
        },
      },
      {
        field: "isReserved",
        type: "string",
        headerName: "Status",
        width: 200,
        valueGetter: ({ value }) => (value ? "Reserved" : "Cancelled"),
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
        valueGetter: ({ value }) => dayjs(value).format("MMM D, YYYY"),
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
      },
      {
        field: "timestamp",
        headerName: "Timestamp",
        width: 200,
        valueGetter: ({ value }) => dayjs(value).format("MMM D, YYYY h:mm A"),
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

  const showPicture = (row) => {
    const { uuid, fullName } = row;
    setPictureModal((prev) => ({
      ...prev,
      url: `${import.meta.env.VITE_API_URL}/uploads/picture/${uuid}.png`,
      fullName,
      open: true,
    }));
  };
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

  useEffect(() => {
    if (loaderData) {
      setRows(loaderData.entries);
      setLoading(false);
    }
  }, [loaderData]);

  return (
    <Paper sx={{ width: "100%", maxHeight: "80vh", height: "100%" }}>
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
    </Paper>
  );
};

export const loader = async ({ params }) => {
  const { campus } = params;
  return await getEntries(campus);
};

export const action = async ({ request }) => {
  const body = await request.json();
  return await editEntry(body);
};
