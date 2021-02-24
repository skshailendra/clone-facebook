import React, { useState, useRef } from "react";
import "./style.scss";
import { FaRegThumbsUp, FaRegCommentAlt, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { storage } from "../../firebase";
import useFirestore from "../../hooks/useFirestore";
const types = ["image/png", "image/jpeg", "image/jpg"];

const ShowFeed = () => {
  const { docs } = useFirestore("data");
  console.log(docs);
  return (
    <div className="show">
      {docs &&
        docs.map((post) => (
          <div key={post.id} className="empty">
            <div className="show__header">
              <div className="show__header-img">
                <img src="/images/profile-pic.jpg" alt="user" />
              </div>
              {/* <div className="show__header-name">
                <div className="date">{post.time}</div>
              </div> */}
              <div className="show__header-name">
                <button>Edit</button>Edit
              </div>
            </div>
            <div className="show__body">
              <div className="show__body-text">{post.text}</div>
              <div className="show__body-img">
                <img src={post.url} alt="post" />
              </div>
            </div>
            <div className="show__reactions">
              <span className="reactions">
                <FaRegThumbsUp /> <span className="reactions-text">Like</span>
              </span>
              <span className="reactions">
                <FaRegCommentAlt />{" "}
                <span className="reactions-text">Comments</span>
              </span>
              <span className="reactions">
                <FaShareAlt /> <span className="reactions-text">Share</span>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowFeed;
