import React from "react";
import { Logo } from "../components/login-components/Logo";
//import "../css/HomePage.css";
import containerImg1 from "../images/containers.jpg";
import containerImg2 from "../images/containers2.jpg";

const HomePage = () => {
  return (
    <>
      <div className="container md:mx-auto mt-24 mb-24 bg-white p-20">
        <Logo w="w-8" h="h-8" textColor={"text-dark"} />

        <div className="mt-5">
          Welcome to boxinator.
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
    </>
  );
};

export default HomePage;
