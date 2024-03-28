import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Feeds from "../../preferences/Feeds";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="container mx-auto bg-white">
        <div className="flex justify-between lg:w-auto w-full border-gray-300 pb-5 lg:pb-0">

          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <h1 className="text-2xl font-bold text-sky-400/100">NGW</h1>
          </div>

          <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 lg:justify-end">
            <div className="relative text-gray-600 mr-3 md:block hidden">
              <SearchBar />
            </div>
            <div className="text-left items-baseline justify-end flex md:flex-col">
              <Link to="/feeds">
                <Profile />
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar for mobile view */}
        <div className="relative w-full text-gray-600 md:hidden block">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
