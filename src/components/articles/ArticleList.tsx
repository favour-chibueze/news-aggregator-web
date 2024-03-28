import React from "react";
import { ArticleModel } from "../../typing";
import moment from "moment";
import { truncate } from "../../helpers";
import ImgPlaceholder from "../../../src/assets/img/globe.jpg";

interface ArticleListProps {
  article: ArticleModel;
}

const ArticleList: React.FC<ArticleListProps> = ({ article }) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:w-1/3">
      <a href={article?.url} target="_blank">
        <article className="overflow-hidden h-408 rounded-lg shadow-lg p-2 md:p-4">
          <img
            alt="Placeholder"
            className="block object-cover h-1/2 w-full"
            src={article?.urlToImage || ImgPlaceholder}
          />
          <div className="flex flex-col mx-auto gap-1">
            <p className="text-[#949494] text-sm mt-2">
              {moment(article?.publishedAt).fromNow()}
            </p>
            <div className="flex items-center justify-between leading-tight">
              <h1 className="text-lg">{truncate(article?.title, 60)}</h1>
            </div>
            <p className="text-[#454040] text-sm">
              {truncate(article?.description || "", 130)}
            </p>
            <div className="flex items-center justify-between leading-none mt-2">
              <p className="text-sm capitalize">{article?.author}</p>
              <p className="text-sm">{article?.source?.name}</p>
            </div>
          </div>
        </article>
      </a>
    </div>
  );
};

export default ArticleList;
