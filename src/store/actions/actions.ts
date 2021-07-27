import {
  ARTICLES_FETCH_REQUESTED,
  ARTICLE_DELETE_REQUESTED,
  ARTICLE_FETCH_REQUESTED,
  ARTICLE_UPDATE_REQUESTED,
  ARTICLE_CREATE_REQUESTED,
} from '../../store/sagas/articles.saga';
import { ArticleListConfig, Article } from '../../shared/models';

export const fetchArticles = (query: ArticleListConfig) => ({
  type: ARTICLES_FETCH_REQUESTED,
  payload: query,
});

export const fetchArticle = (url: string) => ({
  type: ARTICLE_FETCH_REQUESTED,
  payload: url,
});

export const deleteArticle = (id: string) => ({
  type: ARTICLE_DELETE_REQUESTED,
  payload: id,
});

export const updateArticle = (article: Article) => ({
  type: ARTICLE_UPDATE_REQUESTED,
  payload: article,
});

export const createArticle = (article: Partial<Article>) => ({
  type: ARTICLE_CREATE_REQUESTED,
  payload: article,
});