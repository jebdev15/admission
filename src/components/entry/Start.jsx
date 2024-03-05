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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { registerUser } from "../../handlers/email";

const AlertResponse = ({ msg }) => {
  let text = "";
  switch (msg) {
    case "success":
      text = "Email successfully submitted! Please check your email";
      break;
    case "duplicate":
      text = "Email has already submitted an entry!";
      break;

    default:
      text = "Something went wrong! Contact CHMSU ICT";

      break;
  }
  return (
    <Alert severity={msg === "success" ? "success" : "error"}>{text}</Alert>
  );
};
const DataPrivacyContent = () => (
  <DialogContentText>
    <Typography color="primary.main" fontWeight={500} textTransform="uppercase">
      Who we are
    </Typography>
    <Typography variant="caption">
      {" "}
      Carlos Hilado Memorial State University is a GREEN university committed to
      empower learners through academic excellence, relevant research, active
      community engagement, and good governance in order to build a just and
      sustainable world. The Office of the Guidance Services, the office
      spearheading the Carlos Hilado Memorial State University Entrance Test
      (CHMSUET), is one with this mission and seeks to deliver quality services
      to all its clientele.
    </Typography>
    <Divider />
    <Typography color="primary.main" fontWeight={500} textTransform="uppercase">
      What information we collect and how
    </Typography>
    <Typography variant="caption">
      {" "}
      The information we collect via the website may include: <br />
      1. Personal details - Any personal details you knowingly provide us
      through forms and our email, such as name, address, telephone number, etc.
      Under no circumstances will we hold sensitive payment details such as your
      credit/debit card number, expiry date and security code. <br />
      2. IP Address - This is a string of numbers unique to your computer that
      is recorded by our web server when you request any page or component on
      the website. This information is used to monitor your usage of the
      website. <br />
      3. Preferred settings – The website will record data which allows us to
      recognize you and your preferred settings. This saves you from re-entering
      information on return visits to the site. Such data is recorded locally on
      your computer through the use of cookies. Most browsers can be programmed
      to reject or warn you before downloading cookies. Information regarding
      this may be found in your browser’s help facility.
    </Typography>
    <Divider />
    <Typography color="primary.main" fontWeight={500} textTransform="uppercase">
      What we do with your information
    </Typography>
    <Typography variant="caption">
      {" "}
      Any personal information we collect from this website will be used in
      accordance with the Republic Act 10173 – Data Privacy Act of 2012 and
      other applicable laws. Specifically, the details we collect will be used
      to: <br />
      1. process your request for taking the university’s pre-admissions test,
      CHMSUET, and to provide the information required by the Commission on
      Higher Education (CHED) for billing and related purposes under the
      REPUBLIC ACT No. 10687 or CHED UNIFAST Law; and <br />
      2. carry out certain activities such as processing and sorting data,
      monitoring how customers use the Website and issuing our e-mails for us.
      Third parties may be asked to do this but will not be allowed to use your
      personal information for their own purposes. We may need to pass the
      information we collect to authorized persons under the student admission
      and screening committee.
    </Typography>
    <Divider />
    <Typography color="primary.main" fontWeight={500} textTransform="uppercase">
      Your Rights
    </Typography>
    <Typography variant="caption">
      {" "}
      You have the right to request a copy of any information that we currently
      hold about you. In order to receive such information, please send your
      contact details and address using our support form. Further instructions
      will be given.
    </Typography>
  </DialogContentText>
);
export const Component = () => {
  const navigate = useNavigate();

  const [showPolicy, setShowPolicy] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({
    showModal: false,
    msg: "",
  });
  const [quotaModal, setQuotaModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData();
  const proceedHandler = () => setProceed(!proceed);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    setQuotaModal(true);
    setIsSubmitting(false);
    // submit(
    //   { email },
    //   {
    //     action: "/",
    //     method: "post",
    //     encType: "application/json",
    //   }
    // );
  };
  const closeModal = () =>
    setSubmitResponse((prev) => ({ ...prev, showModal: false }));
  const closePolicyModal = () => setShowPolicy(false);
  const closeQuotaModal = () => setQuotaModal(false);
  const openPolicyModal = () => setShowPolicy(true);

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
                  <Typography variant="subtitle2">
                    By proceeding, you have read and acknowledged the{" "}
                    <Button
                      variant="text"
                      sx={{ m: 0, p: 0, textTransform: "capitalize" }}
                      onClick={openPolicyModal}
                    >
                      Data Privacy Policy
                    </Button>
                  </Typography>
                </Typography>
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="caption">
                    Please confirm that you have a working email before
                    proceeding
                  </Typography>
                </Alert>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="caption">
                    For Desktop/Laptop users: Prepare photo and School ID for
                    uploading.
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
      <Dialog
        open={showPolicy}
        maxWidth="sm"
        fullWidth
        onClose={closePolicyModal}
      >
        <DialogTitle>CHMSU Data Privacy Policy</DialogTitle>
        <DialogContent>
          <DataPrivacyContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePolicyModal}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={quotaModal}
        maxWidth="sm"
        fullWidth
        onClose={closeQuotaModal}
      >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            <Typography variant="body1">
              Due to the high volume of reservations, our slots have reached the
              maximum capacity. Please wait for further announcements. Thank
              you!
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeQuotaModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export const action = async ({ request }) => {
  const { email } = await request.json();
  return await registerUser(email);
};
