import { Link } from 'react-router-dom';
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useState } from 'react';

const Register = () => {
  // state declaration
  const [show, setShow]                       = useState(false);
  const [confirmShow, setConfirmShow]         = useState(false);



  // password icon function
  const handleShow = () => {
    setShow(!show);
  }

  // confirm password icon function
  const handleConfirmShow = () => {
    setConfirmShow(!confirmShow);
  }






  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200">
      <div className="main flex items-center justify-center w-3/4 mx-auto  bg-white p-6">

        {/* Register form section */}
        <div className="w-1/2">
          <form className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2 text-yellow-600">Register</h1>

            {/* Username input */}
            <div className="mb-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Email input */}
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password input */}
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              {/* icon */}
             <div className='relative'>
              {
                show?
                <ImEye onClick={handleShow} className="absolute top-[30%] right-[30px]"/>
                :
                <ImEyeBlocked onClick={handleShow} className="absolute top-[30%] right-[30px]"/>
              }
                <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                    placeholder="Enter your password"
                  />
             </div>
            </div>

            {/* Confirm Password input */}
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>


              {/* icon */}
              <div className='relative'>
                 {
                  confirmShow?
                  <ImEye onClick={handleConfirmShow} className="absolute top-[30%] right-[30px]"/>
                   :
                  <ImEyeBlocked onClick={handleConfirmShow} className="absolute top-[30%] right-[30px]"/>
                 }
                  <input
                    type="password"
                    id="confirmPassword"
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                    placeholder="Confirm your password"
                  />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Register
            </button>

            {/* Already have an account? Log In */}
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
