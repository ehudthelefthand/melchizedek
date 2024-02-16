import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useUserForm from './hook/useUserForm'
import Search from 'antd/es/input/Search'

function UserFormPage() {
  const [t] = useTranslation('translation')
  const userForm = useUserForm()
  const {
    setErrorMessage,
    errorMessage,
    onSubmit,
    departmentAPI,
    role,
    handleValidateUsername,
  } = userForm

  return (
    <>
      <Form onFinish={onSubmit}>
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h2>
                <span
                  style={{
                    fontSize: '25px',
                  }}
                >
                  {/* TODO: แปลภาษา */}
                  เพิ่มผู้ใช้งาน
                </span>
              </h2>
            </Col>
            <Col span={24}>
              <Form.Item
                name={'username'}
                key={'username'}
                rules={[
                  { required: true, message: 'Please fill UserName' },
                  () => ({
                    validator(_, value) {
                      if (value) {
                        handleValidateUsername(value)
                      }
                      setErrorMessage('')
                    },
                  }),
                ]}
                hasFeedback
              >
                <Search
                  placeholder="ชื่อผู้ใช้"
                  allowClear
                  onSearch={(value) => handleValidateUsername(value)}
                  size="large"
                />
              </Form.Item>
              {errorMessage !== null && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
              )}
            </Col>
            <Col span={24}>
              <Form.Item
                name={'password'}
                key={'password'}
                rules={[{ required: true, message: 'Please fill Password' }]}
                hasFeedback
              >
                <Input.Password size="large" placeholder="รหัสผ่าน" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'fullNameTH'}
                key={'fullNameTH'}
                rules={[{ required: true, message: 'Please fill FullName' }]}
                hasFeedback
              >
                <Input size="large" placeholder="ชื่อภาษาไทย" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'fullNameEN'}
                key={'fullNameEN'}
                rules={[
                  { required: true, message: 'Please fill English name' },
                ]}
                hasFeedback
              >
                <Input size="large" placeholder="ชื่อภาษาอังกฤษ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'nickName'}
                key={'nickName'}
                rules={[{ required: true, message: 'Please fill Nickname' }]}
                hasFeedback
              >
                <Input size="large" placeholder="ชื่อเล่น" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={'departmentId'}
                name={'departmentId'}
                rules={[
                  { required: true, message: 'Please select a department' },
                ]}
                hasFeedback
              >
                <Select
                  placeholder={t('transacForm.department')}
                  options={departmentAPI}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key={'role'}
                name={'role'}
                rules={[{ required: true, message: 'Please select a role' }]}
                hasFeedback
              >
                <Select placeholder="สถานะ" options={role} size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Col>
              <Link to={'/user'}>
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
        </Space>
      </Form>
    </>
  )
}

export default UserFormPage
