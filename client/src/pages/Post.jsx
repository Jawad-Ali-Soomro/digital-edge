import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Post.scss";
import { postUrl } from "../constant";
import { BiComment, BiHeart, BiShare } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add_user } from "../redux-action/user";
import toast from "react-hot-toast";
const Post = () => {
  const post_id = useParams();
  const [post_data, set_post_data] = useState();
  const dispatch = useDispatch();
  dispatch(add_user())
  const id = useSelector((state) => state.user.user.user_id);
  useEffect(() => {
    const find_post = async () => {
      await axios.get(`${postUrl}/get/post/${post_id.post_id}`).then((res) => {
        set_post_data(res.data.post);
      });
    };
    find_post();
  });
  const like_post = async () => {
    await axios
      .post(`${postUrl}/like/post`, { user_id: id, post_id: post_id.post_id })
      .then((res) => toast.success(res.data.message))
  };
  return (
    <div className="main-wrap flex">
      {
        <div className="left-wrap flex col">
          <img src={post_data?.image} alt="" />
          <h1>{post_data?.title}</h1>
          <p>{post_data?.description}</p>
        </div>
      }
      {
        <div className="right-wrap flex col">
          <div className="profile-main flex">
            <img src={post_data?.author?.avatar} alt="" />
            <h2>{post_data?.author?.username}</h2>
          </div>
          <div className="likes flex">
            <BiHeart className="icon" /> <p>{post_data?.likes?.length}</p>
          </div>
          <div className="bottom-sect flex">
            <BiHeart className="icon" onClick={() => like_post()} />
            <BiComment className="icon" />
            <BiShare className="icon" />
          </div>
          <div className="comment flex col">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button>Comment</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Post;
