export * from './article-list-config.model';
export * from './errors.model';
export * from './user.model';

export interface Article {
  id: string;
  url: string;
  title: string;
  description?: string;
  content: string;
  image_main: any;
  image_mini: any;
}
export interface ArticlesResponse {
  data: { list: Article[]; total: number };
}

export interface ArticleState {
  list: Article[];
  total: number;
}

export interface State {
  articles: ArticleState;
  currentArticle: { item: Article };
}
