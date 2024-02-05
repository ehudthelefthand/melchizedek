import { Col, Row, Space, DatePicker, Form, Button, message } from 'antd'
import { PropsWithChildren } from 'react'
import { useService } from '../../../service/service'
import { TransactionReportFormAntd } from './model/report'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

const TransactionReportFilterForm = (
  props: PropsWithChildren<{
    onCancel: () => void
  }>
) => {
  const { onCancel } = props
  const service = useService()
  const navigate = useNavigate()

  function onSubmit(value: TransactionReportFormAntd) {
    service.api.transaction
      .requestReport({
        startMonth: +value.months[0],
        dueMonth: +value.months[1],
      })
      .then(() => {
        console.log(value.months[0], value.months[1])
        onCancel()
        navigate('/transaction/historyReport')
      })
      .catch((err) => {
        console.error('error report form', err)
        message.error(`Database connection is lost!, Please try again.`)
        onCancel()
        navigate('/transaction')
      })
  }

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Form.Item
              name={'months'}
              key={'months'}
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกเดือน',
                },
              ]}
              hasFeedback
            >
              <RangePicker
                picker="month"
                size="large"
                style={{ width: '100%' }}
                placeholder={['ตั้งแต่เดือน', 'ถึงเดือน']}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'end'} gutter={15}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row gutter={15} style={{ rowGap: 10 }}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button
                  onClick={() => {
                    onCancel()
                  }}
                  size={'large'}
                  style={{ width: '100%' }}
                  htmlType="button"
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item>
                  <Button
                    size={'large'}
                    style={{ width: '100%' }}
                    type="primary"
                    htmlType="submit"
                  >
                    ตกลง
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
    </Form>
  )
}

export default TransactionReportFilterForm
