// app/routes/index.tsx
import { Link } from '@remix-run/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900">Fashion Exhibition & Marketing</h1>
        <p className="mt-4 text-lg text-gray-600">
          Showcase your fashion, connect with designers, and market your brand!
        </p>
        <div className="mt-8">
          <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium">
            Sign Up
          </Link>
          <Link to="/login" className="ml-4 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
