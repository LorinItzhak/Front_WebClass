import { Outlet } from "react-router-dom"
import Toolbar from "../Components/Toolbar"

const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
    <Toolbar/>
        <Outlet/> 
    <footer>Footer</footer>
    </main>
  )
}

export default MainLayout
