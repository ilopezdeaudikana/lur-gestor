import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import {
  articlesReducer,
  currentArticleReducer
} from './reducers/articles.reducer'
import articlesSaga from './sagas/articles.saga'

export const sagaMiddleware = createSagaMiddleware()
const enhancers = applyMiddleware(sagaMiddleware)

const rootReducer = combineReducers({
  articles: articlesReducer,
  currentArticle: currentArticleReducer
})

export const configureStore = () => {
  return createStore(rootReducer, enhancers)
}

export const store = configureStore()
sagaMiddleware.run(articlesSaga)
