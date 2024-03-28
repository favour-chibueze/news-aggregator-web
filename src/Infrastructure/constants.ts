import { fetchGuardianArticles, fetchNewYorkTimesArticles, fetchNewsApiArticles } from "../redux/articlesSlice";
import { ArticleSources } from "../typing/enums";

export const categories = [
  "Politics",
  "Health",
  "Business",
  "Science",
  "Technology",
  "Entertainment",
  "Sports",
];
export const sources = [
  "guardian",
  "newsApi",
  "nytimes",
];

export const authors = [
  "Sophie Atkinson",
  "Patrick Holland",
  "Phil Nickinson",
];

export const articleRetrieverMapping = {
  [ArticleSources.newsApi]: fetchNewsApiArticles,
  [ArticleSources.guardian]: fetchGuardianArticles,
  [ArticleSources.nytimes]: fetchNewYorkTimesArticles,
}