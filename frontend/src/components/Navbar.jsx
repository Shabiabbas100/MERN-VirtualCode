import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../Asset/logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-12 w-20 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">VirtualCode</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                 <Link className="transition-all hover:text-blue-500" to={item.href}> {item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
           
             <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    
    setTimeout(() => navigate("/login"), 100); // Ensures localStorage is cleared before redirect
  }}
  className="btnNormal bg-gradient-to-r from-orange-500 to-orange-800 transition-all hover:from-orange-600 hover:to-orange-900 px-[20px]"

>
  Logout
</button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                
                <Link className="block px-4 py-2 transition-all hover:text-blue-500" to={item.href} > {item.label} </Link>
              ))}
            </ul>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;