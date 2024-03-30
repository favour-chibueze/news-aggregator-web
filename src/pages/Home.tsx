import { useEffect, useState } from "react";
import Layout from "../components/layout/index";
import Filters from "../components/filters";

const Home = (): JSX.Element => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

  useEffect(() => {
    if (showFilters) {
      document.body.classList.add("dropdown-shadow");
    } else {
      document.body.classList.remove("dropdown-shadow");
    }
  }, [showFilters]);

  return (
    <div>
      <Layout />
      <div className=" sm:hidden">
        <button
          className={`z-40 fixed bottom-3 right-3 bg-sky-400/100 text-white rounded-full sm:hidden flex items-center px-4 text-sm font-medium py-2 ${
            showFilters ? "hidden" : ""
          } `}
          onClick={toggleFilters}
        >
          <span className="pr-1">Filter</span>
        </button>
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } absolute top-0 left-0 w-full h-full bg-black/50 z-10`}
        >
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg fixed bottom-[-11px]">
              <Filters onClose={toggleFilters} show={showFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
