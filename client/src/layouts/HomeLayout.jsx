import { enqueueSnackbar } from "notistack";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import { logout } from "../Redux/Slices/authSlice.js";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //For checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  //For displaying options acc to role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";

    const menu = document.getElementsByClassName("drawer-button");
    menu.style.hidden = true;
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";

    const menu = document.getElementsByClassName("drawer-button");
    menu.style.hidden = true;
  }

  async function handleLogout(e) {
    e.preventDefault();

    await dispatch(logout());
    navigate("/");
  }
  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 w-fit z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="cursor-pointer relative drawer-button"
          >
            <FiMenu
              size={"32px"}
              className="font-bold text-white m-4"
              onClick={changeWidth}
            />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li className="w-fit absolute right-2 z-50">
              <button>
                <AiFillCloseCircle size={"24px"} onClick={hideDrawer} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <>
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/courses/create">Create Course</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
          {!isLoggedIn && (
            <div className="w-full absolute bottom-0">
              <Link to="/user/signup">
                <button className="btn-outline px-4 py-3 font-semibold w-full cursor-pointer">
                  Sign up
                </button>
              </Link>

              <Link to="/user/login">
                <button className="btn-outline px-4 py-3 font-semibold w-full cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="w-full absolute bottom-0">
              <Link to="/user/profile">
                <button className="btn-accent rounded-none btn px-4 py-3 font-semibold w-full cursor-pointer">
                  Profile
                </button>
              </Link>
              <Link onClick={handleLogout}>
                <button className="btn-ghost px-4 py-3 font-semibold w-full cursor-pointer">
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
