import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicSelect from "./selectUser";
import axios from "axios";
import { API_URL } from "../Config/configInfo";

export default function Signup() {
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          //   height: "70%",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          <h1>Signup User</h1>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            value={formData.name}
            onChange={(event) => {
              handleChange("name", event.target.value);
            }}
            sx={{
              marginBottom: "14px",
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter Job Title"
            variant="outlined"
            value={formData.jobTitle}
            onChange={(event) => {
              handleChange("jobTitle", event.target.value);
            }}
            sx={{
              marginBottom: "14px",
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            type="number"
            label="Enter Phone Number"
            variant="outlined"
            value={formData.phoneNumber}
            onChange={(event) => {
              handleChange("phoneNumber", event.target.value);
            }}
            sx={{
              marginBottom: "14px",
            }}
          />
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
            sx={{
              marginBottom: "14px",
            }}
          />
          <BasicSelect setFormData={setFormData} formData={formData} />
        </Box>

        <Button fullWidth variant="contained"
          onClick={() => {
            let status = signupUser(formData);
            if (status) navigate("/");
          }}>
          Signup
        </Button>
        <Button
          sx={{
            marginTop: "10px",
          }}
          fullWidth
          variant="text"
          onClick={() => {
            navigate("/login");
          }}
        >
          I have Account
        </Button>
      </Box>
    </div>
  );
}


const signupUser = async (userDetails) => {
  try {
    const data = await axios.post(`${API_URL}user/signup`, {
      ...userDetails,
    });

    console.log(data.data.response.token);
    localStorage.setItem("assignTaskToken", data.data.response.token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};