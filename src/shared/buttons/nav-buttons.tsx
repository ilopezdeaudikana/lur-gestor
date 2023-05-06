import './nav-buttons.scss'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FileOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { DeleteButton } from '.'

interface Props {
  id?: string
}
export const NavButtons: React.FC<Props> = React.memo(({ id }) => {
  return (
    <Fragment>
      <header className='header'>
        <span className='left'>
          <Link to={'/'}>
            <UnorderedListOutlined />
            List{' '}
          </Link>
        </span>
        {id && (
          <Fragment>
            <span className='left'>
              <Link to={'/editor/' + id}>
                <FileOutlined />
                Edit article
              </Link>
            </span>
            <span className='left'>
              <Link to={'/article/' + id}>
                <FileOutlined />
                Back to article{' '}
              </Link>
            </span>
          </Fragment>
        )}
        <span className='right'>{id && <DeleteButton id={id} />}</span>
      </header>
    </Fragment>
  )
})
