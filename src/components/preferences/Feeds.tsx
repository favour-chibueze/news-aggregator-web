import React from "react";
import { Link } from "react-router-dom";
import MyFeeds from "./MyFeeds";

const Feeds: React.FC = () => {
  return (
    <div>
      <nav className="container mx-auto bg-white">
        <div className="flex justify-between lg:w-auto w-full border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <Link to="/home">
              <h1 className="text-2xl font-bold text-sky-400/100">NGW</h1>
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <MyFeeds/>
      </div>
    </div>
  );
};

export default Feeds;
