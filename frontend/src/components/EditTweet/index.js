import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {editTweet}  from '../../store/tweets';
import { useHistory } from 'react-router-dom';
// import OutsideClickHandler from 'react-outside-click-handler';
import './EditTweet.css'


const EditTweet = ({tweetTweet, tweetImg, tweetId, tweetCreater, hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;
const id= tweetId

const [edit, setEdit] = useState(true);

const [errors, setErrors] = useState([]);

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


       const newTweet= await dispatch(editTweet(payload)).catch(async (res) => {
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors)
      });

       if(newTweet){
        // history.push(`/tweets/${id}`);
        // window.location.reload();

        hideForm()
    }


  };



  return (
    <div >
      {/* <OutsideClickHandler
      onOutsideClick={() => {
        hideForm()
      }}
    > */}
      { (userId === tweetCreater) && (
        <form onSubmit={handleSubmit}>

<ol id='errorUl'>
        {errors.map((error, idx) => <li id='errorLi' key={idx}>{error}</li>)}
          </ol>
          <div >
      </div>
          {/* <input
            type="text"
            placeholder="Optional media upload"
            value={imgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          /> */}
          <textarea
          id='editTweetTextArea'
            type="text"
            placeholder="Create new tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
           <button id='editTweetButton' type="submit" >Submit edit</button>
        </form>
        )
      }
      {/* </OutsideClickHandler> */}
    </div>

   )


}




export default EditTweet;
