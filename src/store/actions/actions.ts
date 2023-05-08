import {
  ARTICLES_FETCH_REQUESTED,
  ARTICLE_DELETE_REQUESTED,
  ARTICLE_FETCH_REQUESTED,
  ARTICLE_UPDATE_REQUESTED,
  ARTICLE_CREATE_REQUESTED
} from '../../store/sagas/articles.saga'
import { ArticleListConfig, Article } from '../../shared/models'

export const fetchArticles = (query: ArticleListConfig) => ({
  type: ARTICLES_FETCH_REQUESTED,
  payload: query
})

export const fetchArticle = (url: string) => ({
  type: ARTICLE_FETCH_REQUESTED,
  payload: url
})

export const deleteArticle = (obj: {
  id: string
  navigate: (path: string) => void
}) => ({
  type: ARTICLE_DELETE_REQUESTED,
  payload: obj
})

export const updateArticle = (obj: {
  article: Article
  navigate: (path: string) => void
}) => ({
  type: ARTICLE_UPDATE_REQUESTED,
  payload: obj
})

export const createArticle = (obj: {
  article: Partial<Article>
  navigate: (path: string) => void
}) => ({
  type: ARTICLE_CREATE_REQUESTED,
  payload: obj
})
