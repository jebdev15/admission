import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../Header";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { login } from "../../handlers/admin/login";
import { useCookies } from "react-cookie";

// let campus = "";
export const Component = () => {
  const siteCookies = ["session_id", "session_campus"];
  const navigate = useNavigate();
  const actionData = useActionData();
  const [cookies, ,] = useCookies(siteCookies);

  const checkCookie = (cookieName) => {
    // console.log(cookies.cookieName);
    return Object.prototype.hasOwnProperty.call(cookies, cookieName)
  }

  useEffect(() => {
    if(checkCookie('session_id') && checkCookie('session_campus')) {
      navigate("/admin/" + cookies.session_campus);
    } else {
      if(actionData){
        if(actionData.status === 200) {
          navigate("/admin/" + actionData.data.campus);
        } else {
          alert(actionData.data.message);
        } 
      } else {
        navigate("/admin");
      }
    }
  }, [actionData, cookies, navigate]);
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
