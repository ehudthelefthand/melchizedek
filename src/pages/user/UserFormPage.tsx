import { Button, Col, Form, Input, Row, Space } from 'antd'
import { UserRegisterRequest } from '../../api/user/request'
import { KeyOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useService } from '../../service/service'

function UserFormPage() {
  const service = useService()
  const [t] = useTranslation('translation')

  const onSubmit = (value: UserRegisterRequest) => {
    const userRegister: UserRegisterRequest = {
      userName: value.userName,
      password: value.password,
      department: value.department,
      role: value.role,
    }
    //   service.api.user.register(userRegister)
    console.log('userRegister', userRegister)
  }
  
  return (
    <>
      <Form onFinish={onSubmit}>
        <Space direction="vertical" size={10}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h2>
                <span
                  style={{
                    letterSpacing: '2px',
                    fontSize: '25px',
                    color: '#6FABDD',
                  }}
                >
                  REGISTER
                </span>
              </h2>
              <Form.Item
                name={'userName'}
                key={'userName'}
                rules={[{ required: true, message: 'Please fill UserName' }]}
                hasFeedback
              >
                <Input size="large" placeholder="username" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={'password'}
                key={'password'}
                rules={[{ required: true, message: 'Please fill Password' }]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="password"
                  prefix={<KeyOutlined />}
                />
              </Form.Item>
            </Col>
            <Row gutter={16} justify="end">
              <Col>
                <Link to={''}>
                  <Button size={'large'} htmlType="button">
                    {t('transacButton.cancel')}
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button size={'large'} type="primary" htmlType="submit">
                  {t('transacButton.submit')}
                </Button>
              </Col>
            </Row>
          </Row>
        </Space>
      </Form>
    </>
  )
}

export default UserFormPage
