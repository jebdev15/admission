import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import {
  useActionData,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import Fillup from "./Fillup";
import Slot from "./Slot";
import { getEntryInfo } from "../../handlers/email";
import { Error } from "@mui/icons-material";
import { submitEntry } from "../../handlers/entry";
import Compressor from "compressorjs";

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
  picture: "",
};
const base64ToImage = (base64String) => {
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: "image/png" });
};
export const Component = () => {
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const { code } = useParams();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [form, setForm] = useState(defaultValues);
  const [slotData, setSlotData] = useState({
    slotID: "",
    timeSlot: "",
    venue: "",
    campus: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSlot, setShowSlot] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({
    show: false,
    message: "",
  });

  const closeModal = () => setShowModal(false);

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarInfo((prev) => ({ ...prev, show: false }));
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

  const submitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmEmaiHandler = (e) => setConfirmEmail(e.target.value);

  const proceedHandler = () => {
    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in form) {
      if (["picture", "ID"].includes(key)) {
        const blob = base64ToImage(form[key]);
        new Compressor(blob, {
          quality: 0.3,
          success(result) {
            console.log(`${key}: `, result.size);
            formData.append(key, result, `${code}.png`);
          },
          error(err) {
            console.log(err.message);
          },
        });
      } else {
        formData.append(key, form[key]);
      }
    }
    formData.append("email", email);
    submit(formData, {
      action: `/${code}`,
      method: "POST",
      encType: "multipart/form-data",
    });
    closeModal();
  };

  const uploadHandler = (e) => {
    const { name, files } = e.target;
    const [file] = files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (result) =>
      setForm((prev) => ({ ...prev, [name]: reader.result }));
  };

  const isEmailsMatching = email === confirmEmail;

  useEffect(() => {
    if (loaderData && Object.keys(loaderData).length) {
      if (loaderData.msg !== "noEmail") {
        setEmail(loaderData.email);
        if (loaderData.msg === "withEntry") {
          setForm(loaderData.entry);
          setSlotData(loaderData.entry.slot);
          setShowSlot(true);
        }
      }
    }
  }, [loaderData]);
  useEffect(() => {
    if (actionData && Object.keys(actionData).length) {
      if (actionData.msg === "success") {
        setSlotData(actionData.slot);
        setShowSlot(true);
      } else {
        setSnackBarInfo((prev) => ({
          ...prev,
          show: true,
          message:
            actionData.msg === "noSlot"
              ? "No slots left in selected exam center!"
              : actionData.msg === "duplicate"
              ? "Duplicate entry found!"
              : "Sumit failed! Check you internet connection.",
        }));
      }
    }
    setIsSubmitting(false);
  }, [actionData]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          bgcolor: "#81c784",
          opacity: 0.8,
          backgroundSize: "20px 20px",
          backgroundImage:
            "repeating-linear-gradient(0deg, #81c784, #81c784 1px, #e8f5e9 1px, #e8f5e9)",
        }}
      >
        <Container sx={{ height: "100%" }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              [theme.breakpoints.down("md")]: {
                alignItems: "start",
                mt: 3,
              },
            })}
          >
            <Paper
              sx={{ maxWidth: "750px", width: "100%", p: 3 }}
              component="form"
            >
              {!Boolean(email) ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "error.main", mb: 1 }}>
                    <Error fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" textAlign="center">
                    <Typography
                      color="error.main"
                      fontWeight={700}
                      sx={{ display: "inline", fontSize: "inherit" }}
                    >
                      No email
                    </Typography>{" "}
                    associated with this link. Kindly confirm on the email
                    received.
                  </Typography>
                </Box>
              ) : showSlot ? (
                <Slot form={form} slotData={slotData} />
              ) : (
                <Fillup
                  form={form}
                  inputHandler={inputHandler}
                  dateChangeHandler={dateChangeHandler}
                  submitHandler={submitHandler}
                  uploadHandler={uploadHandler}
                  proceedHandler={proceedHandler}
                  isSubmitting={isSubmitting}
                />
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
      <Dialog open={showModal} onClose={closeModal}>
        <DialogTitle>Confirm Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please review your entry before proceeding. Type your email to
            proceed.
          </DialogContentText>
          <TextField
            fullWidth
            size="small"
            variant="standard"
            type="email"
            onChange={confirmEmaiHandler}
            error={confirmEmail.length > 3 && !isEmailsMatching}
            helperText={
              confirmEmail.length > 3 && !isEmailsMatching
                ? "Emails don't match"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={proceedHandler} disabled={!isEmailsMatching}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackBarInfo.show}
        autoHideDuration={6000}
        onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity="error">
          {snackBarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const loader = async ({ params }) => {
  const { code } = params;
  return await getEntryInfo(code);
};
export const action = async ({ request }) => {
  const formData = await request.formData();
  return await submitEntry(formData);
};
