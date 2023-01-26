import { unstable_ownerWindow } from "@mui/utils";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserAction, guestUserAction } from "../Redux/Actions";

export default function Network() {
  const apiUrl = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gotoProfile = (activeConnection) => {
    dispatch(guestUserAction(activeConnection));
    navigate(`/guest/${activeConnection._id}`);
  };
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.users);
  const options = { method: "PUT" };
  const approveRequest = async (conId) => {
    try {
      const response = await fetch(
        `${apiUrl}/requests/${user._id}/acceptRequest/${conId}`,
        options
      );
      if (response.ok) {
        console.log("Approved Succesfully");
        dispatch(fetchUserAction());
      } else {
        console.log("Error while approving");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const declineRequest = async (conId) => {
    try {
      const response = await fetch(
        `${apiUrl}/requests/${user._id}/declineRequest/${conId}`,
        options
      );
      if (response.ok) {
        console.log("Declined Succesfully");
        dispatch(fetchUserAction());
      } else {
        console.log("Error while declining");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={3} className="mt-4">
          <div className="bgWhite p-3">
            <h5>Configure your network</h5>
            <div className="networkrow">
              <i class="bi bi-people-fill"></i> <p>Connections</p>
              <p>{users.length}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-journal"></i> <p>Contacts</p>
              <p>{users.length}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-person-fill"></i> <p>Followers</p>
              <p>{Math.floor(Math.random() * 500)}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-people-fill"></i> <p>Groups</p>
              <p>{Math.floor(Math.random() * 500)}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-calendar-date"></i> <p>Events</p>
              <p>{Math.floor(Math.random() * 500)}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-building"></i> <p>Pages</p>
              <p>{Math.floor(Math.random() * 500)}</p>
            </div>
            <div className="networkrow">
              <i class="bi bi-newspaper"></i> <p>Newsletters</p>
              <p>{Math.floor(Math.random() * 500)}</p>
            </div>
          </div>
          <div className="bgWhite p-3 addcontactsnetwork mt-3">
            <h5>Add contacts</h5>
            <p>
              We'll periodically import and store your contacts to help you and
              others connect. You choose who to connect to and who to invite.
              <span>Learn more...</span>{" "}
            </p>{" "}
            <input type="text" placeholder={user.email} className={"px-2"} />{" "}
            <Button>Continues</Button>
          </div>
        </Col>
        <Col xs={8}>
          <div className="bgWhite d-flex flex-column justify-content-between px-4 py-2 my-4">
            <h5>New Friends requests:</h5>
            {user.connections.pending.length > 0 ? (
              user.connections.pending.map((connection) => (
                <div className="d-flex mb-2">
                  <img
                    src={connection.user.image}
                    alt="meow"
                    className="requestUserPic"
                  />
                  <div className="d-flex">
                    <h6 className="mx-2">
                      <b>
                        {" "}
                        {connection.user.name} {connection.user.surname}
                      </b>
                    </h6>
                    <p>{connection.text}</p>
                  </div>
                  <div className="d-flex ml-auto">
                    <i
                      className="bi bi-check-circle mr-1"
                      onClick={() => approveRequest(connection._id)}
                    ></i>{" "}
                    <i
                      className="bi bi-x-circle"
                      onClick={() => declineRequest(connection._id)}
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <>
                {" "}
                <div className="d-flex">
                  <p className="py-2 m-0">No new requests</p>{" "}
                  <span className="configurespan ml-auto">Congirufe</span>
                </div>
              </>
            )}
          </div>
          <div className="bgWhite px-3 py-4">
            <div className="d-flex justify-content-between mb-3">
              <h5>Your Friends Network</h5>
              <span>See All</span>
            </div>
            <Row>
              {user.connections.active.length > 0 ? (
                user.connections.active.map((activeConnection, i) => (
                  <Col xs={4}>
                    <Card style={{ width: "100%" }}>
                      <Card.Img
                        variant="top"
                        className="carduserimg"
                        src={"https://placekitten.com/40" + i}
                      />
                      <Card.Body>
                        <Card.Title
                          className="pt-3 cardtitleuser"
                          onClick={() => gotoProfile(activeConnection.user)}
                        >
                          <img
                            src={
                              activeConnection.user.image
                                ? activeConnection.user.image
                                : "https://placekitten.com/400"
                            }
                            alt={"userimg"}
                            className={"carduserava"}
                          />
                          {activeConnection.user.name}{" "}
                          {activeConnection.user.surname}
                        </Card.Title>
                        <Card.Text className="cardtextuser">
                          {activeConnection.user.title}
                          <p className="cardfollowers">
                            {Math.floor(Math.random() * 500)} Followers
                          </p>
                        </Card.Text>
                        <Button className="cardbuttonuser">
                          Send a message
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div></div>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
