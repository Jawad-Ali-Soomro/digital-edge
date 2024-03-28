import React, { useReducer, useState } from "react";
import "../styles/Home.scss";
import Header from "../components/Header";
import axios from "axios";
import { useEffect } from "react";
import { postUrl, userUrl } from "../constant";
import { BiComment, BiHeart, BiShare } from "react-icons/bi";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { add_user } from "../redux-action/user";
import toast from "react-hot-toast";
Aos.init();

const Home = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user.user_id);

  dispatch(add_user());
  const [post_data, set_post_data] = useState();
  const [users, set_users] = useState();
  React.useEffect(() => {
    const get_posts = async () => {
      const res = await axios.get(`${postUrl}/get/posts`);
      set_post_data(res.data.posts);
    };
    const get_users = async () => {
      const res = await axios.get(`${userUrl}/get/users`);
      set_users(res.data.users);
    };
    setInterval(() => {
      get_posts();
      get_users();
    }, [1000]);
  }, []);
  const follow_user = async ({ user_to_follow_id }) => {
    if (id !== undefined) {
      await axios
        .post(`${userUrl}/follow/user`, {
          user_id: user_to_follow_id,
          logged_user_id: id,
        })
        .then((res) => {
          toast.success("User " + res.data.message);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="main-wrap flex">
        <div className="left flex col">
          {post_data?.map((post) => {
            return (
              <div
                className="card flex col"
                key={post?._id}
                data-aos="fade-right"
                data-aos-offset="300"
              >
                <img src={post?.image} alt={post?.title} />
                <h1>{post?.title}</h1>
                <p>{post?.description?.substring(0, 130)}...</p>
                <div className="likes flex">
                  <p
                    className="flex"
                    id="like"
                    data-after={post?.likes?.length}
                  >
                    <BiHeart className="icon" />
                  </p>
                  <p
                    className="flex"
                    id="like"
                    data-after={post?.comments?.length}
                  >
                    <BiComment className="icon" />
                  </p>
                  <p className="flex">
                    {" "}
                    <BiShare />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right flex col">
          <h1>Top Authors</h1>
          <div className="main-wrap flex col">
            {users?.filter(user => !user.following.includes(id)).slice(1,6).map((user) => {
              return user?._id == id ? (
                ""
              ) : (
                <div className="card flex" key={user._id}>
                 
                    <div className="profile flex">
                      <img src={user?.avatar} />
                      <h2>{user?.username}</h2>
                      <button
                        onClick={() =>
                          follow_user({ user_to_follow_id: user?._id })
                        }
                      >
                        {user?.followers?.includes(id) ? "Followed" : "Follow"}
                      </button>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
