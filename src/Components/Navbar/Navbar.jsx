import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // getting data from redux
  const sliceUsers = useSelector((state)=>state.counter.value)

  return (
    <div className="w-64 h-screen bg-yellow-100 p-5">
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300" // Light green on active click
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300" // Light yellow default, light blue on hover
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300"
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
          }
        >
          User
        </NavLink>

        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300"
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
          }
        >
          Friends
        </NavLink>

        <NavLink
          to="/friend-request"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300"
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
          }
        >
          Friend Request
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300"
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
          }
        >
          Notification
        </NavLink>

        <NavLink
          to="/block"
          className={({ isActive }) =>
            isActive
              ? "bg-green-300 text-white text-lg font-semibold p-3 rounded transition duration-300"
              : "bg-yellow-200 text-gray-800 text-lg font-semibold p-3 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-300"
          }
        >
         Block
        </NavLink>
      </nav>
      <div className='mt-12'>
        <img
            src={sliceUsers?.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h1 className="text-2xl font-semibold text-gray-800 text-center"> {sliceUsers?.displayName}  </h1>
      </div>
    </div>
  );
}

export default Navbar;
