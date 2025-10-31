import Navbar from "../components/navbar/index";
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
<div className="flex flex-col h-screen">
  <Navbar />
  <div className="flex flex-1 overflow-hidden">
    <main className="flex-1 overflow-y-auto p-8">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default MainLayout