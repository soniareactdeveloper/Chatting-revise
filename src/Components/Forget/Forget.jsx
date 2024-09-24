import { useState } from "react";
import { Link } from "react-router-dom";

const Forget = () => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setEmailErr('Email is required');
    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200">
      <div className="main flex items-center justify-center w-3/4 mx-auto space-x-10 bg-white h-[400px] rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 p-6">
        
        <div className="w-full">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">Forget Password</h1>

            {/* Email input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                placeholder="Enter your email"
                aria-describedby="emailError"
              />
              <p id="emailError" className="text-[14px] text-red-600 font-sans font-normal">{emailErr}</p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Send Reset Code
            </button>

            {/* Back to login link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Remembered your password?{" "}
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

export default Forget;
