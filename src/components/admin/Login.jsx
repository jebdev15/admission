import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigation, useSubmit } from "react-router-dom";

export const Component = () => {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    campus: "",
  });

  const onChangeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = () => {
    submit(
      {
        form,
      },
      {
        action: "/admin",
        method: "post",
        encType: "application/json",
      }
    );
  };
  return (
    <Card variant="outlined" sx={{ maxWidth: "300px", width: "100%" }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.main"
          gutterBottom
        >
          ADMIN LOGIN
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            value={form.username}
            variant="outlined"
            placeholder="Username"
            size="small"
            name="username"
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            value={form.password}
            variant="outlined"
            type="password"
            placeholder="Password"
            size="small"
            name="password"
            onChange={onChangeHandler}
          />
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Campus</InputLabel>
            <Select
              value={form.campus}
              name="campus"
              label="Campus"
              onChange={onChangeHandler}
            >
              <MenuItem value="Alijis">Alijis</MenuItem>
              <MenuItem value="Binalbagan">Binalbagan</MenuItem>
              <MenuItem value="Fortune Towne">Fortune Towne</MenuItem>
              <MenuItem value="Talisay">Talisay</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ ml: "auto" }}
          onClick={login}
          disabled={navigation.state === "loading"}
        >
          {navigation.state === "loading" ? "Loading..." : "Login"}
        </Button>
      </CardActions>
    </Card>
  );
};
