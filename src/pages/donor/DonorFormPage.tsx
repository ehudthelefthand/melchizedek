import { Button, Col, Form, Row, Space } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useDonorForm from './hook/useDonorForm'

function DonorFormPage() {
  const [t] = useTranslation('translation')
  const {
    onSubmit,
  } = useDonorForm()

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
                  เพิ่มผู้ถวาย
                </span>
              </h2>
            </Col>

            {/* TODO: Design UI donor form */}

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

export default DonorFormPage
