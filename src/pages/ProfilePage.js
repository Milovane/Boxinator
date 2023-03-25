import React from "react";
import { useContext } from "react";
import { Context } from "../context";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import keycloak from "../keycloak";
import InfoIcon from "@mui/icons-material/Info";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);

  //navigate("/user");
  return (
    <>
      <div className="container md:mx-auto mt-[140px] mb-24 bg-white p-20 rounded-lg">
        {context.firstName != null && (
          <>
            <h1>
              <PortraitIcon sx={{ fontSize: 60 }} />
            </h1>

            <p className="text-[40px] text-transform: capitalize">
              {context.firstName} {context.lastName}
            </p>
            <br />
            <ul>
              <li>
                <b>Email: </b>
                {context.email}
              </li>
              <li>
                <b>Date of birth: </b>
                {context.dateOfBirth}
              </li>
              <li>
                <b>Country: </b> {context.country}
              </li>
              <li>
                <b>Zipcode: </b> {context.zipCode}
              </li>
              <li>
                <b>Contact number: </b> {context.contactNumber}
              </li>
            </ul>
            <br />
            <Button variant="contained" onClick={() => navigate("/user")}>
              Update profile
            </Button>
          </>
        )}

        {context.firstName == null && (
          <>
            <p>
              <span className="text-blue-600">
                <InfoIcon />
              </span>
              You do not have an account
            </p>
            <br />
            <Button variant="contained" onClick={() => navigate("/register")}>
              Create profile
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
