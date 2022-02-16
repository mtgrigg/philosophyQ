import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {createTweet}  from '../../store/tweets';
import { useHistory } from 'react-router-dom';


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

      if(newTweet){
        history.push(`/tweets/${newTweet.tweet.id}`);
      }


  };
  console.log(imgUrl, 'THIS IS IAMGEEIMAGE')


  return (
    <div >
      { userId && (
        <form onSubmit={handleSubmit}>

          <h1 > Create Tweet </h1>
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
          <button  type="submit">Create new tweet</button>
        </form>
        )
      }
    </div>

   )


}




export default CreateTweet;
