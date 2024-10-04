import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { ChatDataReducer } from "../../Slices/ChatUserSlice";

const Card = () => {
  // state variable
  const [friends, setFriends] = useState([]);

  // getting data from redux
  const sliceUser = useSelector((state) => state.counter.value);
  const dispatch  = useDispatch()

  // setting firebase
  const db = getDatabase();

  // setting data from the database
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().currentId === sliceUser.uid) {
          arr.push({
            key: item.key, 
            friendId: item.val().friendId,
            friendName: item.val().friendName,
            friendPhoto: item.val().friendPhoto,
          });
        } else if (item.val().friendId === sliceUser.uid) {
          arr.push({
            key: item.key, 
            friendId: item.val().currentId,
            friendName: item.val().currentName,
            friendPhoto: item.val().currentPhoto,
          });
        }
      });
      setFriends(arr);
    });
  }, [db, sliceUser.uid]);


  // getting data 
 const handleUserData = (data) =>{
    dispatch(ChatDataReducer(data));

    // setting data to the local host
    localStorage.setItem('chatUser', JSON.stringify(data));
 }

  return (
    <div className="absolute top-0 left-[300px] h-screen bg-yellow-200 w-[320px]">
      <div className="max-w-sm w-full rounded-lg border-2 border-gray-300 shadow-lg bg-white">
        <h1 className="text-center text-2xl font-bold border-b-2 border-gray-300 py-4">
          Friends
        </h1>
        <div className="p-6 space-y-6">
          {friends.length > 0 ? (
            friends.map((item) => (
              <div key={item.key} onClick={()=> handleUserData(item)} className="flex items-center space-x-4">
                {/* Friend's Photo */}
                <img
                  className="w-12 h-12 rounded-full"
                  src={item.friendPhoto}
                  alt={item.friendName}
                />
                {/* Friend's Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.friendName}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No friends found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
