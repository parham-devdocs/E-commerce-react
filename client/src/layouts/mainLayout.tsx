import clsx from "clsx";
import Footer from "../components/footer";
import Navbar from "../components/navbar/index";
import { Outlet } from 'react-router-dom';
import { scroll } from "../components/tailwindTypes";
const MainLayout = () => {
  return (
<div className={clsx(
  "flex flex-col h-screen dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-700",
  scroll()
)}>  <Navbar />
  <div className="flex flex-1 overflow-hidden">
    <main className="flex-1 overflow-y-auto p-8">
      <Outlet />
      <Footer/>
    </main>
  </div>
</div>
  )
}

export default MainLayout