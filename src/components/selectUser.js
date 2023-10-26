import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { API_URL } from "../Config/configInfo";

export default function BasicSelect(props) {
  const { setFormData, formData } = props;

  //   const [age, setAge] = React.useState("");
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    getUserData(setUserList);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      upline: event.target.value,
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel fullWidth id="demo-simple-select-label">
        Select Your Manager
      </InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formData.upline}
        label="Select Your Manager"
        onChange={handleChange}
      >
        {userList.map((ele) => {
          return <MenuItem value={ele._id}>{ele.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}


const getUserData = async (setUserList) => {
    try {
      const data = await axios.get(`${API_URL}user/registered_users`);
      setUserList(data.data.response.users || []);
      return data.data.response.users;
    } catch (err) {
      console.log(err);
    }
  };