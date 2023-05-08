import { call, put, takeLatest, all } from 'redux-saga/effects'
import { message } from 'antd'
import { Article, ArticlesResponse } from '../../shared/models'
import {
  getArticles,
  destroy,
  getArticle,
  save
} from '../../shared/services/articles.service'
import { setArticle } from '../slices/current-article-slice'
import {
  createArticle,
  setArticles,
  deleteArticle,
  updateArticle
} from '../slices/articles-slice'

export const ARTICLES_FETCH_REQUESTED = 'ARTICLES_FETCH_REQUESTED'
export const ARTICLE_FETCH_REQUESTED = 'ARTICLE_FETCH_REQUESTED'
export const ARTICLE_UPDATE_REQUESTED = 'ARTICLE_UPDATE_REQUESTED'
export const ARTICLE_CREATE_REQUESTED = 'ARTICLE_CREATE_REQUESTED'
export const ARTICLE_CREATE_FAILED = 'ARTICLE_CREATE_FAILED'
export const ARTICLE_UPDATE_FAILED = 'ARTICLE_UPDATE_FAILED'
export const ARTICLES_FETCH_FAILED = 'ARTICLES_FETCH_FAILED'
export const ARTICLE_FETCH_FAILED = 'ARTICLE_FETCH_FAILED'
export const ARTICLE_DELETE_FAILED = 'ARTICLE_DELETE_FAILED'
export const ARTICLE_DELETE_REQUESTED = 'ARTICLE_DELETE_REQUESTED'

export function* fetchArticles(action: { type: string, payload: any }) {
  try {
    const response: ArticlesResponse = yield call(getArticles, action.payload)
    yield put(setArticles(response.data))
  } catch (e: any) {
    console.log(e)
    yield put({ type: ARTICLES_FETCH_FAILED, message: e.message })
  }
}

export function* fetchArticle(action: { type: string, payload: any }) {
  try {
    const response: Article = yield call(getArticle, action.payload)
    yield put(setArticle(response))
  } catch (e: any) {
    console.log(e)
    yield put({ type: ARTICLE_FETCH_FAILED, message: e?.message })
  }
}

export function* putArticle(action: {
  type: string
  payload: { article: Article; navigate: any }
}) {
  try {
    const response: Article = yield call(save, action.payload.article)
    yield put(updateArticle(response))
    yield call(action.payload.navigate, `/`)
    yield call([message, 'info'], 'Article updated succesfully')
  } catch (e) {
    console.log(e)
    yield call([message, 'error'], 'We couldn\'t save the article')
  }
}

export function* postArticle(action: {
  type: string
  payload: { article: Article; navigate: any }
}) {
  try {
    const response: Article = yield call(save, action.payload.article)
    yield put(createArticle(response))
    yield call(action.payload.navigate, `/`)
    yield call([message, 'info'], 'Article created succesfully')
  } catch (e) {
    console.log(e)
    yield call([message, 'error'], 'We couldn\'t create the article')
  }
}

export function* eraseArticle(action: {
  type: string
  payload: { id: string; navigate: any }
}) {
  try {
    yield call(destroy, action.payload.id)
    yield put(deleteArticle(action.payload.id))
    yield call(action.payload.navigate, `/`)
    yield call([message, 'info'], 'Article deleted succesfully')
  } catch (e) {
    console.log(e)
    yield call([message, 'error'], 'We couldn\'t delete the article')
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
    takeLatest(ARTICLE_DELETE_REQUESTED, eraseArticle),
    takeLatest(ARTICLE_UPDATE_REQUESTED, putArticle),
    takeLatest(ARTICLE_CREATE_REQUESTED, postArticle)
  ])
}

export default articlesSaga
