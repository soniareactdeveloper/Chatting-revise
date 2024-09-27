import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  // state variable
  const [friends, setFriends] = useState([]);

  // getting data from redux
  const sliceUser = useSelector((state) => state.counter.value);

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

  // remove button function
  const handleremove = (data) => {
    // Remove data from the friends list using the correct key
    remove(ref(db, "friends/" + data.key));
  };


  // block button function
  const handleBlock = (blockData) => {
    // sent data to the block function
    set(ref(db, 'block/' + blockData.key), {
     currentId : sliceUser.uid,
     currentName : sliceUser.displayName,
     currentPhoto : sliceUser.photoURL,
     friendId : blockData.friendId,
     friendName : blockData.friendName,
     friendPhoto : blockData.friendPhoto
    });

    // sent data to the block notification
    set(ref(db, 'blockNotication/'), {
      currentId : sliceUser.uid,
      currentName : sliceUser.displayName,
      currentPhoto : sliceUser.photoURL,
      friendId : blockData.friendId,
      friendName : blockData.friendName,
      friendPhoto : blockData.friendPhoto
    });

    // Remove data from the friends list using the correct key
    remove(ref(db, "friends/" + blockData.key));

  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-200 w-full">
      <div className="max-w-sm w-full rounded-lg border-2 border-gray-300 shadow-lg bg-white">
        <h1 className="text-center text-2xl font-bold border-b-2 border-gray-300 py-4">
          Friends
        </h1>
        <div className="p-6 space-y-6">
          {friends.length > 0 ? (
            friends.map((item) => (
              <div key={item.key} className="flex items-center space-x-4">
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
                {/* Remove Button */}
                <button
                  onClick={() => handleremove(item)}
                  className="bg-[#5C7BE0] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#4A6ECD] transition-colors duration-300 ease-in-out"
                >
                 Unfriend
                </button>

                {/* block button */}
                <button
                  onClick={() => handleBlock(item)}
                  className="bg-[#B8001F] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#D91656] transition-colors duration-300 ease-in-out"
                >
                 Block
                </button>
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

export default Friends;
