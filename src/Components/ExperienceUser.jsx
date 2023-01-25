import React from "react";
import AddExperience from "./AddExperience";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function ExperienceUser() {
  const apiUrl = process.env.REACT_APP_BE_URL;
  const user = useSelector((state) => state.user.user);
  const downloadCSV = async () => {
    try {
      const csvFile = await fetch(
        `${apiUrl}/files/${user._id}/experiences/CSV`
      );
      console.log(csvFile);
      window.open(csvFile.url, "_blank").focus();
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const experienceList = useSelector((state) => state.experience.experience);
  return (
    <Col xs={12} className="experience bgWhite w-100 p-4">
      <div className="experienceC4 w-70">
        <h4 className="mb-4">Job Experience</h4>
        <div className="w-30 d-flex mr-4">
          <AddExperience />
          <i
            className="bi bi-pencil-fill"
            onClick={() => navigate("/profile/experience")}
          ></i>
          <i class="bi bi-download" onClick={() => downloadCSV()}></i>
        </div>
      </div>
      {experienceList[0] ? (
        experienceList.map((xp, i) => (
          <div className="experienceDiv" key={xp._id}>
            <div className="experienceDivImg">
              <img
                src={xp.image ? xp.image : "https://placekitten.com/300"}
                alt={"experience company img"}
              />
            </div>
            <div className="experienceDivInfo">
              <h5>{xp.role}</h5>
              <h6>{xp.company}</h6>
              <p>
                {format(new Date(xp.startDate), "MMMM yyyy")} -{" "}
                {format(new Date(xp.endDate), "MMMM yyyy")} 4m
              </p>
              <p>{xp.area}</p>
              <p className="experienceDivInfoLast">{xp.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No experience to show</div>
      )}
    </Col>
  );
}
