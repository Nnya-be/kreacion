// app/routes/landing.jsx
import { Button } from "../components/ui/button"
import { Link } from "@remix-run/react";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between p-4 bg-gray-900 text-white">
        <div className="text-xl">MyApp</div>
        <div>
          <Link to="/login"><Button className="mr-4">Login</Button></Link>
          <Link to="/signup"><Button>Signup</Button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
        <div className="text-center text-white">
          <h1 className="text-5xl mb-4">Welcome to MyApp</h1>
          <p className="text-lg">Connecting people and sharing content</p>
          <Link to="/signup"><Button className="mt-4">Get Started</Button></Link>
        </div>
      </section>

      {/* Section 1 */}
      <section className="p-10">
        <h2 className="text-3xl mb-4">Section 1</h2>
        <p>This is the first section.</p>
      </section>

      {/* Section 2 */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl mb-4">Section 2</h2>
        <p>This is the second section.</p>
      </section>

      {/* Section 3 */}
      <section className="p-10">
        <h2 className="text-3xl mb-4">Section 3</h2>
        <p>This is the third section.</p>
      </section>

      {/* Section 4 */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl mb-4">Section 4</h2>
        <p>This is the fourth section.</p>
      </section>

      {/* Section 5 */}
      <section className="p-10">
        <h2 className="text-3xl mb-4">Section 5</h2>
        <p>This is the fifth section.</p>
      </section>

      {/* Section 6 */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl mb-4">Section 6</h2>
        <p>This is the sixth section.</p>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
