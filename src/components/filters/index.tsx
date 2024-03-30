import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ArticleSources } from "../../typing/enums";
import { clearArticles } from "../../redux/actions";
import { fetchArticles } from "../../redux/articlesSlice";
import DateRangePicker from "./DateRange";
import Categories from "./Categories";
import { categories, sources } from "../../Infrastructure/constants";
import Sources from "./Sources";
import { Payload } from "../../typing";

interface FiltersProps {
  show: boolean;
  onClose: () => void;
}

const Filters = ({ show, onClose }: FiltersProps) => {
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

  const [selectedValues, setSelectedValues] = useState([]);
  const handleDoneClick = () => {
    onClose();
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center md:block">
        <h2 className="font-bold text-lg ">Filters</h2>
        <div className="sm:hidden flex justify-end ">
          <button
            type="button"
            onClick={handleDoneClick}
            className="bg-sky-400/100 py-1 px-2 rounded-md text-sm text-white hover:bg-blue-700 focus:outline-none"
          >
            Done
          </button>
        </div>
      </div>
      <DateRangePicker onQueryStringChange={handleQueryStringChange} />
      <div className="flex gap-4 md:block">
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
