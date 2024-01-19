import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Row, Space, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../login/login.css'
import API from '../../api'
import { SignIn } from '../../api/models'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../AuthContext'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useUser()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('fullName')
  }, [])

  const onSubmit = async (value: SignIn) => {
    await API.userLogIn(value)
      .then((tokenUser) => {
        console.log('tokenUser :', tokenUser)
        setUser(tokenUser)
        // localStorage.setItem('fullName', tokenUser.user.fullname)
        localStorage.setItem('token', tokenUser.token)
        navigate('/transaction/')
        console.log("Login pass")
      })
      .catch(() => {
        message.error('Invalid Username or Password. Please try again.')
      })
  }

  return (
    <div id="login">
      <div className="container">
        <div className="logo">
          <img src={'/assets/images/yfc_logo2.png'} />
        </div>
        <div className="login-form">
          <Form onFinish={onSubmit}>
            <Space direction="vertical" size={10}>
              <Row justify={'center'}>
                <Col>
                  <h2>
                    <span
                      style={{
                        letterSpacing: '2px',
                        fontSize: '25px',
                        color: '#6FABDD',
                      }}
                    >
                      YFC THAILAND
                    </span>
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={'userName'}
                    rules={[
                      { required: true, message: 'Please fill UserName' },
                    ]}
                    hasFeedback
                  >
                    <Input
                      size="large"
                      placeholder="username"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={'password'}
                    rules={[
                      { required: true, message: 'Please fill Password' },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      size="large"
                      placeholder="password"
                      prefix={<KeyOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      style={{ width: '100%' }}
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
