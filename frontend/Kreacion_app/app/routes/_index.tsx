import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button"; // Adjust path if needed
import HeroSection from "../components/ui/herosection"; // Adjust path if needed
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="font-mono flex justify-between items-center p-4 bg-gray-900 text-white">
        <div className="text-xl">Kreacion</div>

        <div className="flex items-center space-x-6">
          {/* Features Dropdown */}
          <NavigationMenu className="relative">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full mt-2 w-auto bg-white rounded-lg shadow-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Link to="/feature1" className="text-gray-800 hover:text-blue-600">Feature 1</Link>
                    <Link to="/feature2" className="text-gray-800 hover:text-blue-600">Feature 2</Link>
                    <Link to="/feature3" className="text-gray-800 hover:text-blue-600">Feature 3</Link>
                    <Link to="/feature4" className="text-gray-800 hover:text-blue-600">Feature 4</Link>
                    <Link to="/feature5" className="text-gray-800 hover:text-blue-600">Feature 5</Link>
                    <Link to="/feature6" className="text-gray-800 hover:text-blue-600">Feature 6</Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Team Link */}
          <Link to="/team" className="text-white hover:text-gray-400">
            Team
          </Link>

          {/* Login/Signup Buttons */}
          <Link to="/login">
            <Button className="bg-teal-700 hover:bg-teal-500 mr-4">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-teal-700 hover:bg-teal-500">Signup</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Section 1 - Latest Fashion Trends */}
      <section className="w-full h-full p-10 bg-gradient-to-br from-blue-400 via-purple-300 to-purple-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Card with Text */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Latest Fashion Trends</h2>
            <p className="text-lg text-gray-700">
              Discover the latest trends in the fashion world. From bold colors to sleek designs, stay ahead of the curve.
            </p>
          </div>

          {/* Image */}
          <img
            src="https://media.istockphoto.com/id/1598103430/photo/fashion-design-concept-young-stylish-woman-fashion-designer-working-in-studio-office.jpg?s=2048x2048&w=is&k=20&c=P-J6J1IMWobwkshswMUrnJGB-7RodGkvVdFkFPUIEPw="
            alt="Fashion Trends"
            className="rounded-lg shadow-lg md:w-1/2"
          />
        </div>
      </section>

        {/* First New Section - Purpose of the App */}
        <section className="w-full h-full py-16 bg-gradient-to-br from-blue-400 via-purple-300 to-purple-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">

          {/* Right Card - Images of Features */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/2 grid grid-cols-2 gap-4">
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 1"
              className="rounded-lg object-cover"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 2"
              className="rounded-lg object-cover"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 3"
              className="rounded-lg object-cover"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 4"
              className="rounded-lg object-cover"
            />
          </div>
          {/* Left Card - Bullet Points */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Purpose of the App</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>Showcase fashion designs</li>
              <li>Connect fashion designers with clients</li>
              <li>Enable easy sharing of ideas</li>
              <li>Streamline the design process</li>
              <li>Promote sustainable fashion</li>
              <li>Boost the global fashion community</li>
            </ul>
          </div>

          
        </div>
      </section>

      {/* Second New Section - Image and Text Side-by-Side */}
      <section className="w-full h-full py-16 bg-gradient-to-br from-blue-400 via-purple-300 to-purple-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Card - Image */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/2">
            <img
              src="https://via.placeholder.com/500"
              alt="App Feature"
              className="rounded-lg object-cover"
            />
          </div>

          {/* Right Card - Text */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our App?</h2>
            <p className="text-lg text-gray-700">
              Our app brings together fashion enthusiasts, designers, and customers in one
              platform. From designing your dream look to discovering the latest trends, we make
              fashion accessible and engaging for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Final Section - User Reviews */}
      <section className="w-full h-full py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
              <img
                src="https://via.placeholder.com/150"
                alt="User 1"
                className="mx-auto rounded-full w-24 h-24 mb-4"
              />
              <p className="text-lg font-bold">Jane Doe</p>
              <p className="text-gray-700 mt-2">
                "This app completely transformed how I manage my fashion designs and connect with
                clients."
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
              <img
                src="https://via.placeholder.com/150"
                alt="User 2"
                className="mx-auto rounded-full w-24 h-24 mb-4"
              />
              <p className="text-lg font-bold">John Smith</p>
              <p className="text-gray-700 mt-2">
                "As a designer, I found this app to be a game-changer in streamlining my workflow."
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
              <img
                src="https://via.placeholder.com/150"
                alt="User 3"
                className="mx-auto rounded-full w-24 h-24 mb-4"
              />
              <p className="text-lg font-bold">Emily Clark</p>
              <p className="text-gray-700 mt-2">
                "I love how easy it is to explore new designs and collaborate with other fashion
                enthusiasts."
              </p>
            </div>
          </div>
        </div>
      </section>
    
  


      {/* Footer */}
      <footer className="p-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Kreacion. All rights reserved.</p>
      </footer>
    </div>
  );
}
