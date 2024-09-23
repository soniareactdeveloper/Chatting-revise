import Lottie from "lottie-react"
import logAnimation from "../../../public/animation/login.json";

const LogIn = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-white">
        <div className="main flex">
          <div className="w-1/2">
            <Lottie animationData={logAnimation} loop={true} />
          </div>
          <div>
            <form className="bg-white p-8 rounded-lg shadow-md w-80">
              <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
    </div>

  )
}

export default LogIn