import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {createTweet}  from '../../store/tweets';
import { useHistory } from 'react-router-dom';
import "./CreateTweet.css";


const CreateTweet = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;


 const [imgUrl, setImageUrl] = useState("");
  const [tweet, setTweet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId:userId,
    imgUrl,
    tweet,
    };


       const newTweet= await dispatch(createTweet(payload))

    setTweet("")


  };


  return (
    <div className='createTweetWrapper' >
      { userId && (
        <>
        <form  onSubmit={handleSubmit}>


          <div >
      </div>
          {/* <input
            type="text"
            placeholder="Optional media upload"
            value={imgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          /> */}
          <textarea
          className= "newTweetInput"
            type="text"
            placeholder="What's Happening? Write your tweet here..."
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
           < button className='createTweetButton'   type="submit">Tweet</button>

        </form>

         </>
        )
      }
    </div>

   )


}




export default CreateTweet;
