import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { MdMenu } from 'react-icons/md';
import ProfileSection from './profileSection';
import { useState } from 'react';
import Menu from './menu';
import ToggleBtn from '../darkModeLightModeToggler';

function Navbar() {
  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false);
 
  return (
    <div className="flex relative items-center justify-between p-4 dark:bg-gray-900">
      <Link 
        to="/" 
        className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight"
      >
        PShop
      </Link>

      <div className="flex items-center gap-4 relative"> 
        <ProfileSection />

        <Link to="/cart" aria-label="Shopping cart" className="text-xl text-gray-700 hover:text-black">
          <BiCart size={23} />
        </Link>
        <ToggleBtn  />

          <button aria-label="Open menu" className="cursor-pointer text-xl text-gray-700 hover:text-black"          onClick={()=>setMenuIsDisplayed((e)=>!e)}
          >
            <MdMenu size={23}  />
          </button>

         
      </div>
      {menuIsDisplayed && (
              <Menu onClose={()=>setMenuIsDisplayed(false)} isDisplayed={menuIsDisplayed} />
          )}
    </div>
  );
}

export default Navbar;