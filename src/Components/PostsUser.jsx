import React from "react";
import { Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RecommendIcon from "@mui/icons-material/Recommend";
import StarsIcon from "@mui/icons-material/Stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import PostPopover from "./PostPopover";
export default function PostsUser(props) {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {posts[0] ? (
        posts
          .filter((post) => post.username === props.user.username)
          .map((post, i) => (
            <Col xs={12} className="my-4 postsofuser">
              <div className="posttop lineunder">
                <div>
                  <img
                    src={post.user.image}
                    alt="postautor"
                    className="authorimg"
                  />
                </div>
                <div className="author">
                  <p>
                    {post.user.name} {post.user.surname}{" "}
                    <span>
                      <i className="bi bi-dot"></i> 1-st
                    </span>
                  </p>

                  <p>{post.user.title}</p>
                  <p>1d</p>
                </div>
                <div className="postH5">
                  <PostPopover post={post} />
                </div>
              </div>
              <div>
                <p className="mt-3"> {post.text}</p>
                <img
                  src={
                    post.image ? post.image : "https://placekitten.com/40" + i
                  }
                  alt="postimg"
                  className="postimg"
                />
              </div>
              <div className="d-flex  align-items-center mt-2">
                <div>
                  <RecommendIcon id="button11" />
                  <StarsIcon id="button22" />
                  <FavoriteIcon id="button33" />
                  <PetsIcon id="button44" />
                </div>
                <p className="likedPeople">
                  {user.name} and {Math.floor(Math.random() * 1400)} others
                  Liked this Post
                </p>
                <p className="likedPeople2">
                  {Math.floor(Math.random() * 1400)} Comments{" "}
                  {Math.floor(Math.random() * 1400)} Shares
                </p>
              </div>
              <div className="buttonsdiv">
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
              <div></div>
            </Col>
          ))
      ) : (
        <div></div>
      )}
    </>
  );
}
