import { Link } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';

export const NewArticleButton = () => {
  return (
    <span>
      <Link to='/create'>
        <FileAddOutlined /> Create a new Article
      </Link>
    </span>
  );
};
