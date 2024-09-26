import { Link } from "@remix-run/react";
import { Button } from "../ui/button"; // Adjust path if needed

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-300 to-purple-800">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-40 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto p-8 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl mb-4">
          Get Inspirations from the World of Fashion
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Discover beautiful and magical fashion designs. Exhibit your artifacts, boost your expertise, and achieve your goals with ease.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center">
          <Link to="/signup">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-2 rounded-md">Signup</Button>
          </Link>
          <Link to="/learn-more">
            <Button className="border border-gray-300 px-8 py-2 rounded-md">Learn More</Button>
          </Link>
        </div>

        {/* Hero Image */}
        <img
          src="https://media.istockphoto.com/id/1364618551/photo/latino-spain-salewoman-in-storage-update-cotton-and-lace-fabric-showroom.jpg?s=2048x2048&w=is&k=20&c=HIegZzVSLDniZ-KZZLStExNQ4z5G_1yFRRXTynkv8Io="
          alt="Fashion Inspiration"
          className="mt-8 w-2/3 md:w-1/2 lg:w-1/3 h-auto object-cover rounded-xl"
        />
      </div>
    </section>
  );
}
