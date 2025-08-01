import { useState, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiMenu,
  FiX,
  FiUsers,
  FiShoppingCart,
  FiGrid,
  FiPackage,
  FiCreditCard,
  FiPieChart,
  FiLayers,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const AdminMainPage = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen && isMobile ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen, isMobile]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <AdminHeader
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <AdminSidebar
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className={`flex-1 overflow-y-auto p-6 ${
            sidebarOpen && isMobile ? "ml-64" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminHeader = ({ isMobile, sidebarOpen, setSidebarOpen }) => (
  <header className="bg-[#1e1e1e] p-4 flex items-center justify-between border-b border-gray-800">
    <div className="flex items-center">
      {isMobile && (
        <button
          className="mr-4 text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
      <h1 className="text-2xl font-bold text-white ml-10 flex items-baseline">
        <span>FRESH</span>
        <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-500 text-white rounded text-lg">
          BOX
        </span>
      </h1>
      <h1 className="text-xl font-bold mr-8 ml-10">AdminPanel</h1>
    </div>
    <AdminUserControls />
  </header>
);

const AdminUserControls = () => {
  return (
    <div className="flex  items-center space-x-6">
      <button className="relative p-1 rounded-full hover:bg-gray-800">
        <FiBell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <button className="relative p-1 rounded-full hover:bg-gray-800">
        <FiMail size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
      </button>
      <NavLink to="AdminProfile">
        {" "}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
            <span className="text-xs font-bold">AD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const AdminSidebar = ({ isMobile, sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    {
      section: "Main",
      links: [
        { to: "/admin", icon: <FiGrid />, text: "Dashboard" },
        { to: "userControls", icon: <FiUsers />, text: "Users" },
        { to: "productsControls", icon: <FiPackage />, text: "Products" },
        { to: "ordersControls", icon: <FiShoppingCart />, text: "Orders" },
        { to: "revenueControls", icon: <FiCreditCard />, text: "Revenue" },
        { to: "analyticsControls", icon: <FiPieChart />, text: "Analytics" },
      ],
    },
    {
      section: "Management",
      links: [
        { to: "categoriesControls", icon: <FiLayers />, text: "Categories" },
        { to: "adminSettings", icon: <FiSettings />, text: "Settings" },
      ],
    },
  ];

  return (
    <aside
      className={`
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 transform transition-transform duration-200 
      fixed md:relative w-64 bg-[#1a1a1a] border-r border-gray-800 
      p-4 overflow-y-auto h-full z-50 
    `}
    >
      <nav>
        {navItems.map((group, index) => (
          <div key={index} className="mb-8">
            <p className="text-xs uppercase text-gray-500 mb-4">
              {group.section}
            </p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg ${
                        isActive
                          ? "bg-emerald-100 text-black"
                          : "hover:bg-emerald-700"
                      }`
                    }
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminMainPage;
