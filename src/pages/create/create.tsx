import { Space } from 'antd';
import { NavButtons } from '../../shared/buttons/nav-buttons';
import { ArticleForm } from '../../shared/form/article-form';

import { Article } from '../../shared/models';

interface Props {
  currentArticle: Article;
  save: Function;
}

export const CreatePage: React.FC<Props> = () => {
  return (
    <div className='container'>
      <Space direction='vertical'>
        <NavButtons />
        <ArticleForm />
      </Space>
    </div>
  );
};
