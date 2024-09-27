import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Import an icon for the hamburger menu

const Navbar = () => {
  // Getting data from redux
  const sliceUsers = useSelector((state) => state.counter.value);

  // State to control the menu toggle for small screens
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle menu toggle
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger icon for small screens */}
      <div className="sm:hidden p-5">
        <button onClick={handleMenuToggle} className="text-3xl text-gray-700">
          <FaBars />
        </button>
      </div>

      {/* Sidebar navigation */}
      <div
        className={`w-40 md:w-64 h-screen bg-yellow-100 p-4 fixed top-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0`}
      >
        <div className='mt-4 mb-4 text-center'>
          <img
            src={sliceUsers?.photoURL}
            alt="User"
            className="w-12 h-12 rounded-full mx-auto mb-2"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            {sliceUsers?.displayName}
          </h1>
        </div>

        {/* Navigation options */}
        <nav className="flex flex-col space-y-2 overflow-y-auto max-h-screen">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            User
          </NavLink>

          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Friends
          </NavLink>

          <NavLink
            to="/friend-request"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Friend Request
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Notifications
          </NavLink>

          <NavLink
            to="/block"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Block
          </NavLink>

          {/* Chat option */}
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "bg-green-300 text-white text-base font-semibold p-2 rounded transition duration-300"
                : "bg-yellow-200 text-gray-800 text-base font-semibold p-2 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
            }
          >
            Chat
          </NavLink>
        </nav>
      </div>

      {/* Overlay to close the menu when clicked outside on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={handleMenuToggle}
        ></div>
      )}
    </div>
  );
};

export default Navbar;

