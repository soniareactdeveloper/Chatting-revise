import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Notification = () => {
  // State variables
  const [notification, setNotification]           = useState([]);
  const [accNotification, setAccNotification]     = useState([]);
  const [blockNotification, setBlockNotification] = useState([]);
  // getting data from redux
  const sliceUser = useSelector((state) => state.counter.value);

  // Firebase setup
  const db = getDatabase();

  // Fetching data from Realtime Database
  useEffect(() => {
    const starCountRef = ref(db, "notification/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().senderId === sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setNotification(arr);
    });
  }, [db, sliceUser.uid]);


 // Fetching data from Realtime Database
    useEffect(()=>{
      const starCountRef = ref(db,'AcceptNotification/');
        onValue(starCountRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            if(item.val().currentId === sliceUser.uid){
              arr.push({...item.val(), key: item.key});
            }
          });
          setAccNotification(arr);
        });
    },[db, sliceUser.uid])



 // Fetching data from Realtime Database
    useEffect(()=>{
      const starCountRef = ref(db, 'blockNotication/');
        onValue(starCountRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((data) => {
          
               arr.push(data.val());
           
          });
          setBlockNotification(arr);
        });
    },[db, sliceUser.uid])

 
 


 
 
  return (
    <div className="flex flex-col items-center h-screen bg-yellow-200 p-4 w-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="max-w-md w-full">
        {/* Mapping through notifications */}
        {notification.map((item) => (
          <div
            key={item.key}
            className="bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-300 flex items-center"
          >
            <img
              src={item.receiverPhoto}
              alt={item.receiverName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                New Friend Request
              </h2>
              <p className="text-gray-600">
                <span>{item.receiverName}</span> sent you a friend request.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rendering accepted friend requests */}
      <div className="max-w-md w-full">
        {accNotification.map((item) => (
          <div key={item.key} className="flex items-center bg-purple-100 p-4 rounded-lg shadow-md mb-4">
            <img src={item.friendPhoto} alt="User Photo" className="w-12 h-12 rounded-full mr-4" />
            <div className="text-base">
              <span className="font-bold text-purple-800">{item.friendName}</span> accepted your friend request!
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 max-w-md w-full">
        {blockNotification.map((item) => (
          <div key={item.key} className="flex items-center bg-red-100 p-2 rounded shadow">
            <img
              src={item.friendPhoto} 
              alt={item.friendName} 
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="text-base">
              <span className="text-red-800 font-semibold"> {item.currentName }</span> has blocked you.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
