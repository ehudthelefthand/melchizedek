import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'

import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { useService } from '../../../../service/service'
import { TransactionForm } from '../model/transaction'
import {
  FixOfferingFormAntd,
  TransactionFixOfferingForm,
} from '../model/fixOffering'
import { calculateOffering } from '../utils/calculateOffering'

const { RangePicker } = DatePicker

function FixOfferingForm(
  props: PropsWithChildren<{
    onCancel: () => void
    editId: number
    transactionForm: FormInstance<TransactionForm>
  }>
) {
  const { editId, onCancel, transactionForm } = props
  const [fixOfferingForm] = Form.useForm<FixOfferingFormAntd>()
  const [t] = useTranslation('translation')
  const service = useService()

  const [currentEditAmount, setCurrentEditAmount] = useState(0)
  const [forceRenderValue, forceRender] = useState(Math.random())
  const offeringAmountCalculation = useMemo(() => {
    return calculateOffering(
      props.transactionForm,
      fixOfferingForm.getFieldValue('amount') ?? 0,
      currentEditAmount
    )
  }, [forceRenderValue, currentEditAmount])

  useEffect(() => {
    if (editId !== null) {
      const offeringSelected: TransactionFixOfferingForm = transactionForm
        .getFieldValue('fixOfferings')
        .find((offer: TransactionFixOfferingForm) => offer.id === editId)

      fixOfferingForm.setFieldsValue({
        staffId: offeringSelected.staffId,
        departmentId: offeringSelected.departmentId,
        amount: offeringSelected.amount,
        months: [offeringSelected.startMonth, offeringSelected.dueMonth],
      })

      setCurrentEditAmount(Number(offeringSelected.amount))
    }
  }, [])

  const staffAPI = service.metadatums.getAllStaffs().map((staff) => ({
    label: staff.fullName,
    value: staff.id,
    staff,
  }))

  const departmentAPI = service.metadatums
    .getAllDepartments()
    .map((department) => ({
      label: department.name,
      value: department.id,
      department,
    }))

  const onSubmit = (value: FixOfferingFormAntd) => {
    const fakeId: [] = transactionForm.getFieldValue('fixOfferings')

    if (editId !== null) {
      const editOffer: TransactionFixOfferingForm = {
        id: editId,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        startMonth: value.months[0],
        dueMonth: value.months[1],
      }
      const updateFixOffering = transactionForm
        .getFieldValue('fixOfferings')
        .map((fixOffering: TransactionFixOfferingForm) =>
          fixOffering.id === editId ? editOffer : fixOffering
        )

      transactionForm.setFieldsValue({
        ...transactionForm.getFieldsValue(),
        fixOfferings: updateFixOffering,
      })
    } else {
      const createFixOffering: TransactionFixOfferingForm = {
        id: fakeId.length + 1,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        startMonth: value.months[0],
        dueMonth: value.months[1],
      }
      transactionForm.setFieldsValue({
        fixOfferings: [
          ...transactionForm.getFieldValue('fixOfferings'),
          createFixOffering,
        ],
      })
    }
    onCancel()
    fixOfferingForm.resetFields()
  }

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>FIX</h1>
      <Form onFinish={onSubmit} layout="vertical" form={fixOfferingForm}>
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
                  () => ({
                    validator(_, value) {
                      const amount = Number(value)
                      if (amount >= 0) {
                        const calculatedResult = calculateOffering(
                          transactionForm,
                          amount,
                          currentEditAmount
                        )
                        if (calculatedResult.remainingAmount < 0) {
                          return Promise.reject(
                            new Error('จำนวนคงเหลือไม่สามารถติดลบได้')
                          )
                        }
                      }
                      return Promise.resolve()
                    },
                  }),
                ]}
                hasFeedback
              >
                <InputNumber<string>
                  style={{ width: '100%' }}
                  stringMode
                  min="0"
                  max="10000000"
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
                  onChange={() => forceRender(Math.random())}
                  size="large"
                  placeholder={t('transacForm.amount')}
                />
              </Form.Item>
              <div>
                ยอดที่เหลือทั้งหมด: {offeringAmountCalculation.leftAmount}
              </div>
              <div>
                ยอดที่เหลือหลัง Fix: {offeringAmountCalculation.remainingAmount}
              </div>
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
          <Row></Row>
          <Row justify={'end'} gutter={15}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={15} style={{ rowGap: 10 }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={() => {
                      onCancel(), fixOfferingForm.resetFields()
                    }}
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
                      {t('transacButton.addData')}
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
