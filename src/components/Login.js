import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Config/configInfo";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (type, value) => {
    setFormData({
      ...formData,
      [`${type}`]: value,
    });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "70vh",
          width: "60vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          <h1>Login User</h1>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email..."
            variant="outlined"
            value={formData.email}
            onChange={(event) => {
              handleChange("email", event.target.value);
            }}
            sx={{
              marginBottom: "14px",
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            type="password"
            label="password"
            variant="outlined"
            value={formData.password}
            onChange={(event) => {
              handleChange("password", event.target.value);
            }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            let status = loginUser(formData);
            if (status) {
              navigate("/");
              // window.location.reload();
            }
          }}
        >
          Login
        </Button>
        <Button
          sx={{
            marginTop: "10px",
          }}
          fullWidth
          variant="text"
          onClick={() => {
            navigate("/signup");
          }}
        >
          I have Not Account
        </Button>
      </Box>
    </div>
  );
}
const loginUser = async (loginDetails) => {
  try {
    const data = await axios.post(`${API_URL}user/login`, {
      ...loginDetails,
    });

    localStorage.setItem("assignTaskToken", data.data.response.token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
