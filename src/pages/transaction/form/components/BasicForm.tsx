import {
  Row,
  Col,
  Form,
  Select,
  InputNumber,
  DatePicker,
  DatePickerProps,
  SelectProps,
  Space,
} from 'antd'
import { t } from 'i18next'
import { useService } from '../../../../service/service'

function BasicForm() {
  const service = useService()

  const staffAPI: SelectProps['options'] = service.metadatums
    .getAllStaffs()
    .map((staff) => ({
      label: staff.fullName,
      value: staff.id,
    }))

  const departmentAPI: SelectProps['options'] = service.metadatums
    .getAllDepartments()
    .map((department) => ({
      label: department.name,
      value: department.id,
    }))

  const filterBanksAPI = service.metadatums.getMZKBanks()
  const toBankAPI: SelectProps['options'] = filterBanksAPI.map((bank) => ({
    label: bank.code,
    value: bank.id,
  }))

  const fromBankAPI: SelectProps['options'] = service.metadatums
    .getAllBanks()
    .map((bank) => ({
      label: bank.code,
      value: bank.id,
    }))

  const donorAPI: SelectProps['options'] = service.metadatums
    .getAllDonors()
    .map((donor) => ({
      label: donor.fullName,
      value: donor.id,
    }))

  return (
    <>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Form.Item
              key={'staffId'}
              name={'staffId'}
              rules={[{ required: true, message: 'Please fill staff name' }]}
              hasFeedback
            >
              <Select
                options={staffAPI}
                size="large"
                placeholder={t('transacForm.staffName')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              key={'donorId'}
              name={'donorId'}
              rules={[{ required: true, message: 'Please fill donor name' }]}
              hasFeedback
            >
              <Select
                size="large"
                placeholder={t('transacForm.donorName')}
                options={donorAPI}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
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
        </Row>
        <Row gutter={15} style={{ rowGap: 20 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'amount'}
              name={'amount'}
              rules={[{ required: true, message: 'Please enter the amount' }]}
              hasFeedback
            >
              <InputNumber<string>
                style={{ width: '100%' }}
                stringMode
                min="0"
                max="999999999"
                step={0.01}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => {
                  if (value) {
                    const amount = parseFloat(value.replace(/\$\s?|(,*)/g, ''))
                    return amount.toFixed(2)
                  } else {
                    return ''
                  }
                }}
                size="large"
                placeholder={t('transacForm.amount')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'transferDate'}
              name={'transferDate'}
              rules={[
                {
                  required: true,
                  message: 'Please choose the transfer date',
                },
              ]}
              hasFeedback
            >
              <DatePicker
                size="large"
                showTime
                placeholder={t('transacForm.dateTransfers')}
                onOk={(value: DatePickerProps['value']) => value}
                style={{ width: '100%' }}
                format={'DD/MM/YYYY HH:mm'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15} style={{ rowGap: 20 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'fromBankId'}
              name={'fromBankId'}
              rules={[{ required: true, message: 'Please select the bank' }]}
              hasFeedback
            >
              <Select
                placeholder={t('transacForm.fromBank')}
                options={fromBankAPI}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'toBankId'}
              name={'toBankId'}
              rules={[{ required: true, message: 'Please select the bank' }]}
              hasFeedback
            >
              <Select
                placeholder={t('transacForm.toBank')}
                options={toBankAPI}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default BasicForm
