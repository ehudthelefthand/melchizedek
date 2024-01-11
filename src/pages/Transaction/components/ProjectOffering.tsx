import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  SelectProps,
  Space,
} from 'antd'
import { PropsWithChildren, useEffect, useState } from 'react'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'
import { ProjectName } from '../../../api/models'
import { ProjectOffering, TransactionForm } from '../../../model/model'
import API from '../../../api'

interface Props {
  onCancel: () => void
  offerID?: number
  transactionForm: FormInstance<TransactionForm>
}

function ProjectOfferingForm(props: PropsWithChildren<Props>) {
  const { offerID, onCancel } = props
  // const transactionForm = useTransactionForm()
  const [t] = useTranslation('translation')
  const [form] = useForm()
  const [projectsName, setProjectsName] = useState<ProjectName[]>([])

  // const findTransacID = transactionForm.data.offerings.find(
  //   (value) => value.ID === offerID
  // )

  useEffect(() => {
    API.getMetadatum()
      .then((metadatums) => {
        console.log('meta useEff', metadatums.data.ProjectName)
        setProjectsName(metadatums.data.ProjectName)
      })
      .catch(console.error)
    // if (offerID) {
    //   form.setFieldsValue({
    //     staffName: findTransacID!.staffName,
    //     department: findTransacID!.department,
    //     amount: findTransacID!.amount,
    //     projectName: findTransacID!.projectName,
    //     date: formatDate.formatDate(findTransacID!.startDate),
    //     descriptions: findTransacID!.descriptions,
    //   })
    // }
  }, [])

  const onSubmit = (value: ProjectOffering) => {
    console.log('project >> ', value)
    if (offerID) {
      //   const editOffer: Offering = {
      //     ID: offerID,
      //     staffName: findTransacID!.staffName,
      //     department: findTransacID!.department,
      //     kind: 'Project',
      //     amount: parseFloat(value.amount),
      //     projectName: value.projectName,
      //     startDate: formatDate.formatDateTime(value.startDate),
      //     dueDate: '',
      //     descriptions: value.descriptions,
      //   }

      //   const updateOffering = transactionForm.data.offerings.map((offerr) =>
      //     offerr.ID === offerID ? editOffer : offerr
      //   )

      //   transactionForm.setData({
      //     ...transactionForm.data,
      //     offerings: updateOffering,
      // })

      onCancel()
    } else {
      // const offer: Offering = {
      //   ID: transactionForm.data.offerings.length + 1,
      //   staffName: transactionForm.data.staffName,
      //   department: transactionForm.data.department,
      //   kind: 'Project',
      //   amount: parseFloat(value.amount),
      //   projectName: value.projectName,
      //   descriptions: value.descriptions,
      //   startDate: formatDate.formatDateTime(value.startDate),
      //   dueDate: '',
      // }
      // transactionForm.setData({
      //   ...transactionForm.data,
      //   offerings: [...transactionForm.data.offerings, offer],
      // })
      onCancel()
    }
  }

  const projectName: SelectProps['options'] = projectsName.map((project) => ({
    label: project.name,
    value: project.name,
  }))

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>PROJECT</h1>
      <Form
        onFinish={onSubmit}
        layout="vertical"
        form={form}
        // initialValues={initialValues}
      >
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row gutter={15} style={{ rowGap: 20 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                key={'staffName'}
                name={'staffName'}
                // name={t('offering-form.staffName')}
                hasFeedback
              >
                <Input
                  placeholder={t('offeringForm.staffName')}
                  size="large"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item key={'department'} name={'department'} hasFeedback>
                <Input
                  placeholder={t('offeringForm.department')}
                  size="large"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15} style={{ rowGap: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name={'projectName'}
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
                  options={projectName}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15} style={{ rowGap: 20 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name={'amount'}
                rules={[
                  { required: true, message: `${t('transacValidate.amount')}` },
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
                  size="large"
                  placeholder={t('transacForm.amount')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name={'date'}
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

export default ProjectOfferingForm
