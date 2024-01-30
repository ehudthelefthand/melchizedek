import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  Row,
  Select,
  SelectProps,
  Space,
} from 'antd'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { FormInstance } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'
import { TransactionForm } from '../model/transaction'
import { useService } from '../../../../service/service'
import {
  ProjectOfferingFormAntd,
  TransactionProjectOfferingForm,
} from '../model/projectOffering'
import { calculateOffering } from '../utils/calculateOffering'

function ProjectOfferingForm(
  props: PropsWithChildren<{
    onCancel: () => void
    editId: number
    transactionForm: FormInstance<TransactionForm>
  }>
) {
  const { editId, onCancel, transactionForm } = props
  // const transactionForm = useTransactionForm()
  const [t] = useTranslation('translation')
  const [projectOfferingForm] = Form.useForm<ProjectOfferingFormAntd>()
  const service = useService()

  const [currentEditAmount, setCurrentEditAmount] = useState(0)
  const [forceRenderValue, forceRender] = useState(Math.random())
  const offeringAmountCalculation = useMemo(() => {
    return calculateOffering(
      props.transactionForm,
      projectOfferingForm.getFieldValue('amount') ?? 0,
      currentEditAmount
    )
  }, [forceRenderValue, currentEditAmount])

  useEffect(() => {
    if (editId != null) {
      const offeringSelected: TransactionProjectOfferingForm = transactionForm
        .getFieldValue('projectOfferings')
        .find(
          (project: TransactionProjectOfferingForm) => project.id === editId
        )

      projectOfferingForm.setFieldsValue({
        staffId: offeringSelected.staffId,
        departmentId: offeringSelected.departmentId,
        amount: offeringSelected.amount,
        date: offeringSelected.date,
        projectId: offeringSelected.projectId,
        descriptions: offeringSelected.descriptions,
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

  const projectAPI: SelectProps['options'] = service.metadatums
    .getAllProjects()
    .map((project) => ({
      label: project.name,
      value: project.id,
    }))

  const onSubmit = (value: ProjectOfferingFormAntd) => {
    const fakeId: [] = transactionForm.getFieldValue('projectOfferings')

    if (editId !== null) {
      console.log('params', editId)
      const editOffer: TransactionProjectOfferingForm = {
        id: editId,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        date: value.date,
        projectId: value.projectId,
        descriptions: value.descriptions,
      }
      const updateProjectOffering = transactionForm
        .getFieldValue('projectOfferings')
        .map((projectOfferings: TransactionProjectOfferingForm) =>
          projectOfferings.id === editId ? editOffer : projectOfferings
        )

      transactionForm.setFieldsValue({
        ...transactionForm.getFieldsValue(),
        projectOfferings: updateProjectOffering,
      })
    } else {
      const createProjectOffering: TransactionProjectOfferingForm = {
        id: fakeId.length + 1,
        staffId: value.staffId,
        departmentId: value.departmentId,
        amount: value.amount,
        date: value.date,
        projectId: value.projectId,
        descriptions: value.descriptions,
      }
      transactionForm.setFieldsValue({
        projectOfferings: [
          ...transactionForm.getFieldValue('projectOfferings'),
          createProjectOffering,
        ],
      })
    }
    onCancel()
    projectOfferingForm.resetFields()
  }

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>PROJECT</h1>
      <Form onFinish={onSubmit} layout="vertical" form={projectOfferingForm}>
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
                key={'projectId'}
                name={'projectId'}
                rules={[
                  {
                    required: true,
                    message: `${t('transacValidate.event')} `,
                  },
                ]}
                hasFeedback
              >
                <Select
                  placeholder={t('offeringForm.event')}
                  options={projectAPI}
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
                  minLength={1}
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
                ยอดที่เหลือหลัง Project: {offeringAmountCalculation.remainingAmount}
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name={'date'}
                key={'date'}
                rules={[
                  {
                    required: true,
                    message: `${t('transacValidate.dateEvent')} `,
                  },
                ]}
                hasFeedback
              >
                <DatePicker
                  placeholder={t('offeringForm.dateTransfers')}
                  size="large"
                  onChange={(value: DatePickerProps['value']) => value}
                  onOk={(value: DatePickerProps['value']) => value}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item key={'descriptions'} name={'descriptions'}>
                <TextArea
                  allowClear
                  size="large"
                  rows={4}
                  placeholder={t('offeringForm.descriptions')}
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
                      {editId
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

export default ProjectOfferingForm
