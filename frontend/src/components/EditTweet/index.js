import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {editTweet}  from '../../store/tweets';
import { useHistory } from 'react-router-dom';


const EditTweet = ({tweetTweet, tweetImg, tweetId, tweetCreater, hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;
const id= tweetId

const [edit, setEdit] = useState(true);

// console.log(tweetCreater, "THIS IS id")

 const [imgUrl, setImageUrl] = useState(tweetImg);
  const [tweet, setTweet] = useState(tweetTweet);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        id,
    userId:userId,
    imgUrl,
    tweet,
    };


       const newTweet= await dispatch(editTweet(payload))


        history.push(`/tweets/${id}`);
        window.location.reload();



  };



  return (
    <div >
      { (userId === tweetCreater) && (
        <form onSubmit={handleSubmit}>

          <h1 > Edit Tweet </h1>
          <div >
      </div>
          <input
            type="text"
            placeholder="Optional media upload"
            value={imgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Create new tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
           <button  type="submit" >Submit edit</button>
        </form>
        )
      }
    </div>

   )


}




export default EditTweet;
