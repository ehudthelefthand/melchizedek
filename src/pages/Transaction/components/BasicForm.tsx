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
import { useEffect, useState } from 'react'
import { Banks, Department, Donor, Staff } from '../../../api/models'
import API from '../../../api'

function BasicForm() {
  const [banks, setBanks] = useState<Banks[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [donor, setDonor] = useState<Donor[]>([])

  // form.transactionForm
  // form.setTransactionForm({
  //   ...form.transactionForm,
  //   staffName: 'อะไรก็ได้'
  // })

  useEffect(() => {
    API.getMetadatum()
      .then((metadatums) => {
        setBanks(metadatums.data.Bank)
        setDepartments(metadatums.data.Department)
        setStaff(metadatums.data.Staff)
        setDonor(metadatums.data.Donor)
      })
      .catch(console.error)
  }, [])

  const department: SelectProps['options'] = departments.map((department) => ({
    label: department.name,
    value: department.name,
  }))

  const filterBanks = banks.filter((n) => n.id <= 3)
  const toBank: SelectProps['options'] = filterBanks.map((bank) => ({
    label: bank.code,
    value: bank.code,
  }))

  const fromBank: SelectProps['options'] = banks.map((bank) => ({
    label: bank.code,
    value: bank.code,
  }))

  const staffs: SelectProps['options'] = staff.map((staff) => ({
    label: staff.fullname,
    value: staff.fullname,
  }))

  const donors: SelectProps['options'] = donor.map((donor) => ({
    label: donor.fullname,
    value: donor.fullname,
  }))

  return (
    <>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Form.Item
              key={'staffName'}
              name={'staffName'}
              rules={[{ required: true, message: 'Please fill staff name' }]}
              hasFeedback
            >
              <Select
                options={staffs}
                size="large"
                placeholder={t('transacForm.staffName')}
                // TODO: แก้ form ให้เป็นของใหม่
                // onSelect={(event) =>
                //   transactionForm.setData({
                //     ...transactionForm.data,
                //     staffName: event,
                //   })
                // }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              key={'donorName'}
              name={'donorName'}
              rules={[{ required: true, message: 'Please fill donor name' }]}
              hasFeedback
            >
              <Select
                size="large"
                placeholder={t('transacForm.donorName')}
                options={donors}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              key={'department'}
              name={'department'}
              rules={[
                { required: true, message: 'Please select a department' },
              ]}
              hasFeedback
            >
              <Select
                placeholder={t('transacForm.department')}
                options={department}
                size="large"
                // onSelect={(event) =>
                //   transactionForm.setData({
                //     ...transactionForm.data,
                //     department: event,
                //   })
                // }
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
                max='999999999'
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
                // TODO: เปลี่ยนเป็น transferDate !!
                placeholder={t('transacForm.dateTransfers')}
                onOk={(value: DatePickerProps['value']) => value}
                style={{ width: '100%' }}
                format={'DD/MM/YYYY HH:mm:ss'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15} style={{ rowGap: 20 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'toBank'}
              name={'toBank'}
              rules={[{ required: true, message: 'Please select the bank' }]}
              hasFeedback
            >
              <Select
                placeholder={t('transacForm.fromBank')}
                options={fromBank}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              key={'formBank'}
              name={'fromBank'}
              rules={[{ required: true, message: 'Please select the bank' }]}
              hasFeedback
            >
              <Select
                placeholder={t('transacForm.toBank')}
                options={toBank}
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
