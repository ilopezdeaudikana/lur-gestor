import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import { Action, Article, ArticlesResponse } from '../../shared/models';
import {
  getArticles,
  destroy,
  getArticle,
  save,
} from '../../shared/services/articles.service';

export const ARTICLES_FETCH_SUCCEEDED = 'ARTICLES_FETCH_SUCCEEDED';
export const ARTICLES_FETCH_REQUESTED = 'ARTICLES_FETCH_REQUESTED';
export const ARTICLE_FETCH_SUCCEEDED = 'ARTICLE_FETCH_SUCCEEDED';
export const ARTICLE_FETCH_REQUESTED = 'ARTICLE_FETCH_REQUESTED';
export const ARTICLE_UPDATE_SUCCEEDED = 'ARTICLE_UPDATE_SUCCEEDED';
export const ARTICLE_CREATE_SUCCEEDED = 'ARTICLE_CREATE_SUCCEEDED';
export const ARTICLE_UPDATE_REQUESTED = 'ARTICLE_UPDATE_REQUESTED';
export const ARTICLE_CREATE_REQUESTED = 'ARTICLE_CREATE_REQUESTED';
export const ARTICLE_CREATE_FAILED = 'ARTICLE_CREATE_FAILED';
export const ARTICLE_UPDATE_FAILED = 'ARTICLE_UPDATE_FAILED';
export const ARTICLES_FETCH_FAILED = 'ARTICLES_FETCH_FAILED';
export const ARTICLE_FETCH_FAILED = 'ARTICLE_FETCH_FAILED';
export const ARTICLE_DELETE_SUCCEEDED = 'ARTICLE_DELETE_SUCCEEDED';
export const ARTICLE_DELETE_FAILED = 'ARTICLE_DELETE_FAILED';
export const ARTICLE_DELETE_REQUESTED = 'ARTICLE_DELETE_REQUESTED';

export function* fetchArticles(action: Action) {
  try {
    const response: ArticlesResponse = yield call(getArticles, action.payload);
    yield put({ type: ARTICLES_FETCH_SUCCEEDED, payload: response.data });
  } catch (e) {
    console.log(e);
    yield put({ type: ARTICLES_FETCH_FAILED, message: e.message });
  }
}

export function* fetchArticle(action: Action) {
  try {
    const response: Article = yield call(getArticle, action.payload);
    yield put({ type: ARTICLE_FETCH_SUCCEEDED, payload: response });
  } catch (e) {
    console.log(e);
    yield put({ type: ARTICLE_FETCH_FAILED, message: e.message });
  }
}

export function* updateArticle(action: Action) {
  try {
    const response: Article = yield call(save, action.payload.article);
    yield put({ type: ARTICLE_UPDATE_SUCCEEDED, payload: response });
    yield call(action.payload.history.push, `/`);
    yield call([message, 'info'], 'Post guardado con éxito');
  } catch (e) {
    console.log(e);
    yield call([message, 'error'], 'No se ha podido guardar el post');
  }
}

export function* createArticle(action: Action) {
  try {
    const response: Article = yield call(save, action.payload.article);
    yield put({ type: ARTICLE_CREATE_SUCCEEDED, payload: response });
    yield call(action.payload.history.push, `/`);
    yield call([message, 'info'], 'Acabas de crear un nuevo post');
  } catch (e) {
    console.log(e);
    yield call([message, 'error'], 'No se ha podido crear el post');
  }
}

export function* deleteArticle(action: Action) {
  try {
    yield call(destroy, action.payload.id);
    yield put({ type: ARTICLE_DELETE_SUCCEEDED, payload: action.payload.id });
    yield call(action.payload.history.push, `/`);
    yield call([message, 'info'], 'Acabas de eliminar un post');
  } catch (e) {
    console.log(e);
    yield call([message, 'error'], 'No se ha podido eliminar el post');
  }
}

/*
  Starts fetch* on each dispatched `*_FETCH_REQUESTED` action.
  Allows concurrent fetches.
*/
function* articlesSaga() {
  yield all([
    takeLatest(ARTICLES_FETCH_REQUESTED, fetchArticles),
    takeLatest(ARTICLE_FETCH_REQUESTED, fetchArticle),
    takeLatest(ARTICLE_DELETE_REQUESTED, deleteArticle),
    takeLatest(ARTICLE_UPDATE_REQUESTED, updateArticle),
    takeLatest(ARTICLE_CREATE_REQUESTED, createArticle),
  ]);
}

export default articlesSaga;
