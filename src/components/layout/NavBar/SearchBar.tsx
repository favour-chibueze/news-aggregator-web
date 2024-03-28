import { useState } from "react";
import {
  fetchArticles,
} from "../../../redux/articlesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { clearArticles } from "../../../redux/actions";
import { updateSearchQuery } from "../../../redux/actions";
import { ArticleSources } from "../../../typing/enums";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearArticles());
    Object.values(ArticleSources).forEach((source) => {
      dispatch(
        fetchArticles({
          topic: searchQuery,
          source: source,
          start_date: "",
          end_date: "",
          preference: false
        })
      );
    });
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            className="mr-3 flex-none"
          >
            <path
              d="m19 19-3.5-3.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></circle>
          </svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for news..."
          type="text"
          name="search"
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </label>
    </form>
  );
};

export default SearchBar;
