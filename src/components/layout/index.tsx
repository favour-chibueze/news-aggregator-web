import ArticleCard from "../articles/ArticleCard";
import NavBar from "./navbar/index";
import Sidebar from "./SideBar";

const Layout = () => {
  return (
    <div className="shadow-sm p-4">
      <NavBar />
      <div className="flex gap-x-6 mt-10">
        <Sidebar />
        <ArticleCard />
      </div>
    </div>
  );
};

export default Layout;
