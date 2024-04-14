import React from "react";
import { Link } from "react-router-dom";
import video from "../assets/v1.gif";

function Video() {
  return (
    <div className="video-container">
      <img className="w-full min-h-screen md:h-[750px]" src={video} alt="" />
      <div className="flex justify-center items-center">
        <div className="z-10 -translate-y-40 bg-blue-500  md:w-40  p-3 text-white rounded-full">
          <Link to="/canvas">START</Link>
        </div>
      </div>
    </div>
  );
}

export default Video