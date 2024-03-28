import { Fragment } from "react/jsx-runtime";
import Filters from "../filters";

const Sidebar = () => {
  return (
    <Fragment>
      <aside className="w-1/4 p-4 h-max bg-gray-100 border-l border-gray-300 md:block hidden">
        <div>
          <Filters />
        </div>
      </aside>

      <div className="p-2 shadow-sm rounded-t-md overflow-hidden fixed bottom-0 left-0 z-30 white:bg-gray-100 bg-gray-100 drop-shadow-2xl transition-all ease-in-out duration-150 w-full max-h-[350px] md:hidden block visible opacity-100 translate-y-0">
      <Filters />
      </div>
    </Fragment>
  );
};

export default Sidebar;
