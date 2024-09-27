import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserCard = () => {
  // Getting data from Redux
  const sliceUsers = useSelector((state) => state.counter.value);

  // State declarations
  const [allUsers, setAllusers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  // Realtime database setup
  const db = getDatabase();

  // Fetching all users from the realtime database
  useEffect(() => {
    const starCountRef = ref(db, 'Allusers/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userId !== sliceUsers.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setAllusers(arr);
    });

    // Fetch sent requests and set them in state
    const requestRef = ref(db, 'friendRequest/');
    onValue(requestRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((item) => {
        if (item.val().reciverId === sliceUsers.uid) {
          requests.push(item.val().senderId);
        }
      });
      setSentRequests(requests); // Store sent requests in state
    });
  }, [db, sliceUsers.uid]); 

  // Firebase functionality for sending friend request
  const handleAdd = (userData) => {
    set(push(ref(db, 'friendRequest/')), {
      senderId: userData.userId,
      senderName: userData.userName,
      senderPhoto: userData.userPhoto,
      receiverId: sliceUsers.uid,
      receiverName: sliceUsers.displayName,
      receiverPhoto: sliceUsers.photoURL,
    })
      .then(() => {
        // After sending the request, add the userId to sentRequests
        setSentRequests((prev) => [...prev, userData.userId]);

        // Sending data to the notification
        set(push(ref(db, 'notification/')), {
          senderId: userData.userId,
          senderName: userData.userName,
          senderPhoto: userData.userPhoto,
          receiverId: sliceUsers.uid,
          receiverName: sliceUsers.displayName,
          receiverPhoto: sliceUsers.photoURL,
        });
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-200 w-full p-4">
      <div className="w-full max-w-lg lg:max-w-md md:max-w-sm sm:max-w-xs mx-auto rounded-lg border-2 border-gray-300 shadow-lg bg-white">
        <h1 className="text-center text-2xl font-bold border-b-2 border-gray-300 py-4">
          UserCard
        </h1>
        <div className="p-6 space-y-4">
          {allUsers.map((item) => (
            <div key={item.key} className="flex items-center space-x-4">
              {/* User Photo */}
              <img
                className="w-12 h-12 rounded-full"
                src={item.userPhoto}
                alt="User"
              />
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.userName}
                </h2>
              </div>
              {/* Add Button */}
              <button
                onClick={() => handleAdd(item)}
                disabled={sentRequests.includes(item.userId)} // Disable if request is sent
                className={`${
                  sentRequests.includes(item.userId)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white font-semibold py-1 px-3 rounded transition duration-300`}
              >
                {sentRequests.includes(item.userId) ? 'Request Sent' : 'Add'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
