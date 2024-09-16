// import { Link } from "@remix-run/react"

// const Signup = () => {
//   return(

// <div className="overflow-x-hidden bg-gray-50">
//     <header className="relative py-4 md:py-6">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//             <div className="relative flex items-center justify-between">
//                 <div className="flex-shrink-0">
//                     <Link href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
//                         <img className="w-auto h-8" src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg" alt="" />
//                     </Link>
//                 </div>

//                 <div className="flex lg:hidden">
//                     <button type="button" className="text-gray-900">
//                         <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
//                     <Link href='#' title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Experts </Link>

//                     <Link href='#'title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Community Groups </Link>

//                     <Link href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Support </Link>
//                 </div>

//                 <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
//                     <Link href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Login </Link>

//                     <Link
//                         href="#"
//                         title=""
//                         className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
//                         role="button"
//                     >
//                         Join community
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     </header>

//     <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
//         <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//             <div className="max-w-3xl mx-auto text-center">
//                 <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">Made by Developers, for Developers</p>
//                 <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Quality resources shared by the community</h1>
//                 <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.</p>

//                 <div className="relative inline-flex mt-10 group">
//                     <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

//                     <Link href="#" title="" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
//                         Get access to 4,958 resources
//                     </Link>
//                 </div>
//             </div>
//         </div>

//         <div className="mt-16 md:mt-20">
//             <img className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100" src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png" alt="" />
//         </div>
//     </section>
// </div>
//     )
// };

// export default Signup
import { useState } from 'react';
import { useNavigation, Form } from '@remix-run/react';
import { redirect } from '@remix-run/node';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  // Here you would normally create the user in your database
  console.log({ username, email, password });

  // Redirect to the home page after sign up
  return redirect('/');
};


export default function Signup() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container font-mono mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-lg">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full p-2 text-white bg-blue-500 rounded ${navigation.state === 'submitting' ? 'opacity-50' : ''}`}
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? 'Signing Up...' : 'Sign Up'}
        </button>
      </Form>
    </div>
  );
}
