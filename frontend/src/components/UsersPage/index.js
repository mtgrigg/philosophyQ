import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import { getUsers } from "../../store/users";
import { getTweets } from "../../store/tweets";
import { deleteTweet } from "../../store/tweets";
import EditTweet from "../EditTweet";
import CreateComment from "../CreateComment";
import "./UsersPage.css";
import { useState } from "react";
import CommentFunctions from "../CommentFunctions";

const UsersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userId } = useParams();



  return (
    <>
<div id='hello'>hello</div>
    </>
  );
};
export default UsersPage;
