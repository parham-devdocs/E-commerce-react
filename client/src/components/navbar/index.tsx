import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { MdMenu } from 'react-icons/md';
import ProfileSection from './profileSection';
import { useState } from 'react';
import Menu from './menu';
import ToggleBtn from '../darkModeLightModeToggler';
import useCart from "../../store/cart";
function Navbar() {
  const [menuIsDisplayed, setMenuIsDisplayed] = useState(false);
 const cartItemCount=useCart(state=>state.getNumberOfProducts())
  return (
    <div className="flex relative items-center  justify-between p-4 dark:bg-gradient-to-r transition-all duration-500  dark:from-neutral-900 dark:to-neutral-700  border-b-2 border-b-red-500">
      <Link 
        to="/" 
        className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight"
      >
        PShop
      </Link>

      <div className="flex items-center gap-4 relative"> 
        <ProfileSection />
        <div className="relative inline-block">
  {cartItemCount > 0 && (
    <span
      className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full"
      aria-label={`${cartItemCount} item(s) in cart`}
    >
    <span className=' w-2 h-2'>{cartItemCount > 9 ? '9+' : cartItemCount}</span>  
    </span>
  )}
  <Link
    to="/cart"
    aria-label="Shopping cart"
    className="text-xl text-gray-700 hover:text-black dark:text-neutral-400 dark:hover:text-neutral-500 hover:scale-110 transition-all duration-300"
  >
    <BiCart size={23} />
  </Link>
</div>
       
        <ToggleBtn  />

          <button aria-label="Open menu" className="cursor-pointer text-xl text-gray-700 hover:text-black"          onClick={()=>setMenuIsDisplayed((e)=>!e)}
          >
            <MdMenu size={23} className='text-xl text-gray-700 hover:text-black dark:text-neutral-400 dark:hover:text-neutral-500 hover:scale-110 hover-dark:scale-110 transition-all duration-300'  />
          </button>

         
      </div>
      {menuIsDisplayed && (
              <Menu onClose={()=>setMenuIsDisplayed(false)} isDisplayed={menuIsDisplayed}  />
          )}
    </div>
  );
}

export default Navbar;