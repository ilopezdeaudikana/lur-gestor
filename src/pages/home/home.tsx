import { NewArticleButton } from '../../shared/buttons';
import { ArticleList } from './article-list/article-list';

export const Home = () => {
  return (
    <div className="container">
      <h1 className="logo-font">Lur</h1>
      <NewArticleButton></NewArticleButton>
      <ArticleList limit={10} />
    </div>
  );
};
