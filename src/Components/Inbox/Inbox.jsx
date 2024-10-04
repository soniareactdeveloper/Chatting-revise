import { FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa'; // Icons for call, video call, and options
import { useSelector } from 'react-redux'; // To access user data from Redux
import './Inbox.css';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';

const Inbox = () => {
  const userData = useSelector((state) => state.chatData.chatUserData);
  const sliceUsers = useSelector((state) => state.counter.value);
  const db = getDatabase();

  const [messages, setMessages] = useState('');
  const [chatMsg, setChatMsg] = useState([]);

  // Realtime date and time
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // Sending messages to Firebase
  const handleSend = () => {
    set(push(ref(db, 'message/')), {
      senderId: sliceUsers.uid,
      receiverId: userData.friendId,
      message: messages,
      megTime: formatAMPM(new Date()), // Sending formatted time along with the message
    });
    setMessages(''); // Clear the input field after sending the message
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Getting messages from Firebase
  useEffect(() => {
    const starCountRef = ref(db, 'message/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().senderId === sliceUsers.uid && item.val().receiverId === userData.friendId) ||
          (item.val().receiverId === sliceUsers.uid && item.val().senderId === userData.friendId)
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setChatMsg(arr);
    });
  }, [userData, sliceUsers]);

  return (
    <div
      className="w-[780px] h-screen mx-auto bg-yellow-100 flex flex-col absolute left-[44%]"
      style={{
        overflowY: 'hidden', // Prevents default scrollbar on the main container
      }}
    >
      {/* Top Bar (Header) */}
      <div className="flex items-center justify-between p-4 bg-yellow-200 rounded-t-lg">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src={userData?.friendPhoto || 'https://via.placeholder.com/50'}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {userData?.friendName || 'User Name'}
            </h1>
            <p className="text-sm text-gray-600">Online</p>
          </div>
        </div>
        {/* Call and Menu Icons */}
        <div className="flex items-center space-x-4">
          <FaPhone className="text-xl text-gray-700 cursor-pointer" />
          <FaVideo className="text-xl text-gray-700 cursor-pointer" />
          <FaEllipsisV className="text-xl text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Middle Chat Section (Messages) */}
      <div
        className="flex-grow p-4 overflow-y-scroll h-96"
        style={{
          scrollbarWidth: 'thin', // Firefox
          scrollbarColor: '#fbbf24 #fef9c3', // Firefox thumb and track colors
        }}
      >
        <style>{`
          .flex-grow::-webkit-scrollbar {
            width: 8px;
          }
          .flex-grow::-webkit-scrollbar-track {
            background: #fef9c3;
          }
          .flex-grow::-webkit-scrollbar-thumb {
            background-color: #fbbf24;
            border-radius: 10px;
          }
        `}</style>

        {/* Render Messages */}
        <div className="flex flex-col mb-6">
          {chatMsg.map((item) => (
            <div
              key={item.key}
              className={`p-3 mt-3 rounded-lg shadow-md ${item.senderId === sliceUsers.uid ? 'bg-yellow-300 self-end' : 'bg-white self-start'}`}
            >
              <p className={item.senderId === sliceUsers.uid ? "text-gray-800" : "text-gray-700"}>
                {item.message}
              </p>
              {/* Display the message time */}
              <p className="text-xs text-gray-500 mt-1">
                {item.megTime} {/* Message time is displayed here */}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Section */}
      <div className="p-4 bg-yellow-200 rounded-b-lg flex items-center space-x-2">
        <input
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          onKeyDown={handleKey}
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSend}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Inbox;

