import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { fetchAllPostsAction } from "../Redux/Actions";

export default function AddPost() {
  const apiUrl = process.env.REACT_APP_BE_URL;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const submitChanges = async () => {
    const postInformation = {
      user: user._id,
      username: user.username,
      text: document.querySelector("#posttext").value,
    };
    console.log(postInformation);

    const options = {
      method: "POST",
      body: JSON.stringify(postInformation),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const endpoint = `${apiUrl}/posts/`;
      const response = await fetch(endpoint, options);
      if (response.ok) {
        alert("Post created successfully");
      } else {
        throw new Error("Error while uploading information");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(fetchAllPostsAction());
    handleClose();
  };

  return (
    <>
      <input
        type="text"
        placeholder="New Post"
        id="middleinput"
        onClick={handleShow}
      />

      <Modal id="modalAddPost" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="posttop">
              <div>
                <img src={user.image} alt="postautor" className="authorimg" />
              </div>
              <div className="author">
                <p>
                  {user.name} {user.surname}{" "}
                </p>

                <Button id="postbutton">
                  <i class="bi bi-globe-asia-australia"></i>
                  <p> Worldwide</p> <i class="bi bi-caret-down-fill"></i>
                </Button>
              </div>
            </div>
          </div>
          <Form>
            <Form.Group controlId="posttext" className="mb-5">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="What do you want to share?"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between footercreatepost mt-5">
          <Col
            xs={3}
            className="d-flex justify-content-between footerposticons"
          >
            <i class="bi bi-image"></i>
            <i class="bi bi-play-btn-fill"></i>
            <i class="bi bi-file-earmark-text-fill"></i>
            <i class="bi bi-three-dots"></i>
          </Col>
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center footermamber"
          >
            <i class="bi bi-chat-left-text"></i> Any member
          </Col>
          <Col
            xs={3}
            className="d-flex justify-content-between align-items-center"
          >
            <i class="bi bi-clock"></i>{" "}
            <Button
              variant="primary"
              type="submit"
              id="submitPostButton"
              onClick={submitChanges}
            >
              Publish
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
}
