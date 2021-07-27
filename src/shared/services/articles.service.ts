import { Article, ArticleListConfig } from '../models/';
import { input } from './test-input';

const API_URL = process.env.REACT_APP_API_URL;
const isDev = process.env.NODE_ENV === 'development';

interface ArticlesResponse {
  output: Article[];
}

const apiArticles = async (
  query: ArticleListConfig
): Promise<{
  data: { list: Article[]; total: number };
}> => {
  const response: Response = await fetch(`${API_URL}/articles`);
  const articles: ArticlesResponse = await response.json();

  return { data: { list: articles.output, total: articles.output.length } };
};

export const getArticles = (
  query: ArticleListConfig
): Promise<{
  data: { list: Article[]; total: number };
}> => {
  if (isDev) {
    return new Promise((resolve) => {
      const { offset, limit } = query.filters;
      const total =
        offset !== undefined && limit !== undefined ? offset + limit : 0;
      return resolve({
        data: {
          list: input.slice(offset, total),
          total: input.length,
        },
      });
    });
  } else {
    return apiArticles(query);
  }
};

const apiArticle = async (url: string): Promise<Article> => {
  const response: Response = await fetch(`${API_URL}/articles/${url}`);
  const article: { output: Article[] } = await response.json();

  return article.output[0];
};

export const getArticle = async (url: string): Promise<Article> => {
  if (isDev) {
    const article: Article | undefined = input.find(
      (a: Article) => a.url === url
    );
    return new Promise((resolve, reject) => {
      if (article) {
        resolve(article);
      } else {
        reject();
      }
    });
  } else {
    return apiArticle(url);
  }
};

const apiSave = async (article: Article): Promise<Article> => {
  const baseUrl = `${API_URL}/articles`;
  const finalUrl = article.id ? `${baseUrl}/${article.id}` : baseUrl;
  const response: Response = await fetch(finalUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: JSON.stringify({ article }),
  });
  return await response.json();
};

export const save = async (article: Article): Promise<Article> => {
  if (isDev) {
    return new Promise((resolve, reject) => {
      if (article) {
        if (article.id) {
          resolve(article);
        } else {
          resolve({ ...article, id: (Math.random() * 100).toString() });
        }
        reject();
      }
    });
  } else {
    return apiSave(article);
  }
};

const apiDelete = async (id: string): Promise<Article> => {
  const baseUrl = `${API_URL}/articles`;
  const finalUrl = `${baseUrl}/${id}`;
  const response: Response = await fetch(finalUrl, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  return await response.json();
};

export const destroy = async (id: string): Promise<Article> => {
  if (isDev) {
    const article: Article | undefined = input.find(
      (a: Article) => a.id === id
    );
    return new Promise((resolve, reject) => {
      if (article) {
        resolve(article);
      } else {
        reject();
      }
    });
  } else {
    return apiDelete(id);
  }
};
