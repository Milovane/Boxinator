import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../context";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import keycloak, { user } from "../keycloak";
import InfoIcon from "@mui/icons-material/Info";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);

  useEffect(() => {
    if (user == null) {
      navigate("/register");
    } else {
      updateContext(user);
    }
  }, []);

  //navigate("/user");
  return (
    <>
      <div className="container md:mx-auto mt-[140px] mb-24 bg-white p-20 rounded-lg">
        {user != null && (
          <>
            <h1>
              <PortraitIcon sx={{ fontSize: 60 }} />
            </h1>

            <p className="text-[40px] text-transform: capitalize">
              {user.firstName} {user.lastName}
            </p>
            <br />
            <ul>
              <li>
                <b>Email: </b>
                {user.email}
              </li>
              <li>
                <b>Date of birth: </b>
                {user.dateOfBirth}
              </li>
              <li>
                <b>Country: </b> {user.country}
              </li>
              <li>
                <b>Zipcode: </b> {user.zipCode}
              </li>
              <li>
                <b>Contact number: </b> {user.contactNumber}
              </li>
            </ul>
            <br />
            <Button variant="contained" onClick={() => navigate("/user")}>
              Update profile
            </Button>
          </>
        )}

        {user == null && (
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
