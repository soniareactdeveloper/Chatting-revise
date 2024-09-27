import { useSelector } from 'react-redux'; // To access user data from Redux

const Card = () => {
  // Accessing the user data from Redux
  const sliceUsers = useSelector((state) => state.counter.value);

  return (
    <div className="h-screen bg-yellow-200 absolute left-[15%] w-[320px] ml-14">
      <div className="w-[300px] pl-5 ml-3 max-w-sm rounded-lg border-2 border-gray-300 shadow-lg bg-white mt-6">
        <h1 className="text-center text-2xl font-bold border-b-2 border-gray-300 py-2 mt-3">
          Friends
        </h1>
        <div className="p-2 space-y-6">
          {/* Friend 1 */}
          <div className="flex items-center space-x-4 hover:bg-yellow-100 p-2 rounded-lg transition duration-200">
            {/* Friend's Photo */}
            <img
              className="w-12 h-12 rounded-full"
              src={sliceUsers?.photoURL || 'https://via.placeholder.com/50'}
              alt="Friend 1"
            />
            {/* Friend's Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {sliceUsers?.displayName || 'Friend Name'}
              </h2>
              <p className="text-sm text-gray-600">Online</p>
            </div>
          </div>

          {/* Friend 2 */}
          <div className="flex items-center space-x-4 hover:bg-yellow-100 p-2 rounded-lg transition duration-200">
            {/* Friend's Photo */}
            <img
              className="w-12 h-12 rounded-full"
              src="https://via.placeholder.com/50" // Placeholder image for second friend
              alt="Friend 2"
            />
            {/* Friend's Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Friend Two
              </h2>
              <p className="text-sm text-gray-600">Online</p>
            </div>
          </div>

          {/* Friend 3 */}
          <div className="flex items-center space-x-4 hover:bg-yellow-100 p-2 rounded-lg transition duration-200">
            {/* Friend's Photo */}
            <img
              className="w-12 h-12 rounded-full"
              src="https://via.placeholder.com/50" // Placeholder image for third friend
              alt="Friend 3"
            />
            {/* Friend's Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Friend Three
              </h2>
              <p className="text-sm text-gray-600">Online</p>
            </div>
          </div>

          {/* Add more friends as needed */}
        </div>
      </div>
    </div>
  );
};

export default Card;
