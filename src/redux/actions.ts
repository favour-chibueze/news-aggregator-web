import { createAction } from '@reduxjs/toolkit';
import {StateQueryParams} from '../typing';

export const clearArticles = createAction('articles/clearArticles');
export const updateSearchQuery = createAction<string>('articles/updateSearchQuery');
export const updateQueryParams = createAction<StateQueryParams>('articles/updateQueryParams');
