import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { MdMenu } from 'react-icons/md';
import ProfileSection from './profileSection';
import { useState } from 'react';
import Menu from './menu';

function Navbar() {
  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false);
 
console.log(menuIsDisplayed)
  return (
    <div className="flex relative items-center justify-between p-4">
      <Link 
        to="/" 
        className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight"
      >
        PShop
      </Link>

      <div className="flex items-center gap-4 relative"> {/* ← relative container */}
        <ProfileSection />

        <Link to="/cart" aria-label="Shopping cart" className="text-xl text-gray-700 hover:text-black">
          <BiCart size={23} />
        </Link>

        {/* Wrap button and menu in a relative div */}
        <div
         onClick={()=>setMenuIsDisplayed((e)=>!e)}
        >
          <button aria-label="Open menu" className="cursor-pointer text-xl text-gray-700 hover:text-black">
            <MdMenu size={23}  />
          </button>

          {/* Menu is absolutely positioned */}
         
        </div>
      </div>
      {menuIsDisplayed && (
              <Menu onClose={()=>setMenuIsDisplayed(false)} isDisplayed={menuIsDisplayed} />
          )}
    </div>
  );
}

export default Navbar;