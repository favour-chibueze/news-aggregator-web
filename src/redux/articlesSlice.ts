import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleModel, ArticleStateField, ArticlesState, Payload, QueryParams } from '../typing';
import { clearArticles } from './actions';
import { ArticleSources } from '../typing/enums';


const defaultStateValue: ArticleStateField = {
    status: 'idle',
    error: null,
}

const initialState: ArticlesState = {
    newYorkTimes: defaultStateValue,
    newsAPI: defaultStateValue,
    guardian: defaultStateValue,
    loading_status: defaultStateValue,
    articles: [],
};



const buildUrlWithQueryParams = (baseUrl: string | undefined, queryParams: QueryParams): string | undefined => {
    let url = baseUrl;

    if (url) {
        const filteredParams: QueryParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== '' && value !== undefined && value !== null)
        );

        if (Object.keys(filteredParams).length > 0) {
            url += url.includes('?') ? '&' : '?';
            Object.entries(filteredParams).forEach(([key, value], index) => {
                url += `${index !== 0 ? '&' : ''}${key}=${encodeURIComponent(value)}`;
            });
        }
    }
    return url;
};

export const fetchNewsApiArticles = async ({ topic, start_date, end_date, category, source, preference }: Payload) => {
    const baseUrl = process.env.REACT_APP_NEWSAPI_BASE_URL
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    const queryParams: QueryParams = {
        q: topic,
        from: start_date,
        to: end_date,
        category,
        apiKey: apiKey,
        source: source
    };
    const finalUrl = buildUrlWithQueryParams(baseUrl, queryParams);
    const response = await axios.get(`${finalUrl}`);
    return (response.status === 200) ? response.data.articles.filter((article: ArticleModel) => !article.title.includes('[Removed]')) : null
}

export const fetchNewYorkTimesArticles = async ({ topic, start_date, end_date, category, source, preference }: Payload) => {
    const baseUrl = process.env.REACT_APP_NYT_BASE_URL
    const apiKey = process.env.REACT_APP_NYT_API_KEY;

    const queryParams: QueryParams = {
        q: topic,
        begin_date: start_date,
        end_date: end_date,
        'fq': preference ? topic : `source(${source})`,
        'api-key': apiKey,
        source: source
    };
    if (preference) {
        delete queryParams['source']
        delete queryParams['q']
    }
    const finalUrl = buildUrlWithQueryParams(baseUrl, queryParams);
    const response = await axios.get(`${finalUrl}`);
    return (response.status === 200) ? response.data : null
}

export const fetchGuardianArticles = async ({ topic, start_date, end_date, category, source, preference }: Payload) => {
    const baseUrl = process.env.REACT_APP_GUARDIAN_BASE_URL;
    const apiKey = process.env.REACT_APP_GUARDIAN_KEY;
    const queryParams: QueryParams = {
        q: topic,
        // tag: `${category}/${category}`,
        from_date: start_date,
        to_date: end_date,
        'api-key': apiKey,
        source: source
    };
    const finalUrl = buildUrlWithQueryParams(baseUrl, queryParams);
    const response = await axios.get(`${finalUrl}`);
    return (response.status === 200) ? response.data : null
}

const formatNyTimesResponse = (payload: any) => {
    if (payload === null) {
        return []
    }

    return payload.response.docs.map((doc: any) => ({
        id: doc._id,
        title: doc.headline.main,
        source: {
            name: doc.source
            ,
        },
        description: doc.abstract,
        publishedAt: doc.pub_date,
        author: doc.news_desk,
        url: doc.web_url,
        urlToImage: ''
    }));
}

const formatNewsApiResponse = (payload: ArticleModel[]) => {
    if (payload === null) {
        return []
    }
    return payload
}

const formatGuardianResponse = (payload: any) => {
    if (payload === null) {
        return []
    }
    const formattedResults = payload.response.results.map((result: any) => ({
        id: result._id,
        title: result.webTitle,
        source: {
            name: result.pillarName,
        },
        description: result.abstract,
        publishedAt: result.webPublicationDate,
        url: result.webUrl,
        author: result.sectionName,
        urlToImage: ''
    }));
    return formattedResults
}

const articleRetrieverMapping = {
    [ArticleSources.newsApi]: fetchNewsApiArticles,
    [ArticleSources.guardian]: fetchGuardianArticles,
    [ArticleSources.nytimes]: fetchNewYorkTimesArticles,
}

const articleFormatterMapping = {
    [ArticleSources.nytimes]: formatNyTimesResponse,
    [ArticleSources.newsApi]: formatNewsApiResponse,
    [ArticleSources.guardian]: formatGuardianResponse,
}



const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(clearArticles, (state) => {
                state.articles = []
                state.loading_status.status = 'loading'
                state.loading_status.error = null
            })
            .addCase(fetchArticles.pending, (state) => {
                state.loading_status.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading_status.status = 'succeeded';
                state.articles.push(...action.payload)
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading_status.status = 'failed';
                state.loading_status.error = action.error.message ?? 'Unknown error';
            })
    },
});


export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async ({ source, topic, start_date, end_date, preference }: { source: ArticleSources, topic: string, start_date: string, end_date: string, preference: boolean }, { dispatch }) => {
        const articles = await articleRetrieverMapping[source]({ topic, start_date, end_date, category: "", source: "", preference })
        const parsed = articleFormatterMapping[source](articles)
        return parsed
    }
)



export default articlesSlice.reducer;

