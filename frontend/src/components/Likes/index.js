import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createLike, getAllLikes } from "../../store/tweets";




const Likes = ({tweetIden}) => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const addLike = () => {
    let newCount = liked + 1;


    dispatch(createLike(tweetIden.id))


  };

    useEffect(()=>{
        dispatch(getAllLikes(tweetIden.id))
        dispatch(createLike(tweetIden.id))
    })

  return (
      <button  onClick={(e) => setLiked(liked + 1)}>Likes:{liked}</button>
  )
}


export default Likes;
