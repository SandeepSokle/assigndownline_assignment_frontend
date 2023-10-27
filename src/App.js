import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import NotFound from "./components/Nopage";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("assignTaskToken");
    return token ? true : false;
  };

  // Private wrapper component
  const PrivateWrapper = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/update" element={<Signup update={"update"} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
