export * from './article-list-config.model';
export * from './errors.model';
export * from './user.model';

export interface Action {
  type: string;
  payload: any;
}

export interface Article {
  id: string;
  url: string;
  titulo: string;
  description?: string;
  noticia: string;
  imagen_frontal: any;
  imagen_mini: any;
}
export interface ArticlesResponse {
  data: { output: Article[]; total: number };
}

export interface ArticleState {
  list: Article[];
  total: number;
}

export interface State {
  articles: ArticleState;
  currentArticle: Article;
}
