import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../Header";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { login } from "../../handlers/admin/login";
let campus = "";
export const Component = () => {
  const navigate = useNavigate();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      if (actionData.status === 200) {
        campus = actionData.data.campus;
        navigate("/admin/" + campus);
      } else {
        alert(actionData.data.message);
      }
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
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const action = async ({ request }) => {
  const { form } = await request.json();
  return login(form);
};
