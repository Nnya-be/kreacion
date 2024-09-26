import { Link } from "@remix-run/react";

export default function Signup() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Blob Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="blob bg-gradient-to-r from-blue-400 via-purple-300 to-purple-500 opacity-30 absolute w-72 h-72 rounded-full top-20 left-10 animate-blob"></div>
        <div className="blob bg-gradient-to-r from-yellow-400 via-red-300 to-pink-500 opacity-30 absolute w-72 h-72 rounded-full top-1/2 right-10 animate-blob animation-delay-2000"></div>
        <div className="blob bg-gradient-to-r from-green-300 via-blue-300 to-indigo-400 opacity-30 absolute w-96 h-96 rounded-full bottom-10 left-1/3 animate-blob animation-delay-4000"></div>
      </div>

      {/* App Name */}
      <div className="absolute top-6 left-6 text-2xl font-bold text-blue-600">
        Kreacion
      </div>

      {/* Sign-Up Form */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Create an Account</h2>
        <p className="text-sm text-gray-600 text-center mt-2 mb-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
        
        <form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Or sign up with:
          </p>
          <div className="flex justify-center mt-2 space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 mr-2" />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
