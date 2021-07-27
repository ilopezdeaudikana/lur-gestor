import { Action, Article, ArticleState } from '../../shared/models';
import {
  ARTICLES_FETCH_SUCCEEDED,
  ARTICLE_DELETE_SUCCEEDED,
  ARTICLE_FETCH_SUCCEEDED,
  ARTICLE_UPDATE_SUCCEEDED,
  ARTICLE_CREATE_SUCCEEDED,
} from '../sagas/articles.saga';

export const articlesReducer = (
  state: ArticleState = { list: [], total: 0 },
  action: Action
): ArticleState => {
  switch (action.type) {
    case ARTICLES_FETCH_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
      };
    case ARTICLE_UPDATE_SUCCEEDED:
      return {
        ...state,
        list: state.list.map((article: Article) =>
          article.id === action.payload.id
            ? {
                ...action.payload,
                imagen_mini: action.payload.imagen_mini?.filename,
                imagen_frontal: action.payload.imagen_frontal?.filename,
              }
            : article
        ),
      };
    case ARTICLE_CREATE_SUCCEEDED:
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    case ARTICLE_DELETE_SUCCEEDED:
      return {
        ...state,
        list: state.list.filter(
          (article: Article) => article.id !== action.payload
        ),
        total: state.total - 1,
      };
    default:
      return state;
  }
};

export const currentArticleReducer = (
  state: Article = {} as Article,
  action: Action
): Article => {
  switch (action.type) {
    case ARTICLE_FETCH_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
