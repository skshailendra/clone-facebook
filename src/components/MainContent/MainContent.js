import React from "react";
import { FaRegThumbsUp, FaRegCommentAlt, FaShareAlt } from "react-icons/fa";
import CardLayout from "../CardLayout/CardLayout";
import Stories from "../Stories/Stories";
import CreatePost from "../CreatePost/CreatePost";
import ShowFeed from "../ShowFeed/ShowFeed";
import "./style.scss";

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="main-content-wrapper">
        <Stories />
        <CreatePost />
        <ShowFeed />
      </div>
    </div>
  );
};

export default MainContent;
