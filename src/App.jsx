import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Video from "./components/Video";
import Canvas from "./components/Canvas";

function App() {
  return (
   
    <Router>
      <div className=" w-full h-[50rem] text-center select-none bg-[#153A70]">
        <Routes> 
          <Route path="/" element={<Video />} />
          <Route
            path="/canvas"
            element={<div className="pt-[2rem] px-[2rem] overflow-hidden h-[780px]"><Canvas width={1100} height={600} /></div>}
          />
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
