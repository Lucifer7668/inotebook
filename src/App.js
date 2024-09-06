import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Offline, Online } from "react-detect-offline";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Profile from "./components/Profile";

function App() {
  const [progress, setProgress] = useState("0");
  return (
    <>
      <NoteState>
        <Router>
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress("0")}
          />
          <Offline></Offline>
          <Online></Online>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={ <ProtectedRoute><Home /></ProtectedRoute>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<AuthRedirect><Login /></AuthRedirect>}></Route>
              <Route exact path="/signup" element={<AuthRedirect><Register /></AuthRedirect>}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
