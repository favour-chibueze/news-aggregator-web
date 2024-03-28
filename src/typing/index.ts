export interface ArticleModel {
  id: number;
  title: string;
  date: string;
  author: string;
  summary?: string;
  source?: {
    id: string;
    name: string;
  };
  imgUrl: string;
  content?: string;
  description?: string;
  publishedAt?: string;
  url?: string;
  abstract?: string;
  urlToImage?: string;
}

export interface ArticleListModel {
  id: string;
  title: string;
  source: {
    name: string;
  };
  description: string;
  publishedAt: string;
  author: string;
  url: string;
  urlToImage: string;
}


export interface GuardianModel {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface StateQueryParams {
  startDate: string;
  endDate: string;
  source: string;
};


export interface Payload {
  topic: string;
  start_date: string;
  end_date: string;
  category: string;
  source: string;
  preference: boolean
}

export interface QueryParams {
  q?: string;
  from?: string;
  to?: string;
  category?: string;
  apiKey?: string;
  source?: string;
  tag?: string;
  begin_date?: string;
  start_date?: string;
  from_date?: string;
  to_date?: string;
  end_date?: string;
  'api-key'?: string;
  'fq'?: string;
}

export interface ArticleStateField {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
export interface ArticlesState {
  newYorkTimes: ArticleStateField;
  newsAPI: ArticleStateField;
  guardian: ArticleStateField;
  articles: ArticleModel[];
  loading_status: ArticleStateField;
}

export interface SourceProps {
  sources: string[];
  onSourceChange: (selectedCategories: string[]) => void;
}

export interface CategoriesGroupProps {
  categories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;
}

export interface DateRangePickerProps {
  onQueryStringChange: ({ startDate, endDate }: { startDate: string; endDate: string }) => void;
}


export interface Article {
    id: string;
    title: string;
    source: {
      name: string;
    };
    description: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
    author: string;
  }