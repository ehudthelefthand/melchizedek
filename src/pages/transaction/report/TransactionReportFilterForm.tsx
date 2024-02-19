import {
  Col,
  Row,
  Space,
  DatePicker,
  Form,
  Button,
  message,
  Select,
  SelectProps,
} from 'antd'
import { PropsWithChildren } from 'react'
import { useService } from '../../../service/service'
import { TransactionReportFormAntd } from './model/report'
import { useNavigate } from 'react-router-dom'
import { store } from '../../../store'

const { RangePicker } = DatePicker

const TransactionReportFilterForm = (
  props: PropsWithChildren<{
    onCancel: () => void
  }>
) => {
  const { onCancel } = props
  const service = useService()
  const navigate = useNavigate()
  const isAdmin = store.user?.role === 'admin'

  const departments: SelectProps['options'] = [
    { label: 'BK', value: 'BK' },
    { label: 'CM', value: 'CM' },
    { label: 'CR', value: 'CR' },
  ]

  function onSubmit(value: TransactionReportFormAntd) {
    service.api.transaction
      .requestReport({
        startMonth: +value.months[0],
        dueMonth: +value.months[1],
        department: value.department.toLowerCase(),
      })
      .then(() => {
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
      <Space direction="vertical" size={20} style={{ display: 'flex', paddingTop: 10,paddingBottom: 10}}>
        <Row gutter={[5, 5]}>
          {isAdmin && (
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                key={'department'}
                name={'department'}
                rules={[{ required: true, message: 'กรุณาเลือกภูมิภาค' }]}
                hasFeedback
              >
                <Select
                  options={departments}
                  size="large"
                  placeholder={'เลือกภูมิภาค'}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} sm={24} md={isAdmin ? 12 : 24} lg={isAdmin ? 12 : 24}>
            <Form.Item
              key={'months'}
              name={'months'}
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
