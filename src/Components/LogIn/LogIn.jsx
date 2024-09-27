import Lottie from "lottie-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { BarLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { userData } from "../../Slices/UserSlice";
import logAnimation from "../../../public/animation/login.json";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const LogIn = () => {
  const [show, setShow]               = useState(false);
  const [loading, setLoading]         = useState(false);
  const [email, setEmail]             = useState('');
  const [emailErr, setEmailErr]       = useState('');
  const [password, setPassword]       = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const navigate                      = useNavigate();

  const dispatch = useDispatch();
  const auth     = getAuth();
  const db       = getDatabase();

  const handleShow = () => {
    setShow(!show);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (!email) setEmailErr('Email is required');
      if (!password) setPasswordErr('Password is required');
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
            toast.error('Email not verified', { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
            setLoading(false);
            return;
          }
          toast.success('Login Successful', { position: "top-right", autoClose: 5000, theme: "light", transition: Bounce });
          dispatch(userData(user));
          setLoading(false);
          setTimeout(() => {
            navigate('/');
          }, 2000);
          localStorage.setItem('userData', JSON.stringify(user));
          set(ref(db, 'Allusers/' + user.uid), {
            userName: user.displayName,
            userPhoto: user.photoURL,
            userId: user.uid
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message, { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200">
      <div className="main flex flex-col md:flex-row items-center justify-center w-11/12 md:w-3/4 mx-auto space-y-6 md:space-y-0 md:space-x-10 bg-white h-auto md:h-[550px] rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 p-6">

        {/* Lottie animation section - hidden on small screens */}
        <div className="w-full md:w-1/2 flex justify-center hidden md:flex">
          <Lottie animationData={logAnimation} loop={true} className="w-60 md:w-80" />
        </div>

        {/* Login form section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-4 md:p-10 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-yellow-600">Log In</h1>

            {/* Email input */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                onChange={handleEmail}
                type="email"
                id="email"
                value={email}
                className="mt-1 block w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your email"
                aria-describedby="emailError"
              />
              <p id="emailError" className="text-[12px] md:text-[14px] text-red-600">{emailErr}</p>
            </div>

            {/* Password input */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                {show ? (
                  <ImEye onClick={handleShow} className="absolute top-[25%] right-[20px] md:right-[30px] cursor-pointer" />
                ) : (
                  <ImEyeBlocked onClick={handleShow} className="absolute top-[25%] right-[20px] md:right-[30px] cursor-pointer" />
                )}
                <input
                  onChange={handlePassword}
                  type={show ? 'text' : 'password'}
                  id="password"
                  value={password}
                  className="mt-1 block w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  placeholder="Enter your password"
                  aria-describedby="passwordError"
                />
                <p id="passwordError" className="text-[12px] md:text-[14px] text-red-600 min-h-[20px]">{passwordErr}</p>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div>
                <Link to="/forgot" className="text-sm text-yellow-600 hover:text-yellow-700">Forgot Password?</Link>
              </div>
            </div>

            {/* Submit button */}
            {
              loading ? 
                <div className="w-full h-[40px] py-3 bg-yellow-500 text-white font-bold rounded-lg flex justify-center items-center">
                  <BarLoader />
                </div>
              :
              <button
                type="submit"
                className="w-full py-2 md:py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              >
                Log In
              </button>
            }

            {/* Don't have an account? Register */}
            <p className="mt-4 md:mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
