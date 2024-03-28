import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ArticleSources } from "../../typing/enums";
import { clearArticles } from "../../redux/actions";
import { fetchArticles } from "../../redux/articlesSlice";
import DateRangePicker from "./DateRange";
import Categories from "./Categories";
import { categories, sources } from "../../infrastructure/constants";
import Sources from "./Sources";
import { Payload } from "../../typing";

const Filters = () => {
  const [dateQuery, setDateQuery] = useState<{
    start_date: string;
    end_date: string;
  }>({ start_date: "", end_date: "" });
  const [source, setSource] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const [categoryQuery, setCategoriesQuery] = useState<string>("");
  const [payload, setPayload] = useState<Payload | undefined>();

  const handleQueryStringChange = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    let formattedStartDate = startDate;
    let formattedEndDate = endDate;

    if (source === ArticleSources.nytimes) {
      formattedStartDate = formattedStartDate.replace(/-/g, "");
      formattedEndDate = formattedEndDate.replace(/-/g, "");
    }
    setDateQuery({
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
    const payload: Payload = {
      topic: "",
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      category: categoryQuery,
      source: source,
      preference: false,
    };
    setPayload(payload);
  };
  const handleCategoryChange = (selectedCategories: string[]) => {
    setCategoriesQuery(selectedCategories[0]);
  };

  const handleSourceChange = (selectedSources: string[]) => {
    setSource(selectedSources[0]);
  };
  useEffect(() => {
    if (payload) {
      dispatch(clearArticles());
      Object.values(ArticleSources).forEach((source) => {
        dispatch(
          fetchArticles({
            topic: categoryQuery,
            source: source,
            start_date: dateQuery.start_date,
            end_date: dateQuery.end_date,
            preference: false,
          }),
        );
      });
    }
  }, [source, categoryQuery, dateQuery, payload]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <div className="mb-4 flex justify-between items-center md:block">
        <h2 className="font-bold text-lg ">Filters</h2>

        <button className="bg-sky-400/100  text-white font-bold py-2 px-4 rounded  md:hidden block">
          Button
        </button>
      </div>
      <DateRangePicker onQueryStringChange={handleQueryStringChange} />
      <div className="flex justify-center gap-4 md:block">
        <Categories
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />

        <Sources sources={sources} onSourceChange={handleSourceChange} />
      </div>
    </div>
  );
};

export default Filters;
