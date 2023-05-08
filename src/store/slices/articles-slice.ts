import { Article, ArticleState } from '../../shared/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ArticleState = {
  total: 0,
  list: []
}

const articlesSlice = createSlice({
  name: 'lur-cms/articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<{ list: Article[]; total: number; }>) {
      state.list = action.payload.list
      state.total = action.payload.list.length
    },
    updateArticle(state, action: PayloadAction<Article>) {
      state.list = state.list.map((article: Article) =>
        article.id === action.payload.id
          ? {
              ...action.payload,
              image_mini: action.payload.image_mini?.filename,
              image_main: action.payload.image_main?.filename
            }
          : article
      )
    },
    createArticle(state, action: PayloadAction<Article>) {
      state.list = state.list.concat(action.payload)
      state.total = state.total++
    },
    deleteArticle(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (article: Article) => article.id !== action.payload
      )
      state.total = state.total - 1
    }
  }
})

export const { setArticles, updateArticle, createArticle, deleteArticle } = articlesSlice.actions
export default articlesSlice.reducer
