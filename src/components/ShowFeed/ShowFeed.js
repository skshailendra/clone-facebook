import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import {
  FaRegThumbsUp,
  FaRegCommentAlt,
  FaShareAlt,
  FaEllipsisH,
  FaPen,
  FaBookmark,
  FaLock,
  FaArchive,
} from "react-icons/fa";
import axios from "axios";
import useFirestore from "../../hooks/useFirestore";
import MenuOption from "../../ui/MenuOption/MenuOption";
import Modal from "../../ui/Modal/Modal";
import UpdatePostComponent from "../UpdatePostComponent/UpdatePostComponent";
import { projectFirestore } from "../../firebase";
const types = ["image/png", "image/jpeg", "image/jpg"];

const formatDateTime = (milliSec) => {
  let lastUpdatedTime = "";
  let extracttime = new Date(milliSec);
  let hr =
    new Date().getHours() - extracttime.getHours() >= 0
      ? new Date().getHours() - extracttime.getHours()
      : 23 - Math.abs(new Date().getHours() - extracttime.getHours());
  let min =
    new Date().getMinutes() - extracttime.getMinutes() >= 0
      ? Math.abs(new Date().getMinutes() - extracttime.getMinutes())
      : 60 - extracttime.getMinutes() + new Date().getMinutes();
  let sec = Math.abs(new Date().getSeconds() - extracttime.getSeconds());
  lastUpdatedTime = hr > 0 ? hr + " hr" : "";
  lastUpdatedTime += hr === 0 && min > 0 ? min + " min" : "";
  lastUpdatedTime += hr === 0 && min === 0 ? sec + " sec" : "";
  if (lastUpdatedTime === "0 sec".trim()) {
    lastUpdatedTime = "Just now";
  }
  return lastUpdatedTime;
};

const ShowFeed = () => {
  const { docs } = useFirestore("data");
  const [feed, setFeed] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const closeMenuHandler = (idx) => {
    let tempfeed = [...feed];
    tempfeed[idx].openMenu = false;
    setFeed(tempfeed);
  };
  const toggleMenuHandler = (post, idx) => {
    let tempfeed = [...feed];
    tempfeed[idx].openMenu = !tempfeed[idx].openMenu;
    setFeed(tempfeed);
  };

  const closeModalHandler = () => {
    setStatusText("");
    setUrl("");
    setId("");
    setOpenModal(false);
  };
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const resetStatusText = () => {
    closeModalHandler();
  };
  const onChangeStatus = (e) => {
    setStatusText(e.target.value);
  };
  const onEditPost = (post) => {
    setStatusText(post.statusText);
    setUrl(post.url);
    setId(post.id);
    openModalHandler();
  };
  const onDeletePost = (post) => {
    const collectionRef = projectFirestore.collection("data");
    (async () => {
      await collectionRef.doc(post.id).delete();
    })();
  };
  useEffect(() => {
    setFeed(
      docs.map((doc) => ({
        ...doc,
        id: doc.id,
      }))
    );
  }, [docs]);
  return (
    <div className="show">
      {feed &&
        feed.map(
          (post, idx) =>
            (post.statusText || post.url) && (
              <div key={post.id} className="empty">
                <div className="show__header">
                  <div className="show__header-img">
                    <img src="/images/profile-pic.jpg" alt="user" />
                  </div>
                  <div className="show__header-name">
                    {"Ram Seeta"}
                    <div className="date">{formatDateTime(post.createdAt)}</div>
                  </div>
                  <div
                    className="show__edit"
                    onClick={() => toggleMenuHandler(post, idx)}
                  >
                    <span>
                      <FaEllipsisH />
                    </span>
                  </div>
                  <MenuOption
                    show={post.openMenu}
                    menuClosed={closeMenuHandler}
                    idx={idx}
                  >
                    <div className="menuoption_edit">
                      <span>
                        <FaBookmark />
                      </span>
                      Save Post
                    </div>
                    <div
                      className="menuoption_edit"
                      onClick={() => onEditPost(post, idx)}
                    >
                      <span>
                        <FaPen />
                      </span>
                      Edit Post
                    </div>
                    <div
                      className="menuoption_delete"
                      onClick={() => onDeletePost(post, idx)}
                    >
                      <span>
                        <FaArchive />
                      </span>
                      Delete Post
                    </div>
                    <div className="menuoption_edit">
                      <span>
                        <FaLock />
                      </span>
                      Edit Audience
                    </div>
                  </MenuOption>
                </div>
                <div className="show__body">
                  {post.statusText && (
                    <div className="show__body-text">{post.statusText}</div>
                  )}
                  {post.url && (
                    <div className="show__body-img">
                      <img src={post.url} alt="post" />
                    </div>
                  )}
                </div>
                <div className="show__reaction-container">
                  <div className="show__reactions">
                    <span className="reactions">
                      <FaRegThumbsUp />{" "}
                      <span className="reactions-text">Like</span>
                    </span>
                    <span className="reactions">
                      <FaRegCommentAlt />{" "}
                      <span className="reactions-text">Comments</span>
                    </span>
                    <span className="reactions">
                      <FaShareAlt />{" "}
                      <span className="reactions-text">Share</span>
                    </span>
                  </div>
                </div>
              </div>
            )
        )}
      <Modal
        type={"Update Post"}
        show={openModal}
        modalClosed={closeModalHandler}
        backdropdisabled={true}
      >
        <UpdatePostComponent
          statusText={statusText}
          changeText={onChangeStatus}
          editedurl={url}
          id={id}
          resetStatusText={resetStatusText}
        />
      </Modal>
    </div>
  );
};

export default ShowFeed;
