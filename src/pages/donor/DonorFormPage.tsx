import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useDonorForm from './hook/useDonorForm'

function DonorFormPage() {
  const [t] = useTranslation('translation')
  const { onSubmit, type, staffAPI } = useDonorForm()

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
                  {t('donorForm.create')}
                </span>
              </h2>
            </Col>
            <Col span={6}>
              <Form.Item
                key={'prefix'}
                name={'prefix'}
                rules={[{ required: true, message: 'Please select a Prefix' }]}
                hasFeedback
              >
                <Input placeholder={t('donorForm.prefix')} size="large" />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name={'fullName'}
                key={'fullName'}
                rules={[{ required: true, message: 'Please fill FullName' }]}
                hasFeedback
              >
                <Input
                  placeholder={t('donorForm.fullName')}
                  allowClear
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={'type'}
                name={'type'}
                rules={[{ required: true, message: 'Please select a type' }]}
                hasFeedback
              >
                <Select
                  allowClear
                  options={type}
                  placeholder={t('donorForm.type')}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={'staff'}
                name={'staff'}
                rules={[{ required: true, message: 'Please select a staff' }]}
                hasFeedback
              >
                <Select
                  allowClear
                  options={staffAPI}
                  placeholder={t('donorForm.staff')}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Col>
              <Link to={'/donor'}>
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

export default DonorFormPage
