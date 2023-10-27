import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicSelect from "./selectUser";
import axios from "axios";
import { API_URL } from "../Config/configInfo";

export default function Signup(props) {
  const { update } = props;

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (type, value) => {
    setFormData({
      ...formData,
      [`${type}`]: value,
    });
  };

  useEffect(() => {
    if (update) {
      getUserData({ setFormData });
    }
  }, [update]);

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
          <h1>{update ? "Update User" : "Signup User"}</h1>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            value={formData.name || ""}
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
            value={formData.jobTitle || ""}
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
            value={formData.phoneNumber || ""}
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
            value={formData.email || ""}
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
            value={formData.password || ""}
            onChange={(event) => {
              handleChange("password", event.target.value);
            }}
            sx={{
              marginBottom: "14px",
            }}
          />
          <BasicSelect setFormData={setFormData} formData={formData} />
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={async () => {
            if (update) {
              let status = await updateUser(formData);
              if (status.success) navigate("/", { state: status.webToken });
            } else {
              let status = await signupUser(formData);
              if (status.success) navigate("/", { state: status.webToken });
            }
          }}
        >
          {update ? "Update" : "Signup"}
        </Button>
        {update ? null : (
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
        )}
      </Box>
    </div>
  );
}

const signupUser = async (userDetails) => {
  try {
    const data = await axios.post(`${API_URL}user/signup`, {
      ...userDetails,
    });

    localStorage.setItem("assignTaskToken", data.data.response.token);

    return {
      success: true,
      webToken: data.data.response.token,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};

const getUserData = async ({ setFormData }) => {
  try {
    let token = localStorage.getItem("assignTaskToken");
    const data = await axios.get(`${API_URL}user/get_data`, {
      headers: {
        Authorization: `Barear ${token}`,
      },
    });
    let data2 = data.data.response.myData;
    setFormData(data2);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (userDetails) => {
  try {
    const data = await axios.post(`${API_URL}user/update`, {
      ...userDetails,
    });

    localStorage.setItem("assignTaskToken", data.data.response.token);

    return {
      success: true,
      webToken: data.data.response.token,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
