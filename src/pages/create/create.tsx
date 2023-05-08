import { Space } from 'antd'
import { NavButtons } from '../../shared/buttons/nav-buttons'
import { ArticleForm } from '../../shared/form/article-form'

export const CreatePage = () => {
  return (
    <div className='container'>
      <Space direction='vertical'>
        <NavButtons />
        <ArticleForm />
      </Space>
    </div>
  )
}
