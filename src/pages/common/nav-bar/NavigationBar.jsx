import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

export default function NavigationBar() {
  // const navigate = useNavigate();
  return (
    <div className="flex justify-around bg-[var(--color-black)] text-white font-weight-500 h-auto">
      <div className="">
        <NavLink to="/">
          <img
            src="assets/FRESH-BOX-logo.png"
            alt="Fresh-box logo"
            className="w-22 h-auto"
          />
        </NavLink>
      </div>
      <div>
        <ul className="flex mt-6 gap-6 ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex mt-6 gap-8 ">
          <li>
            <NavLink>
              <FiShoppingBag size={25} color= '#a6a6a6' />
            </NavLink>
          </li>
          <li>
            <NavLink>
              <MdFavorite size={25} color="#a6a6a6" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <FaUserCircle size={25} color="#a6a6a6" />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
