import { Link, useNavigate } from 'react-router-dom';
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useState } from 'react';
import { BarLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  // state declaration
  const [show, setShow]                              = useState(false);
  const [confirmShow, setConfirmShow]                = useState(false);
  const [loading,setLoading]                         = useState(false);
  const [username, setUsername]                      = useState('');
  const [usernameerr, setUsernameerr]                = useState('');
  const [email, setEmail]                            = useState('');
  const [emailerr, setEmailerr]                      = useState('');
  const [password, setPassword]                      = useState('');
  const [passworderr, setPassworderr]                = useState('');
  const [confirmPassword, setConfirmPassword]        = useState('');
  const [confirmPassworderr, setConfirmPassworderr]  = useState('');

  // ====================== firebase functions =================
  const auth        = getAuth();
  const navigate    = useNavigate();

  // password icon function
  const handleShow = () => {
    setShow(!show);
  }

  // confirm password icon function
  const handleConfirmShow = () => {
    setConfirmShow(!confirmShow);
  }

  // user functionality 
  const handleUser = (e) => {
    setUsername(e.target.value);
    setUsernameerr('');
  }

  // email functionality
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('');
  }

  // password functionality
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('');
  }

  // confirm password functionality
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPassworderr('');
  }

  // form validation function
  const handleSubmit = (e) => {
    e.preventDefault();

    // condition for form validation
    if (!username) {
      setUsernameerr('Username is required');
    }
    if (!email) {
      setEmailerr('Email is required');
    }
    if (!password) {
      setPassworderr('Password is required');
    }
    if (!confirmPassword) {
      setConfirmPassworderr('Confirm Password is required');
    }
    if (password !== confirmPassword) {
      setConfirmPassworderr('Passwords do not match');
    } else {
      // ............ setloading
      setLoading(true);
       
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Register user
          const user = userCredential.user;

          // ...set loading
          setLoading(false);

          // Redirect to chat page
          toast.success('Registration Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // .............Redirect to login page................. 
          setTimeout(() => {
            navigate('/');
          }, 2000);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/weak-password') {
            toast.error('Enter a strong Password', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }else if (errorCode === 'auth/email-already-in-use') {
            toast.error('Email already exists', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }else {
            toast.error('An error occurred: ' + errorMessage, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
          });
          }
          //......set  loading
          setLoading(false);
        });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200">
      <div className="main flex items-center justify-center w-3/4 mx-auto bg-white p-6">

        {/* Register form section */}
        <div className="w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2 text-yellow-600">Register</h1>

            {/* Username input */}
            <div className="mb-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
              <input 
                onChange={handleUser}
                type="text"
                id="username"
                className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your username"
              />
              <p className="text-[14px] text-red-600 font-sans font-normal min-h-[20px]">{usernameerr}</p>
            </div>

            {/* Email input */}
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                onChange={handleEmail}
                type="email"
                id="email"
                className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
              <p className="text-[14px] text-red-600 font-sans font-normal min-h-[20px]">{emailerr}</p>
            </div>

            {/* Password input */}
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className='relative'>
                <input 
                  onChange={handlePassword}
                  type={show ? "text" : "password"}  // Toggle between text and password
                  id="password"
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  placeholder="Enter your password"
                />
                {show ? (
                  <ImEye 
                    onClick={handleShow} 
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                  />
                ) : (
                  <ImEyeBlocked 
                    onClick={handleShow} 
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                  />
                )}
              </div>
              <p className="text-[14px] text-red-600 font-sans font-normal min-h-[20px]">{passworderr}</p>
            </div>

            {/* Confirm Password input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className='relative'>
                <input 
                  onChange={handleConfirmPassword}
                  type={confirmShow ? "text" : "password"}  // Toggle between text and password
                  id="confirmPassword"
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  placeholder="Confirm your password"
                />
                {confirmShow ? (
                  <ImEye 
                    onClick={handleConfirmShow} 
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                  />
                ) : (
                  <ImEyeBlocked 
                    onClick={handleConfirmShow} 
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                  />
                )}
              </div>
              <p className="text-[14px] text-red-600 font-sans font-normal min-h-[20px]">{confirmPassworderr}</p>
            </div>

            {/* Submit button */}
            {
              loading?
              <div className="w-full h-[40px] py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 flex justify-center items-center">
                  <BarLoader/>
                </div>
                :
              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              >
                Register
              </button>
            }

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
      <ToastContainer />
    </div>
  );
};

export default Register;
