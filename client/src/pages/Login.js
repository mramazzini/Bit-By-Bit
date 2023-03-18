// import { useRef, useState, useEffect } from 'react';
import React, { useState } from "react";
import "../styles/Login.css";
import LoginComponent from "../components/login/LoginComponent";

const Login = () => {
  return (
    <div className="login-page">
      <LoginComponent />
    </div>
  );
};
export default Login;
