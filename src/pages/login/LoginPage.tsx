import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Space, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import './loginPage.css'
import { useNavigate } from 'react-router-dom'
import { useService } from '../../service/service'
import { UserLoginRequest } from '../../api/user/request'

const LoginPage: React.FC = () => {
  const service = useService()
  const navigate = useNavigate()

  const onSubmit = async (value: UserLoginRequest) => {
    const userLoginResponse = await service.api.user.login(value)
    if (userLoginResponse.token) {
      service.reactStore.update((store) => {
        store.user = {
          username: userLoginResponse.fullName,
          token: userLoginResponse.token,
        }
      })
      await service.metadatums.loadMetadatums()
      navigate('/transaction')
    } else {
      message.error('Invalid Username or Password. Please try again.')
      navigate('/')
    }
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
