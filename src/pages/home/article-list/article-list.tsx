import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { fetchArticles } from '../../../store/actions/actions';
import { ArticleListConfig, State } from '../../../shared/models';

import { DeleteButton } from '../../../shared/buttons';

interface Props {
  limit: number;
}

export const ArticleList: React.FC<Props> = React.memo((props: Props) => {
  const { limit } = props;
  const articles = useSelector((state: State) => state.articles);
  const { total, list } = articles;

  const [query, setQuery] = useState<ArticleListConfig>({
    filters: { limit, offset: 0 },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(query));
  }, [query, dispatch]);

  const columns = [
    {
      title: () => <span>T&iacute;tulo</span>,
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text: string, row: any) => (
        <Link to={'/article/' + row.url}>
          <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
        </Link>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <DeleteButton id={id} />,
    },
  ];

  const setPageTo = (page: any) => {
    if (limit) {
      setQuery({
        ...query,
        filters: { limit, offset: limit * (page.current - 1) },
      });
    }
  };

  // TODO: Add loading logic.
  return (
    <div className='container'>
      {!list.length && (
        <div>No articles are here... yet.</div>
      )}

      {list.length && (
        <Table
          rowKey='id'
          dataSource={list}
          columns={columns}
          pagination={{ total }}
          onChange={setPageTo}
        />
      )}
    </div>
  );
});
