// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import TimerBox from './timerBox';

interface HeaderProps {
  title: string;
  link?: string;
}

const Header = ({ title, link }: HeaderProps) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center  sm:flex-row sm:items-center sm:justify-between gap-4">
        {link && (
          <Link
            to={link}
            className="md:px-4 h-fit md:py-2 px-1 py-1 bg-white border-2 border-red-500 text-red-600 font-medium
                      rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200
                      shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap"
          >
            مشاهده همه
            <span>→</span>
          </Link>
        )}

        <div className="flex flex-row items-center gap-3">
        

          <div className="xl:hidden flex items-center gap-2 bg-red-50/50 px-3 py-1.5 rounded-lg border border-red-200">
            <span className="text-sm font-medium text-red-700 whitespace-nowrap">
              تا پایان تخفیف:
            </span>
            <div className="flex items-center gap-1">
              <TimerBox value={2} label="د" />
              <TimerBox value={3} label="س" />
              <TimerBox value={4} label="ث" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight text-right">
            {title}
          </h2>
        </div>
      </div>

      {/* Red divider bar */}
      <div className="w-full h-1 rounded-full bg-red-500"></div>
    </div>
  );
};

export default Header;