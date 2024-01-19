import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  SelectProps,
  Space,
} from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'

import { PropsWithChildren, useEffect, useState } from 'react'
import {
  FixOfferingFormAntd,
  TransactionFixOfferingForm,
  TransactionForm,
} from '../../../model/model'
import API from '../../../api'
import { DepartmentAPI, StaffAPI } from '../../../api/models'

const { RangePicker } = DatePicker

interface Props {
  onCancel: () => void
  offerID?: number
  transactionForm: FormInstance<TransactionForm>
}

function FixOfferingForm(props: PropsWithChildren<Props>) {
  const { offerID, onCancel, transactionForm } = props
  const [offeringForm] = Form.useForm<FixOfferingFormAntd>()
  const [t] = useTranslation('translation')
  const [staffs, setStaffs] = useState<StaffAPI[]>([])
  const [departments, setDepartments] = useState<DepartmentAPI[]>([])

  // TODO: OfferingForm
  // const findTransacID = transactionForm.data.offerings.find(
  //   (value) => value.ID === offerID
  // )

  useEffect(() => {
    API.getMetadatum()
      .then((metadatums) => {
        setStaffs(metadatums.staffs)
        setDepartments(metadatums.departments)
      })
      .catch(console.error)
    // edit
    // if (offerID) {
    //   const offeringSelected: TransactionFixOfferingForm = transactionForm
    //     .getFieldValue('offerings')
    //     .filter((offer: TransactionFixOfferingForm) => offer.id === offerID)[0]
    //   offeringForm.setFieldsValue({
    //     amount: offeringSelected.amount,
    //     date: [offeringSelected.startMonth, offeringSelected.dueMonth],
    //   })
    //   console.log('offeringForm', offeringForm)
    // form.setFieldsValue({
    //   staffName: findTransacID!.staffName,
    //   department: findTransacID!.department,
    //   amount: findTransacID!.amount,
    //   date: formatDate.formatTwoDate(
    //     findTransacID!.startDate,
    //     findTransacID!.dueDate
    //   ),
    // })
    // }
  }, [])

  const staffAPI: SelectProps['options'] = staffs.map((staff) => ({
    label: staff.fullName,
    value: staff.id,
  }))

  const departmentAPI: SelectProps['options'] = departments.map(
    (department) => ({
      label: department.name,
      value: department.id,
    })
  )

  const onSubmit = (value: FixOfferingFormAntd) => {
    const offering: TransactionFixOfferingForm = {
      id: 1,
      staffId: value.staffId,
      departmentId: value.departmentId,
      amount:  parseFloat(value.amount),
      startMonth: value.months[0],
      dueMonth: value.months[1],
    }
    console.log('offering', offering)

    transactionForm.setFieldsValue({
      fixOfferings: [
        ...transactionForm.getFieldValue('fixOfferings'),
        offering,
      ],
    })

    console.log('getForm', transactionForm.getFieldValue('fixOfferings'))
    onCancel()

    // transactionForm.setFieldsValue({
    //   fixOfferings: [...transactionForm.getFieldValue('fixOfferings'), offering],
    // })

    // edit offerings
    // if (offerID) {
    //   const editOffer: Offering = {
    //     ID: offerID,
    //     staffName: findTransacID!.staffName,
    //     department: findTransacID!.department,
    //     kind: 'Fix',
    //     amount: parseFloat(value.amount),
    //     startDate: formatDate.formatDateTime(value.startDate),
    //     dueDate: formatDate.formatDateTime(value.dueDate),
    //     projectName: '',
    //     descriptions: '',
    //   }
    //   const updateOffering = transactionForm.data.offerings.map((offerr) =>
    //     offerr.ID === offerID ? editOffer : offerr
    //   )
    //   transactionForm.setData({
    //     ...transactionForm.data,
    //     offerings: updateOffering,
    //   })
    //   onCancel()
    // } else {
    //   const offer: Offering = {
    //     ID: transactionForm.data.offerings.length + 1,
    //     staffName: transactionForm.data.staffName,
    //     department: transactionForm.data.department,
    //     kind: 'Fix',
    //     amount: parseFloat(value.amount),
    //     startDate: formatDate.formatDateTime(value.startDate),
    //     dueDate: formatDate.formatDateTime(value.dueDate),
    //     projectName: '',
    //     descriptions: '',
    //     // transactionID: 0,
    //   }
    //   transactionForm.setData({
    //     ...transactionForm.data,
    //     offerings: [...transactionForm.data.offerings, offer],
    //   })
    //   console.log('transactionForm.data', transactionForm.data)
    // onCancel()
    // }
  }

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>FIX</h1>
      <Form onFinish={onSubmit} layout="vertical" form={offeringForm}>
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row gutter={15} style={{ rowGap: 20 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                name={'amount'}
                key={'amount'}
                rules={[
                  { required: true, message: `${t('transacValidate.amount')}` },
                ]}
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
                      const amount = parseFloat(
                        value.replace(/\$\s?|(,*)/g, '')
                      )
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
                name={'months'}
                key={'months'}
                rules={[
                  {
                    required: true,
                    message: `${t('transacValidate.dateTransfers')}`,
                  },
                ]}
                hasFeedback
              >
                <RangePicker
                  picker="month"
                  size="large"
                  style={{ width: '100%' }}
                  placeholder={[
                    `${t('offeringForm.startDate')}`,
                    `${t('offeringForm.endDate')}`,
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'end'} gutter={15}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={15} style={{ rowGap: 10 }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={onCancel}
                    size={'large'}
                    style={{ width: '100%' }}
                    htmlType="button"
                  >
                    {t('transacButton.cancel')}
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
                      {offerID
                        ? t('transacButton.edit')
                        : t('transacButton.addData')}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  )
}

export default FixOfferingForm
