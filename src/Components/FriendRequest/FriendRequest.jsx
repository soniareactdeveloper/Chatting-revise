import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  // State declaration
  const [friendData, setFriendData] = useState([]);

  // getting data from redux
  const sliceFriendRequest = useSelector((state) => state.counter.value);

  console.log(friendData)
  // Firebase setup
  const db = getDatabase();

  // Fetching data from Realtime Database
  useEffect(() => {
    const starCountRef = ref(db, 'friendRequest/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
        snapshot.forEach((item) => {
         if(item.val().senderId == sliceFriendRequest.uid){
          arr.push({...item.val(), key: item.key});
         }
      });
      setFriendData(arr);
    });
  }, []);


  // confirm friend request  
  const handleConfirm = (data) =>{
    // remove the data from database
    remove(ref(db, 'friendRequest/' + data.key))

    //setting data to the friend collection 
    set(push(ref(db, 'friends/' )), {
      currentId: sliceFriendRequest.uid,
      currentName: sliceFriendRequest.displayName,
      currentPhoto: sliceFriendRequest.photoURL,
      friendId: data.receiverId,
      friendName: data.receiverName,
      friendPhoto: data.receiverPhoto,
    });
   
    // setting data to the notification collection
    set(push(ref(db, 'AcceptNotification/')), {
      currentId: sliceFriendRequest.uid,
      currentName: sliceFriendRequest.displayName,
      currentPhoto: sliceFriendRequest.photoURL,
      friendId: data.receiverId,
      friendName: data.receiverName,
      friendPhoto: data.receiverPhoto,
    });
  
  }

  // Decline friend request
  const handleRemove = (removeData) =>{
    remove(ref(db, 'friendRequest/' + removeData.key))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-200 w-full">
      <div className="max-w-sm w-full rounded-lg border-2 border-gray-300 shadow-lg bg-white">
        <h1 className="text-center text-2xl font-bold border-b-2 border-gray-300 py-4">
          Friend Request
        </h1>
        <div className="p-6 space-y-4">
          {friendData.map((item) => (
            <div key={item.key} className="flex items-center space-x-4">
              {/* User Photo */}
              <img
                className="w-12 h-12 rounded-full"
                src={item.receiverPhoto}
                alt="Friend Request"
              />
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.receiverName}
                </h2>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                 onClick={() => handleConfirm(item)}
                 className="bg-green-500 text-white font-semibold py-1 px-3 rounded hover:bg-green-600 transition duration-300">
                  Accept
                </button>

                <button
                 onClick={() => handleRemove(item)}
                 className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-300">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
