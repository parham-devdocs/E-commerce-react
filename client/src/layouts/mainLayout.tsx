import Navbar from "../components/navbar/index";
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
<div className="  h-screen ">
 <Navbar/>
  <div className="flex ">
  <main className="flex-grow p-4">
          <Outlet />
        </main>  <div className="w-60 bg-red-950"></div>
</div>
</div>
  )
}

export default MainLayout