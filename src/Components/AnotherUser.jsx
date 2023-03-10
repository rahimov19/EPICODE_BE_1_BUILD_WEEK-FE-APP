/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { guestUserAction } from "../Redux/Actions";
import FooterPart from "./FooterPart";
import PostsUser from "./PostsUser";

export default function AnotherUser() {
  const apiUrl = process.env.REACT_APP_BE_URL;

  const guest = useSelector((state) => state.user.guest);
  const users = useSelector((state) => state.user.users);
  const [guestxp, setguestxp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guest]);
  useEffect(() => {
    fetchXp();
  }, [guest]);
  const fetchXp = async () => {
    try {
      let response = await fetch(`${apiUrl}/users/${guest._id}/experiences`);
      if (response.ok) {
        let data = await response.json();
        setguestxp(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function guestPage(profile) {
    dispatch(guestUserAction(profile, profile._id));
    navigate("/guest/" + profile._id);
  }
  return (
    <>
      <Container id="main">
        <Row>
          <Col xs={9}>
            <div id="images">
              <img
                src={"http://placekitten.com/1500/600"}
                alt={"cover"}
                id="cover"
              ></img>
              <img src={guest.image} alt={guest} id="ava" />
            </div>
            <Row id="mainrow">
              <div className="bgWhite d-flex w-100 pb-4">
                <Col xs={8} id="userName" className="pl-5 ">
                  <h3>
                    {guest.name} {guest.surname}
                  </h3>
                  <h5>{guest.title}</h5>
                  <p>{guest.area}</p>
                  <div id="userbuttons">
                    <Button id="userbutton1"> Interested </Button>
                    <Button id="userbutton2">
                      <i class="bi bi-lock"></i> Send a message{" "}
                    </Button>
                    <Button id="userbutton3"> More </Button>
                  </div>
                </Col>
                <Col xs={4} id="companiesCol">
                  {guestxp ? (
                    guestxp.slice(0, 2).map((xp) => (
                      <>
                        <div className="companies">
                          <img
                            src={
                              xp.image ? xp.image : "http://placekitten.com/300"
                            }
                            alt="company"
                          ></img>{" "}
                          <div className="w-100">
                            <p className="m-0">
                              <b>{xp.company}</b>
                            </p>
                            <p className="m-0">{xp.role}</p>
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <h5>User works nowhere</h5>
                  )}
                </Col>
              </div>
              <Col xs={12} className="p-0 mt-2">
                <div className="bgWhite p-4 w-100">
                  <h5>Main Information</h5>
                  <p>{guest.bio}</p>
                </div>
                <PostsUser user={guest} />
              </Col>
            </Row>
          </Col>
          <Col xs={3} className="bgWhite h-100 pb-3">
            <div className="mt-4 rightpart ">
              <Row className="mb-3  ">
                <Col xs={10}>
                  <h5>Change some of data </h5>
                </Col>
                <Col xs={2} className={"iconquestionmark"}>
                  <i className="bi bi-question-circle-fill"></i>
                </Col>
              </Row>
              <hr className="hr"></hr>
              <Row>
                <Col xs={10}>
                  <h5>Make your page another </h5>
                </Col>
                <Col xs={2} className={"iconquestionmark"}>
                  <i className="bi bi-question-circle-fill"></i>
                </Col>
                <Col xs={12} className={"othersCol px-3"}>
                  <h3 className="my-3">Check others</h3>
                  {users[0].name ? (
                    <div className="otherUsers">
                      {users.slice(0, 5).map((profile) => (
                        <>
                          <div
                            className="otherUserData"
                            onClick={() => guestPage(profile, profile._id)}
                          >
                            <div className="otherUsersPic">
                              <img src={profile.image} alt="others" />
                            </div>
                            <div className="otherUsersDesc">
                              <p>
                                {profile.name} {profile.surname}
                              </p>
                              <p>{profile.title}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  ) : (
                    <h5>Some Users</h5>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterPart />
    </>
  );
}
