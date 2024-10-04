import { useState, useEffect } from 'react';
import Card from '../Components/Card/Card';
import Inbox from '../Components/Inbox/Inbox';
import { ClipLoader } from 'react-spinners';

const Chat = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a network request with a timeout for the demo.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed (e.g., 2 seconds).

    return () => clearTimeout(timer); // Cleanup the timer on unmount.
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex absolute top-[300px] right-[40%] h-screen">
          <ClipLoader size={50} color={"#000"} loading={loading} />
        </div>
      ) : (
        <div>
          <div className="flex">
            <Card />
            <Inbox />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
