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
import { useState } from 'react'
import { DonorSearchRespones } from '../../../../api/donor/response'

function BasicForm() {
  const service = useService()
  const metaDonor = service.metadatums.getAllDonors()
  const nickName = service.reactStore.store.user?.nickName
  const role = service.reactStore.store.user?.role
  const isAdmin = role === 'admin'
  const [donorOptions, setDonorOptions] = useState<DonorSearchRespones[]>(metaDonor)

  const handleDonorSearch = async (newValue: string) => {
    try {
      const donor = await service.api.donor.getDonorFilter({
        fullName: newValue,
      })
      setDonorOptions(donor ?? {})
    } catch (error) {
      console.error(error)
      // const donor = await service.metadatums.getAllDonors()
      setDonorOptions([])
    }
  }

  const donorAPI: SelectProps['options'] = donorOptions?.map(
    (donor: DonorSearchRespones) =>
      ({
        label: donor.fullName,
        value: donor.id,
      }) ?? []
  )

  const staffAPI: SelectProps['options'] = service.metadatums
    .getAllStaffs()
    ?.map(
      (staff) =>
        ({
          label: staff.nickName,
          value: staff.id,
        }) ?? []
    )

  const departmentAPI: SelectProps['options'] = service.metadatums
    .getAllDepartments()
    ?.map(
      (department) =>
        ({
          label: department.name,
          value: department.id,
        }) ?? []
    )

  const filterBanksAPI = service.metadatums.getMZKBanks()
  const toBankAPI: SelectProps['options'] = filterBanksAPI?.map(
    (bank) =>
      ({
        label: bank.code,
        value: bank.id,
      }) ?? []
  )

  const fromBankAPI: SelectProps['options'] = service.metadatums
    .getAllBanks()
    ?.map(
      (bank) =>
        ({
          label: bank.code,
          value: bank.id,
        }) ?? []
    )

  return (
    <>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Form.Item
              key={'staffId'}
              name={'staffId'}
              rules={
                isAdmin
                  ? [{ required: true, message: 'Please fill staff name' }]
                  : [{ required: false }]
              }
              hasFeedback
            >
              <Select
                disabled={!isAdmin}
                options={staffAPI}
                size="large"
                placeholder={isAdmin ? t('transacForm.staffName') : nickName}
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
                showSearch
                placeholder={t('transacForm.donorName')}
                filterOption={false}
                notFoundContent={null}
                defaultActiveFirstOption={false}
                onSearch={handleDonorSearch}
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
