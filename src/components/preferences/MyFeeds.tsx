import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ArticleModel } from "../../typing";
import { ArticleSources } from "../../typing/enums";
import NewsPreferences from ".";
import usePreferences, { Preferences } from "../../hooks/usePreferences";
import { arrayToStringWithQuotes } from "../../helpers";
import ArticleList from "../articles/ArticleList";
import Loading from "../Loading";
import NoNews from "./NoNews";

const MyFeeds = () => {
  const dispatch: AppDispatch = useDispatch();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const { preferences, updatePreference } = usePreferences();
  const [hasError, setHasError] = useState(false);
  const loadingStatus = useSelector(
    (state: RootState) => state.articles.loading_status
  );
  useEffect(() => {
    preferences.sourcesPreference.forEach(async (source) => {
      let category = "";
      if (preferences.categoriesPreference.length > 0) {
        const formattedCategory = arrayToStringWithQuotes(
          preferences.categoriesPreference
        );
        category =
          source === ArticleSources.nytimes
            ? `news_desk:(${formattedCategory})`
            : formattedCategory;
      }
      try {
        const result = await dispatch(
          fetchArticles({
            topic: category,
            source: source as ArticleSources,
            start_date: "",
            end_date: "",
            preference: true,
          })
        );
        setArticles([...articles, ...result.payload]);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setHasError(true);
      }
    });
  }, [preferences]);
  const hasNoArticles = articles.length === 0 && !hasError;
  const isLoading = loadingStatus.status === "loading";
  return (
    <div className="flex gap-x-6">
      <NewsPreferences
        preferences={preferences}
        updatePreference={updatePreference}
      />
      {isLoading ? (
        <div className="flex justify-center mx-auto items-center">
          <Loading />
        </div>
      ) : (
        <aside
          className={`flex flex-wrap -mx-1 lg:-mx-4 mt-${
            hasNoArticles ? "0" : "2"
          }`}
        >
          {hasNoArticles && !hasError && (
            <div className="flex justify-center items-center">
              <NoNews />
            </div>
          )}
          {articles.map((article: ArticleModel, index: number) => (
            <ArticleList key={index} article={article} />
          ))}
        </aside>
      )}
    </div>
  );
};

export default MyFeeds;
