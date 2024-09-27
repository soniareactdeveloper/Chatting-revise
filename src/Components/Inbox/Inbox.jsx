import { FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa'; // Icons for call, video call, and options
import { useSelector } from 'react-redux'; // To access user data from Redux

const Inbox = () => {
  // Accessing the user data from Redux (you can replace this with static data if not using Redux)
  const sliceUsers = useSelector((state) => state.counter.value);

  return (
    <div
      className="w-[715px] h-screen mx-auto bg-yellow-100 flex flex-col absolute left-[44%]"
      style={{
        overflowY: 'hidden', // Prevents default scrollbar on the main container
      }}
    >
      {/* Top Bar (Header) */}
      <div className="flex items-center justify-between p-4 bg-yellow-200 rounded-t-lg">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src={sliceUsers?.photoURL || 'https://via.placeholder.com/50'}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {sliceUsers?.displayName || 'User Name'}
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
        className="flex-grow p-4 overflow-y-scroll h-96" // Enables scrolling with defined height
        style={{
          scrollbarWidth: 'thin', // Firefox
          scrollbarColor: '#fbbf24 #fef9c3', // Firefox thumb and track colors
        }}
      >
        {/* Custom scrollbar for WebKit browsers */}
        <style>{`
          /* For WebKit browsers (Chrome, Safari) */
          .flex-grow::-webkit-scrollbar {
            width: 8px; /* Width of the scrollbar */
          }
          .flex-grow::-webkit-scrollbar-track {
            background: #fef9c3; /* Yellow-100 for scrollbar track */
          }
          .flex-grow::-webkit-scrollbar-thumb {
            background-color: #fbbf24; /* Yellow-300 for scrollbar thumb */
            border-radius: 10px; /* Rounded corners for the scrollbar thumb */
          }
        `}</style>

        {/* Friend Message (Left Aligned) */}
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={sliceUsers?.photoURL || 'https://via.placeholder.com/40'}
            alt="Friend"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-gray-200 p-3 rounded-lg shadow-md">
            <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        {/* User Message (Right Aligned) */}
        <div className="flex items-end justify-end mb-2">
          <div className="bg-yellow-300 p-3 rounded-lg shadow-md">
            <p className="text-gray-800">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        {/* Additional Messages */}
        {/* Friend Message */}
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={sliceUsers?.photoURL || 'https://via.placeholder.com/40'}
            alt="Friend"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-gray-200 p-3 rounded-lg shadow-md">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex items-end justify-end mb-2">
          <div className="bg-yellow-300 p-3 rounded-lg shadow-md">
            <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>

        {/* Additional Friend Messages */}
        {/* Repeat as needed */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-start space-x-3 mb-4">
            <img
              src={sliceUsers?.photoURL || 'https://via.placeholder.com/40'}
              alt="Friend"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-gray-200 p-3 rounded-lg shadow-md">
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        ))}

        {/* User Message Example */}
        <div className="flex items-end justify-end mb-2">
          <div className="bg-yellow-300 p-3 rounded-lg shadow-md">
            <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>

      {/* Bottom Input Section */}
      <div className="p-4 bg-yellow-200 rounded-b-lg flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500">
          Send
        </button>
      </div>
    </div>
  );
};

export default Inbox;
