import { Fragment } from "react/jsx-runtime";
import Filters from "../filters";
import { useState } from "react";

const Sidebar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };
  return (
    <Fragment>
      <aside className="w-1/4 p-4 h-max bg-gray-100 border-l border-gray-300 md:block hidden">
        <div>
          <Filters onClose={toggleFilters} show={showFilters} />
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
