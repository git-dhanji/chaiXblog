import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  BoltIcon,
  LockClosedIcon,
  HandThumbUpIcon,
  GlobeAltIcon,
  ChartBarSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full transition duration-300"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-slate-700 text-white py-20 px-5">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4  text-zinc-800">
            Welcome to Our Blog
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Stay updated with the latest news and trends.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 hover:bg-gray-200 font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <BoltIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-yellow-500 ">
                Fast Performance
              </h3>
              <p className="dark:text-slate-50">
                Experience lightning-fast speeds and responsiveness.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <LockClosedIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-green-500">
                Secure
              </h3>
              <p className="dark:text-slate-100 ">
                Your data is protected with industry-leading security.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <HandThumbUpIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                User Friendly
              </h3>
              <p className="dark:text-slate-100 ">
                Our intuitive design makes it easy to get started.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <GlobeAltIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-500">
                Global Reach
              </h3>
              <p className="dark:text-slate-100 ">
                Connect with people all over the world.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <ChartBarSquareIcon className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-500">
                Analytics
              </h3>
              <p className="dark:text-slate-100 ">
                Get insights to help grow your audience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <CodeBracketIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Customizable
              </h3>
              <p className="dark:text-slate-100 ">
                Fully customizable to fit your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 px-5">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg md:text-2xl mb-8">
            Join thousands of others who have improved their business.
          </p>
          <Link
            to={"/signup"}
            className="bg-white text-green-600 hover:bg-gray-200 font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
