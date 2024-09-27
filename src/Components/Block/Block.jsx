import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector

const Block = () => {
  // state variables
  const [block, setBlock] = useState([]);

  // getting data from redux
  const sliceUser = useSelector((state) => state.counter.value);

  // firebase setup
  const db = getDatabase();

  // fetching data from database
  useEffect(() => {
    const starCountRef = ref(db, 'block/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().currentId === sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setBlock(arr);
    });
  }, [db, sliceUser.uid]);


  // unblock functionality 
  const handleUnblock = (data) =>{
    // Remove data from the friends list using the correct key
    remove(ref(db, "block/" + data.key));
  }
  return (
    <div className="flex flex-col items-center h-screen bg-yellow-200 p-4 w-full">
      <h1 className="text-3xl font-bold mb-6">Blocked Users</h1>
      <div className="max-w-md w-full">
        {/* Map through the blocked users */}
        {block.length > 0 ? (
          block.map((item) => (
            <div key={item.key} className="bg-white rounded-lg shadow-md mb-4 p-4 flex items-center">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={item.friendPhoto}
                alt={item.friendName || "Blocked User"}
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.friendName}
                </h2>
              </div>
              <button 
               onClick={()=> handleUnblock(item)}
              className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-300">
                Unblock
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blocked users found.</p>
        )}
      </div>
    </div>
  );
};

export default Block;
