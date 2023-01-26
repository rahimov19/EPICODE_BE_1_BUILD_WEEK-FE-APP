import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAllPostsAction } from "../Redux/Actions";

const EditCommentaryModal = (props) => {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_BE_URL;

  const onSave = async () => {
    const options = {
      method: "PUT",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAzMWM5NmRmYjAwMTUyMWE1YmIiLCJpYXQiOjE2NzA4MzYyODAsImV4cCI6MTY3MjA0NTg4MH0.-mjIeGuDeV798UyGFGMsc5ORRw1nL5qqVP2qkCqN7MY",
      },
    };
    try {
      const endpoint = `${apiUrl}/posts/${props.postId}/comments/${props.com._id}`;
      const response = await fetch(endpoint, options);
      if (response.ok) {
        dispatch(fetchAllPostsAction());
      } else {
        throw new Error("Error while uploading information");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [commentary, setCommentary] = useState(props.com.comment);
  const [show, setShow] = useState(false);
  const comment = { comment: commentary };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setCommentary(event.target.value);
  };

  const handleSave = () => {
    onSave(commentary);
    setShow(false);
  };

  return (
    <>
      {" "}
      <Button variant="primary" onClick={handleShow}>
        Edit Comment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Commentary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea value={commentary} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCommentaryModal;
