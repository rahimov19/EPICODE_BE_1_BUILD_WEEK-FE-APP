import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RecommendIcon from "@mui/icons-material/Recommend";
import StarsIcon from "@mui/icons-material/Stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import PostPopover from "./PostPopover";
import { useNavigate } from "react-router-dom";
import { fetchAllPostsAction, guestUserAction } from "../Redux/Actions";
import CommentPopover from "./CommentPopover";

export default function NewsFeed() {
  // function getMultipleRandom(arr, num) {
  //   const shuffled = [...arr].sort(
  //     () => 1000 - Math.floor(Math.random() * 2000)
  //   );

  //   return shuffled.slice(0, num);
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL;
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts);
  const [comment, setComment] = useState("");
  console.log(posts);
  const publishComment = async (postId) => {
    const commentObj = {
      user: user._id,
      comment: comment,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(commentObj),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const endpoint = `${apiUrl}/posts/${postId}/comments`;
      const response = await fetch(endpoint, options);
      if (response.ok) {
        console.log("Comment Created");
      } else {
        throw new Error("Error while uploading information");
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(fetchAllPostsAction());
    document.querySelector("#commentInput").value = "";
  };
  return (
    <>
      {posts[0] ? (
        posts
          .filter((post) => post.username === user.username)
          .map((post, i) => (
            <div className="my-3 post" key={post._id}>
              <div className="mt-3 d-flex justify-content-between lineunder pb-1">
                <div className="treedotsuser ">
                  <img src={user.image} alt="user" />
                  <span>
                    <b>
                      {user.name} {user.surname}
                    </b>{" "}
                    created this post
                  </span>
                </div>{" "}
                {post.username === user.username ? (
                  <PostPopover post={post} />
                ) : (
                  <></>
                )}
              </div>
              <div className="posttop">
                <div>
                  <img
                    src={post.user.image}
                    alt="postautor"
                    className="authorimg"
                  />
                </div>
                <div className="author">
                  <p onClick={() => navigate("/profile")}>
                    {post.user.name} {post.user.surname}{" "}
                    <span>
                      <i className="bi bi-dot"></i> 1-st
                    </span>
                  </p>

                  <p>{post.user.title}</p>
                  <p>1d</p>
                </div>
                <div className="postH5"></div>
              </div>
              <div className="mt-3">
                <p> {post.text}</p>
                <img
                  src={
                    post.image ? post.image : "https://placekitten.com/40" + i
                  }
                  alt="postimg"
                  className="postimg"
                />
              </div>
              <div className="d-flex  align-items-center mt-2">
                <div className="w-20 d-flex">
                  <RecommendIcon id="button11" />
                  <StarsIcon id="button22" />
                  <FavoriteIcon id="button33" />
                  <PetsIcon id="button44" />
                </div>
                <p className="likedPeople w-50">
                  <b>{user.name}</b> and {Math.floor(Math.random() * 400)}{" "}
                  others Liked this Post
                </p>
                <p className="likedPeople2">
                  {Math.floor(Math.random() * 200)} Comments{" "}
                  {Math.floor(Math.random() * 200)} Shares
                </p>
              </div>
              <div className="buttonsdiv w-100 mx-auto">
                <Button className="postbutton mr-1">
                  <ThumbUpAltIcon />
                  Like
                </Button>
                <Button className="postbutton mr-1">
                  <CommentIcon />
                  Comment
                </Button>
                <Button className="postbutton mr-1">
                  <AutorenewIcon />
                  Share
                </Button>
                <Button className="postbutton mr-1">
                  <i class="bi bi-send"></i>Send
                </Button>
              </div>
            </div>
          ))
      ) : (
        <div></div>
      )}

      {posts[0] ? (
        posts.slice(0, 20).map((post, i) => (
          <div className="my-3 post" key={post._id}>
            <div className="mt-3 d-flex justify-content-between lineunder pb-1">
              <div className="treedotsuser ">
                <img src={user.image} alt="user" />
                <span>
                  <b>
                    {user.name} {user.surname}
                  </b>{" "}
                  saw this post
                </span>
              </div>{" "}
              {post.username === user.username ? (
                <PostPopover post={post} />
              ) : (
                <></>
              )}
            </div>
            <div className="posttop mb-3 mt-1">
              <Col xs={9} className="posttop">
                <div>
                  <img
                    src={post.user.image}
                    alt="postautor"
                    className="authorimg"
                  />
                </div>
                <div className="author">
                  <p
                    className="linkToGuest"
                    onClick={() => {
                      dispatch(guestUserAction(post.user));
                      navigate(`/guest/${post.user._id}`);
                    }}
                  >
                    {post.user.name} {post.user.surname}{" "}
                    <span>
                      <i className="bi bi-dot"></i> 1-st
                    </span>
                  </p>

                  <p>{post.user.title}</p>
                  <p>1d</p>
                </div>
              </Col>
              <Col xs={3} className="postH5">
                <h5>+ Follow</h5>
              </Col>
            </div>
            <div>
              <p> {post.text}</p>
              <img
                src={post.image ? post.image : "https://placekitten.com/40" + i}
                alt="postimg"
                className="postimg"
              />
            </div>
            <div className="d-flex  align-items-center mt-2">
              <div className="w-20 d-flex">
                <RecommendIcon id="button11" />
                <StarsIcon id="button22" />
                <FavoriteIcon id="button33" />
                <PetsIcon id="button44" />
              </div>
              <p className="likedPeople w-50">
                <b>{user.name}</b> and {Math.floor(Math.random() * 400)} others
                Liked this Post
              </p>
              <p className="likedPeople2">
                {Math.floor(Math.random() * 200)} Comments{" "}
                {Math.floor(Math.random() * 200)} Shares
              </p>
            </div>
            <div className="buttonsdiv w-100 mx-auto">
              <Button className="postbutton mr-1">
                <ThumbUpAltIcon />
                Like
              </Button>
              <Button className="postbutton mr-1">
                <CommentIcon />
                Comment
              </Button>
              <Button className="postbutton mr-1">
                <AutorenewIcon />
                Share
              </Button>
              <Button className="postbutton mr-1">
                <i class="bi bi-send"></i>Send
              </Button>
            </div>
            <div className="d-flex justify-content-between mt-2 ">
              <input
                type="text"
                name="comment"
                id="commentInput"
                placeholder="Comment this post"
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="info" onClick={() => publishComment(post._id)}>
                Publish
              </Button>
            </div>
            <div className="mt-3">
              {post.comments ? (
                post.comments.map((com) => (
                  <div className="d-flex commentDiv mb-1">
                    {" "}
                    <img
                      src={com.user.image}
                      alt="userImg"
                      className="commentUserImg mr-2"
                    />{" "}
                    <div className="d-flex flex-column justify-content-center my-auto">
                      <p className="m-0">
                        <b>
                          {com.user.name} {com.user.surname}
                        </b>
                      </p>
                      <p className="mb-1">{com.comment}</p>
                    </div>
                    <CommentPopover postId={post._id} com={com} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
}
