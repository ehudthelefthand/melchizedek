import { Button, Col, Form, InputNumber, Row, Select, Space } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useService } from '../../../../service/service'
import { TransactionForm } from '../model/transaction'
import {
  GiftOfferingFormAntd,
  TransactionGiftOfferingForm,
} from '../model/giftOffering'
import { calculateOffering } from '../utils/calculateOffering'

function GiftOfferingForm(
  props: PropsWithChildren<{
    onCancel: () => void
    editId: number
    transactionForm: FormInstance<TransactionForm>
  }>
) {
  const { editId, onCancel, transactionForm } = props
  const [giftOfferingForm] = Form.useForm<GiftOfferingFormAntd>()
  const [t] = useTranslation('translation')
  const service = useService()

  const [currentEditAmount, setCuttentEditAmount] = useState(0)
  const [forceRenderValue, forceRender] = useState(Math.random())
  const offeringAmountCalculation = useMemo(() => {
    return calculateOffering(
      props.transactionForm,
      giftOfferingForm.getFieldValue('amount') ?? 0,
      currentEditAmount
    )
  }, [forceRenderValue, currentEditAmount])

  useEffect(() => {
    if (editId != null) {
      const offeringSelected: TransactionGiftOfferingForm = transactionForm
        .getFieldValue('giftOfferings')
        .find((offer: TransactionGiftOfferingForm) => offer.id === editId)

      giftOfferingForm.setFieldsValue({
        staffId: offeringSelected.staffId,
        departmentId: offeringSelected.departmentId,
        amount: offeringSelected.amount,
        transferDate: offeringSelected.transferDate,
      })

      setCuttentEditAmount(Number(offeringSelected.amount))
    }
  }, [])

  const staffAPI = service.metadatums.getAllStaffs().map((staff) => ({
    label: staff.nickName,
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

  const onSubmit = (value: GiftOfferingFormAntd) => {
    const fakeId: [] = transactionForm.getFieldValue('giftOfferings')
    const giftTransferDate = transactionForm.getFieldValue('transferDate')

    if (editId != null) {
      const editGiftOffer: TransactionGiftOfferingForm = {
        id: editId,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        transferDate: giftTransferDate,
      }
      const updateOffering = transactionForm
        .getFieldValue('giftOfferings')
        .map((giftOffering: TransactionGiftOfferingForm) =>
          giftOffering.id === editId ? editGiftOffer : giftOffering
        )

      transactionForm.setFieldsValue({
        ...transactionForm.getFieldsValue(),
        giftOfferings: updateOffering,
      })
    } else {
      const createGiftOffering: TransactionGiftOfferingForm = {
        id: fakeId.length + 1,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        transferDate: giftTransferDate,
      }
      transactionForm.setFieldsValue({
        giftOfferings: [
          ...transactionForm.getFieldValue('giftOfferings'),
          createGiftOffering,
        ],
      })
    }

    onCancel()
    giftOfferingForm.resetFields()
  }

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>Gift</h1>
      <Form onFinish={onSubmit} layout="vertical" form={giftOfferingForm}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name={'amount'}
                key={'amount'}
                rules={[
                  { required: true, message: `${t('transacValidate.amount')}` },
                  () => ({
                    validator(_, value) {
                      const amount = Number(value)
                      if (amount >= 0) {
                        const calculateResult = calculateOffering(
                          transactionForm,
                          amount,
                          currentEditAmount
                        )
                        if (calculateResult.remainingAmount < 0) {
                          return Promise.reject(
                            new Error('จำนวนเงินไม่สามารถติดลบได้')
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
                  size="large"
                  onChange={() => forceRender(Math.random())}
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
          </Row>
          <Row justify={'end'} gutter={15}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={15} style={{ rowGap: 10 }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={() => {
                      onCancel(), giftOfferingForm.resetFields()
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
                      {editId
                        ? `${t('transacButton.edit')}`
                        : `${t('transacButton.addData')}`}
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

export default GiftOfferingForm
