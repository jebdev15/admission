import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useActionData, useSubmit } from "react-router-dom";
import { registerUser } from "./handlers/email";

const AlertResponse = ({ msg }) => {
  let text = "";
  switch (msg) {
    case "success":
      text = "Email successfully submitted! Please check your email";
      break;
    case "duplicate":
      text = "Email has already submitted an entry! Please check your email";
      break;

    default:
      text = "Something went wrong! Contact CHMSU ICT";

      break;
  }
  return (
    <Alert severity={msg === "success" ? "success" : "error"}>{text}</Alert>
  );
};
const Start = () => {
  const [proceed, setProceed] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({
    showModal: false,
    msg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData();
  const proceedHandler = () => setProceed(!proceed);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    submit(
      { email },
      {
        action: "/",
        method: "post",
        encType: "application/json",
      }
    );
  };
  const closeModal = () =>
    setSubmitResponse((prev) => ({ ...prev, showModal: false }));

  useEffect(() => {
    if (actionData && Object.keys(actionData).length) {
      setSubmitResponse((prev) => ({
        ...prev,
        msg: actionData.msg,
        showModal: true,
      }));
      setIsSubmitting(false);
    }
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
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card variant="outlined" sx={{ maxWidth: "500px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="primary.main"
                  gutterBottom
                >
                  ADMISSION PROCESS INSTRUCTION
                </Typography>
                <Typography variant="body">
                  Kindly provide your email address on the form that will appear
                  after you proceed. An email confirmation will be sent to the
                  email address provided with the link to the admission form.
                  <br />
                  <br />
                  This serves as your entry into the system. 
                </Typography>
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    Please confirm that you have a working email before
                    proceeding
                  </Typography>
                </Alert>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ ml: "auto", display: proceed ? "none" : "" }}
                  onClick={proceedHandler}
                >
                  PROCEED
                </Button>
              </CardActions>
              {proceed && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    px: 3,
                  }}
                  component="form"
                  onSubmit={submitHandler}
                >
                  <Divider flexItem />
                  <TextField
                    variant="outlined"
                    placeholder="Email"
                    size="small"
                    sx={{ mb: 1 }}
                    type="email"
                    name="email"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{ mb: 3 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              )}
            </Card>
          </Box>
        </Container>
      </Box>
      <Dialog
        open={submitResponse.showModal}
        maxWidth="sm"
        fullWidth
        onClose={closeModal}
      >
        <DialogTitle>{submitResponse.msg.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <AlertResponse msg={submitResponse.msg} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export const action = async ({ request }) => {
  const { email } = await request.json();
  return await registerUser(email);
};

export default Start;
