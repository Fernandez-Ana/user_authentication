import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import "./App.scss";
import Nav from './components/Nav'
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import User from "./components/User";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/userprofil" element={<User />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;
