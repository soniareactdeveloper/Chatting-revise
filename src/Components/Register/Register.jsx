import { Link, useNavigate } from 'react-router-dom';
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useState } from 'react';
import { BarLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
  // State declaration
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameerr, setUsernameerr] = useState('');
  const [email, setEmail] = useState('');
  const [emailerr, setEmailerr] = useState('');
  const [password, setPassword] = useState('');
  const [passworderr, setPassworderr] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPassworderr, setConfirmPassworderr] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleConfirmShow = () => {
    setConfirmShow(!confirmShow);
  };

  const handleUser = (e) => {
    setUsername(e.target.value);
    setUsernameerr('');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('');
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPassworderr('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, confirmPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4="
          });

          toast.success('Verify Your Email', {
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

          setLoading(false);
          setTimeout(() => {
            navigate('/login');
          }, 2000);

          sendEmailVerification(auth.currentUser);
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
          } else if (errorCode === 'auth/email-already-in-use') {
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
          } else {
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
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200 p-4 sm:p-6 md:p-8">
      <div className="main flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Register form section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-yellow-600">Register</h1>

            {/* Username input */}
            <div className="mb-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
              <input 
                onChange={handleUser}
                type="text"
                id="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
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
              loading ? (
                <div className="w-full h-[40px] py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 flex justify-center items-center">
                  <BarLoader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                >
                  Register
                </button>
              )
            }

            {/* Already have an account? Log In */}
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-semibold">
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
