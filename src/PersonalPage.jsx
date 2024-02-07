import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "./components/Header";
import { useParams } from "react-router-dom";
import Fillup from "./Fillup";
import Slot from "./Slot";

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
  ID: "",
};
const PersonalPage = () => {
  const { code } = useParams();
  const [form, setForm] = useState(defaultValues);
  const [showModal, setShowModal] = useState(false);
  const [showSlot, setShowSlot] = useState(false);
  // const [email, setEmail] = useState("")
  const [email, setEmail] = useState("a@a.com");
  const [confirmEmail, setConfirmEmail] = useState("");
  const inputHandler = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
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
  const closeModal = () => setShowModal(false);

  const proceedHandler = () => {
    closeModal();
    setShowSlot(true);
  };
  const uploadHandler = (e) => {
    const { name, files } = e.target;
    const [file] = files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, [name]: reader.result }));
  };
  const isEmailsMatching = email === confirmEmail;
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
              {showSlot ? (
                <Slot />
              ) : (
                <Fillup
                  form={form}
                  inputHandler={inputHandler}
                  dateChangeHandler={dateChangeHandler}
                  submitHandler={submitHandler}
                  uploadHandler={uploadHandler}
                  proceedHandler={proceedHandler}
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
    </Box>
  );
};

export default PersonalPage;
