import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAction } from "../Redux/Actions";
import EditCommentaryModal from "./EditCommentaryModal";

export default function CommentPopover(props) {
  const dispatch = useDispatch();

  const apiUrl = process.env.REACT_APP_BE_URL;
  const user = useSelector((state) => state.user.user);
  const onDelete = async () => {
    const options = {
      method: "DELETE",
    };
    try {
      const endpoint = `${apiUrl}/posts/${props.postId}/comments/${props.com._id}`;
      const response = await fetch(endpoint, options);
      if (response.ok) {
        console.log("Comment Deleted");
        dispatch(fetchAllPostsAction());
      } else {
        throw new Error("Error while uploading information");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  const popover = (
    <Popover id="popover-basic">
      <div className="d-flex flex-column">
        <EditCommentaryModal postId={props.postId} com={props.com} />

        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <i className="bi bi-three-dots ml-auto pl-1"></i>
    </OverlayTrigger>
  );
}
