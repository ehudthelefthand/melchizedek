import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'

import { PropsWithChildren, useEffect } from 'react'
import {
  FixOffering,
  TransactionForm,
  TransactionOfferingForm,
} from '../../../model/model'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

interface Props {
  onCancel: () => void
  offerID?: number
  transactionForm: FormInstance<TransactionForm>
}

function FixOfferingForm(props: PropsWithChildren<Props>) {
  const { offerID, onCancel, transactionForm } = props
  const [offeringForm] = Form.useForm<FixOffering>()
  const [t] = useTranslation('translation')
  // const [days, setDays] = useState<Dayjs[]>()

  // TODO: OfferingForm
  // const findTransacID = transactionForm.data.offerings.find(
  //   (value) => value.ID === offerID
  // )

  useEffect(() => {
    offeringForm.setFieldsValue({
      staffName: transactionForm.getFieldValue('staffName'),
      department: transactionForm.getFieldValue('department'),
    })

    if (offerID) {
      console.log('Offering id is cilcked!!', offerID)
      const offeringSelected: TransactionOfferingForm = transactionForm
        .getFieldValue('offerings')
        .filter((offer: TransactionOfferingForm) => offer.id === offerID)[0]

      offeringForm.setFieldsValue({
        amount: offeringSelected.amount,
        date: [offeringSelected.startDate, offeringSelected.dueDate],
      })
      console.log('offeringForm', offeringForm)

      // form.setFieldsValue({
      //   staffName: findTransacID!.staffName,
      //   department: findTransacID!.department,
      //   amount: findTransacID!.amount,
      //   date: formatDate.formatTwoDate(
      //     findTransacID!.startDate,
      //     findTransacID!.dueDate
      //   ),
      // })
    }
  }, [])

  const onSubmit = (value: FixOffering) => {
    console.log('fix', value)
    console.log('day', dayjs())

    const offering: TransactionOfferingForm = {
      id: 0,
      staffName: value.staffName,
      department: value.department,
      kind: 'Fix',
      amount: value.amount,
      startDate: value.date[0],
      dueDate: value.date[1],
      descriptions: '',
      projectName: '',
    }
    console.log('offers', offering)

    transactionForm.setFieldsValue({
      offerings: [...transactionForm.getFieldValue('offerings'), offering],
    })
    console.log(transactionForm.getFieldValue('offerings'))

    onCancel()

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
    //   onCancel()
    // }
  }

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>FIX</h1>
      <Form onFinish={onSubmit} layout="vertical" form={offeringForm}>
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row gutter={15} style={{ rowGap: 20 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item key={'staffName'} name={'staffName'} hasFeedback>
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
                name={'date'}
                key={'date'}
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
