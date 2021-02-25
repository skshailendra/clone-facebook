import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import {
  FaRegThumbsUp,
  FaRegCommentAlt,
  FaShareAlt,
  FaEllipsisH,
} from "react-icons/fa";
import axios from "axios";
import useFirestore from "../../hooks/useFirestore";
import MenuOption from "../../ui/MenuOption/MenuOption";
import Modal from "../../ui/Modal/Modal";
import UpdatePostComponent from "../UpdatePostComponent/UpdatePostComponent";
import { projectFirestore } from "../../firebase";
const types = ["image/png", "image/jpeg", "image/jpg"];
const ShowFeed = () => {
  const { docs } = useFirestore("data");
  const [feed, setFeed] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  debugger;
  const closeMenuHandler = (idx) => {
    debugger;
    let tempfeed = [...feed];
    tempfeed[idx].openMenu = false;
    setFeed(tempfeed);
  };
  const toggleMenuHandler = (post, idx) => {
    console.log(post, idx);
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
    console.log(e.target.value);
    setStatusText(e.target.value);
  };
  const onEditPost = (post) => {
    console.log(post);
    setStatusText(post.statusText);
    setUrl(post.url);
    setId(post.id);
    openModalHandler();
  };
  const onDeletePost = (post) => {
    console.log(post);
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
  console.log(feed);
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
                    <div className="date">10h</div>
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
                  >
                    <div
                      className="menuoption_edit"
                      onClick={() => onEditPost(post, idx)}
                    >
                      Edit Post
                    </div>
                    <div
                      className="menuoption_delete"
                      onClick={() => onDeletePost(post, idx)}
                    >
                      Delete Post
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
      >
        <UpdatePostComponent
          statusText={statusText}
          changeText={onChangeStatus}
          imageUrl={url}
          id={id}
          resetStatusText={resetStatusText}
        />
      </Modal>
    </div>
  );
};

export default ShowFeed;
