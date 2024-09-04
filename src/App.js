import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Offline, Online } from "react-detect-offline";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

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
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
