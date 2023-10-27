import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: "blue", // Change the background color to blue
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  };

  const profileIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px", // Adjust the font size as needed
  };

  const popupStyle = {
    display: isPopupVisible ? "block" : "none",
    position: "absolute",
    top: "60px", // Adjust the top position as needed
    right: "10px",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  };

  const handleProfileClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("assignTaskToken");
    navigate("/login");
  };
  return (
    <div style={headerStyle}>
      <h1>App Title</h1> {/* You can add your app's title here */}
      <div style={profileIconStyle} onClick={handleProfileClick}>
        A {/* Replace with the initial or icon for the profile */}
      </div>
      {isPopupVisible && (
        <div style={popupStyle}>
          <button
            onClick={() => {
              navigate("/update");
            }}
          >
            update Profile
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
