import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Tabel";
import { Box } from "@mui/material";
import axios from "axios";
import { API_URL } from "../Config/configInfo";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [userDownList, setUserDownList] = useState([]);
  const [tog, setTog] = useState(true);

  const location = useLocation();
  const webtoken = location.state;

  useEffect(() => {
    getDownUsers(setUserDownList, setTog, webtoken);
  }, [tog]);
  
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header />
      <StickyHeadTable userDownList={userDownList} setTog={setTog} />
    </Box>
  );
}

const getDownUsers = async (setUserDownList, setTog, webtoken) => {
  try {
    let token = localStorage.getItem("assignTaskToken");
    const data = await axios.get(`${API_URL}user/get_downline`, {
      headers: {
        Authorization: `Barear ${webtoken || token}`,
      },
    });
    setTog(false);
    setUserDownList(data.data.response.userDownlineList);
  } catch (err) {
    console.log(err);
  }
};
