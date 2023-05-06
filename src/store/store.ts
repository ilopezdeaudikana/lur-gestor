import createSagaMiddleware from 'redux-saga'
import articlesSaga from './sagas/articles.saga'

import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articles-slice'
import currentArticleReducer from './slices/current-article-slice'
export const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    currentArticle: currentArticleReducer
  },
  middleware: (getDefaultMiddleware) => {
    // disabling serializableCheck enables passing navigate function to the saga
    return getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(sagaMiddleware);
  }
})
sagaMiddleware.run(articlesSaga)
