import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchArticles,
} from "../../redux/articlesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ArticleModel } from "../../typing";
import Loading from "../Loading";
import { ArticleSources } from "../../typing/enums";
import ArticleList from "./ArticleList";

const ArticleCard = () => {
  const loadingStatus = useSelector(
    (state: RootState) => state.articles.loading_status
  );
  const articles = useSelector((state: RootState) => state.articles.articles);
  const [hasError, setHasError] = useState(false);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    let articlesList: any[] = [];
    const initialArticles = [
      { source: ArticleSources.newsApi, topic: "sports" },
      { source: ArticleSources.guardian, topic: "technology" },
      { source: ArticleSources.nytimes, topic: "politics" },
    ];

    initialArticles.forEach((payload) => {
      articlesList.push(
        dispatch(
          fetchArticles({
            topic: payload.topic,
            source: payload.source,
            start_date: "",
            end_date: "",
            preference: true
          })
        )
      );
    });

    Promise.allSettled(articlesList).then((response) => {
      const hasError = response.every((data) => {
        return data.status === "rejected";
      });
      if (hasError) {
        setHasError(true);
      }
    });
  }, []);
  const isLoading = loadingStatus.status === "loading";
  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <div>An error occurred! Please, try again</div>;
  }
  return (
    <div className="">
      {!isLoading && !hasError && !Boolean(articles.length) ? (
        <p>No News</p>
      ) : (
        <aside className="flex flex-wrap -mx-1 lg:-mx-4">
        {articles.map((article: ArticleModel, index: number) => (
          <ArticleList key={index} article={article} />
        ))}
      </aside>
      )}
    </div>
  );
};

export default ArticleCard;
