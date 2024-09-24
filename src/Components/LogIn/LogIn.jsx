import Lottie from "lottie-react";
import logAnimation from "../../../public/animation/login.json";
import { Link } from "react-router-dom"; 
import { useState } from "react";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";


const LogIn = () => {
  // state declaration
   const [show, setShow]                      = useState(false);
   const [email, setEmail]                    = useState();
   const [emailerr, setEmailerr]              = useState();
   const [password, setPassword]              = useState();
   const [passworderr, setPassworderr]        = useState();



  // icon functionality
  const handleShow = () => {
    setShow(!show);
  }




  // email
  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerr('')
  }

  // password 
  const handlePassword = (e) =>{
    setPassword(e.target.value);
    setPassworderr('')
  }





   // form validation functionality
   const handleSubmit = (e) =>{
     e.preventDefault();

    //  condition
    if(!email){
      setEmailerr('email is required');
    }
    if(!password){
      setPassworderr('password is required');
    }
   
   }







  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200">
        <div className="main flex items-center justify-center w-3/4 mx-auto space-x-10 bg-white h-[550px] rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 p-6">

          {/* Lottie animation section */}
          <div className="w-1/2 flex justify-center">
            <Lottie animationData={logAnimation} loop={true} className="w-80" />
          </div>

          {/* Login form section */}
          <div className="w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-sm mx-auto">
              <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">Log In</h1>

              {/* Email input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input onChange={handleEmail}
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  placeholder="Enter your email"
                />
                <p className="text-[14px] text-red-600 font-sans font-normal">{emailerr}</p>
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>

                {/* icon */}
               <div className="relative" >
                {
                  show?
                  <ImEye onClick={handleShow} className="absolute top-[40%] right-[30px]"/>
                  :
                  <ImEyeBlocked onClick={handleShow} className="absolute top-[40%] right-[30px]"/>
                }
                <input onChange={handlePassword}
                    type={show? 'text' : 'password'}
                    id="password"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                    placeholder="Enter your password"
                  />
                <p className="text-[14px] text-red-600 font-sans font-normal">{passworderr}</p>
               </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>

                <div>
                  <Link to="/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700">Forgot Password?</Link>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              >
                Log In
              </button>

              {/* Don't have an account? Register */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
