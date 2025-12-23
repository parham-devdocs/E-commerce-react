import React from 'react';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {useAuth} from '../../store/auth';

const ProfileSection = () => {
  const loggedIn = true; // You can replace this with real auth logic later
const {isLoggedIn,userInfo}=useAuth()
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3 md:gap-4">
        {/* Logout Button */}
       

        {/* User Profile */}
        <Link to="/profile"  className="flex cursor-pointer items-center gap-2.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br bg-red-500 flex items-center justify-center text-white">
              <BsPerson size={16} />
            </div>
          </div>
          <span className="font-medium text-gray-800 text-sm md:text-base whitespace-nowrap">
            {userInfo?.fullName}
          </span>
        </Link>
        <button
          aria-label="Logout"
          className="p-2 rounded-full text-red-500  hover:scale-105 hover:text-red-400 cursor-pointer   transition-colors duration-500"
        >
          <BiLogOut size={23} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center cursor-pointer hover:scale-105   duration-500 transition-all">
      <Link
      to="/login"
      
        aria-label="Login"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium shadow hover:shadow-md transition-all duration-200"
      >
        <BiLogIn size={18} />
        <span className="hidden sm:inline">ورود</span>
      </Link>
    </div>
  );
};

export default ProfileSection;