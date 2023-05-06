import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Space } from 'antd'
import { TextEditor } from './text-editor'
import { Uploader } from './uploader'
import { updateArticle, createArticle } from '../../store/actions/actions'

import { Article } from '../models'

interface Props {
  article?: Article
}

export const ArticleForm: React.FC<Props> = ({ article }) => {
  const { titulo, noticia, id } = article || {}
  let tinymce: any
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useNavigate()
  const onFinish = async (values: any) => {
    const newValues: Article = Object.assign({}, values)
    const imageMini = values.imagen_mini
      ? await readFileAsync(values.imagen_mini[0].originFileObj)
      : null
    const imageFrontal = values.imagen_frontal
      ? await readFileAsync(values.imagen_frontal[0].originFileObj)
      : null
    if (imageMini) {
      newValues.imagen_mini = {
        filename: values.imagen_mini[0].name,
        filetype: values.imagen_mini[0].type,
        value: imageMini
      }
    }
    if (imageFrontal) {
      newValues.imagen_frontal = {
        filename: values.imagen_frontal[0].name,
        filetype: values.imagen_frontal[0].type,
        value: imageFrontal
      }
    }
    if (tinymce) {
      newValues.noticia = tinymce.getContent()
    }
    if (id) {
      dispatch(updateArticle({ article: { ...newValues, id }, history }))
    } else {
      dispatch(createArticle({ article: { ...newValues }, history }))
    }
  }

  useEffect(() => {
    if (titulo) {
      form.setFieldsValue({
        titulo
      })
    }
  }, [titulo, form])
  

  const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = () => {
        resolve((reader.result as string).split(',')[1])
      }

      reader.onerror = reject

      reader.readAsDataURL(file)
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const setTextArea = (e: any) => (tinymce = e)

  return (
    <Fragment>
      {id && (
        <Form
          form={form}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
        >
          <Form.Item
            label='T&iacute;tulo'
            name='titulo'
            rules={[
              {
                required: true,
                message: 'Please input your titulo!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Space direction='vertical'>
            <Uploader name='imagen_frontal' label='Imagen Grande' />

            <Uploader name='imagen_mini' label='Miniatura' />

            <TextEditor
              noticia={noticia}
              setTextEditor={(e: any) => setTextArea(e)}
            />

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Publicar Art&iacute;culo
              </Button>
            </Form.Item>
          </Space>
        </Form>
      )}
    </Fragment>
  )
}
