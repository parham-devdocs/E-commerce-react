import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  link?: string;
}

const Header = ({ title, link }: HeaderProps) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex  justify-between items-center  sm:flex-row sm:items-center sm:justify-between gap-4">
        {link && (
          <Link
            to={link}
            className=" md:px-4 h-fit md:py-2 px-1 py-1 bg-white border-2 border-red-500 text-red-600 font-medium
                      rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200
                      shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap"
          >
            مشاهده همه
            <span>→</span>
          </Link>
        )}

        

          <h2 className="lg:text-2xl dark:text-white text-xl font-bold text-gray-800 tracking-tight text-right">
            {title}
          </h2>
      </div>

      {/* Red divider bar */}
      <div className="w-full h-1 rounded-full bg-red-500"></div>
    </div>
  );
};

export default Header;