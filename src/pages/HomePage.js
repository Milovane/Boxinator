import React from "react";
//import "../css/HomePage.css";
import containerImg1 from "../images/containers.jpg";
import containerImg2 from "../images/containers2.jpg";

const HomePage = () => {
  return (
    <>
      <div className="container md:mx-auto mt-4 md:mt-12 mb-4 md:mb-12 bg-white p-7 sm:p-20 rounded-lg">
        <div className="mt-5">
          <h1 className="text-[40px]">Welcome to boxinator</h1>
          <br />
          Boxinator provides shipments of mystery boxes all over the world.
          <br />
          <br />
          <br />
          <img src={containerImg1} alt="" />
          <br />
          <b>The available tiers are the following:</b>
          <ul>
            <li>Basic: 1kg</li>
            <li>Humble: 2kg</li>
            <li>Deluxe: 5kg</li>
            <li>Premium: 8kg</li>
          </ul>
          <br />
          <img src={containerImg2} alt="" />
        </div>
      </div>
      <div className="pb-10"></div>
    </>
  );
};

export default HomePage;
