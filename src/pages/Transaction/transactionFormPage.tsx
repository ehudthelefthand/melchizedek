import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Form, message, Row, Select, Space, Spin } from 'antd'

import {
  TransactionFixOfferingForm,
  TransactionForm,
  TransactionGiftOfferingForm,
  TransactionProjectOfferingForm,
} from '../../model/model'
import TextArea from 'antd/es/input/TextArea'
import {
  CreateTransactionAPI,
  CreateTransactionFixOfferingAPI,
  CreateTransactionGiftOfferingAPI,
  CreateTransactionProjectOfferingAPI,
  TransactionFixOfferingAPI,
  TransactionGiftOfferingAPI,
  TransactionProjectOfferingAPI,
  UpdateTransactionAPI,
  UpdateTransactionFixOfferingAPI,
  UpdateTransactionGiftOfferingAPI,
  UpdateTransactionProjectOfferingAPI,
} from '../../api/transactionapi'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

import BasicForm from './components/BasicForm'
import OfferingsButton from './components/OfferingButton'
import API from '../../api'
import MzkUploadFile from './components/MzkUploadFile'
import dayjs from 'dayjs'
import TransactionOfferingList from './components/TransactionOfferingList'

const initialTransactionForm: TransactionForm = {
  id: null,
  donorId: null,
  amount: '',
  transferDate: null,
  toBankId: null,
  fromBankId: null,
  staffId: null,
  departmentId: null,
  descriptions: '',
  createAt: null,
  fixOfferings: [],
  giftOfferings: [],
  projectOfferings: [],
}

const TransactionFormPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const navigate = useNavigate()
  const { id: paramsId } = useParams<string>()
  const [form] = Form.useForm<TransactionForm>()
  const [t] = useTranslation('translation')
  const [isLoading, setIsLoading] = useState(false)

  console.log('GetAllForm', form.getFieldsValue())
  console.log(
    'GetOfferings',
    form.getFieldsValue(['fixOffering', 'giftOffering', 'projectOffering'])
  )

  useEffect(() => {
    //TODO: Set value to edit form

    if (paramsId) {
      setIsLoading(true)
      API.getTransactionByID(paramsId)
        .then((transaction) => {
          const transactionResponse: TransactionForm = {
            id: transaction.id,
            staffId: transaction.staffId,
            donorId: transaction.donorId,
            departmentId: transaction.departmentId,
            amount: transaction.amount.toString(),
            transferDate: dayjs(transaction.transferDate),
            toBankId: transaction.toBankId,
            fromBankId: transaction.fromBankId,
            descriptions: transaction.descriptions,
            createAt: dayjs(transaction.createAt),
            fixOfferings: transaction.fixOfferings.map(
              (fixOffering: TransactionFixOfferingAPI) => {
                const fix: TransactionFixOfferingForm = {
                  ...fixOffering,
                  startMonth: dayjs(fixOffering.startMonth),
                  dueMonth: dayjs(fixOffering.dueMonth),
                }
                return fix
              }
            ),
            giftOfferings: transaction.giftOfferings.map(
              (giftOffering: TransactionGiftOfferingAPI) => {
                const gift: TransactionGiftOfferingForm = {
                  ...giftOffering,
                  transferDate: dayjs(giftOffering.transferDate),
                }
                return gift
              }
            ),
            projectOfferings: transaction.projectOfferings.map(
              (projectOffering: TransactionProjectOfferingAPI) => {
                const project: TransactionProjectOfferingForm = {
                  ...projectOffering,
                  startDate: dayjs(projectOffering.startDate),
                  dueDate: dayjs(projectOffering.dueDate),
                }
                return project
              }
            ),
          }

          form.setFieldsValue(transactionResponse)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error)
          message.error('Update Fail!')
          navigate('/transaction')
        })
    }
  }, [])

  // TODO: แยกไฟล์ให้ถูก
  const onSubmit = async (transaction: TransactionForm) => {
    const fixOfferings: TransactionFixOfferingForm[] | [] =
      form.getFieldValue('fixOfferings')
    const giftOfferings: TransactionGiftOfferingForm[] | [] =
      form.getFieldValue('giftOfferings')
    const projectOfferings: TransactionProjectOfferingForm[] | [] =
      form.getFieldValue('projectOfferings')

    if (paramsId) {
      const transactionEdited: UpdateTransactionAPI = {
        id: transaction.id!,
        donorId: transaction.donorId!,
        staffId: transaction.staffId!,
        departmentId: transaction.departmentId!,
        fromBankId: transaction.fromBankId!,
        toBankId: transaction.toBankId!,
        amount: parseFloat(transaction.amount),
        descriptions: transaction.descriptions,
        transferDate: +transaction.transferDate!,
        fixOfferings:
          fixOfferings.length > 0
            ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
                const fix: UpdateTransactionFixOfferingAPI = {
                  id: fixOffering.id,
                  staffId: fixOffering.staffId,
                  departmentId: fixOffering.departmentId,
                  startMonth: +fixOffering.startMonth,
                  dueMonth: +fixOffering.dueMonth,
                  amount: parseFloat(fixOffering.amount.toString()),
                }
                return fix
              })
            : [],
        giftOfferings:
          giftOfferings.length > 0
            ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
                const gift: UpdateTransactionGiftOfferingAPI = {
                  ...giftOffering,
                  transferDate: +giftOffering.transferDate,
                }
                return gift
              })
            : [],
        projectOfferings:
          projectOfferings.length > 0
            ? projectOfferings.map(
                (projectOffering: TransactionProjectOfferingForm) => {
                  const project: UpdateTransactionProjectOfferingAPI = {
                    ...projectOffering,
                    startDate: +projectOffering.startDate,
                    dueDate: +projectOffering.dueDate,
                  }
                  return project
                }
              )
            : [],
      }
      API.updateTransaction(transactionEdited, parseInt(paramsId))
        .then(() => {
          console.log('Edit of paramID', transactionEdited)
          message.success('Update successful!')
          navigate('/transaction/')
        })
        .catch((error) => {
          console.error(error)
          message.error('Update Fail!')
        })
    } else {
      console.log('fixOfferings.length', fixOfferings.length)
      const transactionCreated: CreateTransactionAPI = {
        donorId: transaction.donorId!,
        staffId: transaction.staffId!,
        departmentId: transaction.departmentId!,
        fromBankId: transaction.fromBankId!,
        toBankId: transaction.toBankId!,
        // TODO: Transactions
        amount: parseFloat(transaction.amount),
        transferDate: +transaction.transferDate!,
        descriptions: transaction.descriptions,
        fixOfferings:
          fixOfferings.length > 0
            ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
                const fix: CreateTransactionFixOfferingAPI = {
                  staffId: fixOffering.staffId,
                  departmentId: fixOffering.departmentId,
                  startMonth: +fixOffering.startMonth,
                  dueMonth: +fixOffering.dueMonth,
                  amount: parseFloat(fixOffering.amount.toString()),
                }
                return fix
              })
            : [],
        giftOfferings:
          giftOfferings.length > 0
            ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
                const gift: CreateTransactionGiftOfferingAPI = {
                  ...giftOffering,
                  transferDate: +giftOffering.transferDate,
                }
                return gift
              })
            : [],
        projectOfferings:
          projectOfferings.length > 0
            ? projectOfferings.map(
                (projectOffering: TransactionProjectOfferingForm) => {
                  const project: CreateTransactionProjectOfferingAPI = {
                    ...projectOffering,
                    startDate: +projectOffering.startDate,
                    dueDate: +projectOffering.dueDate,
                  }
                  return project
                }
              )
            : [],
      }
      console.log('transactionCreated !!', transactionCreated)
      API.createTransaction(transactionCreated)
        .then(() => {
          message.success('Add successful!')
          navigate('/transaction/')
        })
        .catch((err) => {
          message.error('Add Fail!'), err
        })
    }
  }
  /// out of submit

  return (
    <div className="transaction-add-form">
      {isLoading ? (
        // TODO: ทำ Skeleton !!
        <Spin />
      ) : (
        <Form
          onFinish={onSubmit}
          form={form}
          initialValues={initialTransactionForm}
          className="input-transaction"
        >
          <Space direction="vertical" size={20} style={{ display: 'flex' }}>
            <BasicForm />
            <OfferingsButton form={form} />
            <TransactionOfferingList />
            <Row>
              <Col span={24}>
                <Form.Item
                  key={'uploadSlip'}
                  name={'uploadSlip'}
                  // rules={[{ required: true, message: 'Please upload proof of payment' }]}
                  hasFeedback
                >
                  <MzkUploadFile />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  key={'descriptions'}
                  name={'descriptions'}
                  hasFeedback
                >
                  <TextArea
                    allowClear
                    size="large"
                    rows={4}
                    placeholder={t('transacForm.descriptions')}
                  />
                </Form.Item>
              </Col>
            </Row>
            {isMobile ? (
              <Row gutter={[0, 8]}>
                <Col xs={24}>
                  <Button
                    style={{ width: '100%' }}
                    size={'large'}
                    type="primary"
                    htmlType="submit"
                  >
                    {paramsId
                      ? `${t('transacButton.edit')}`
                      : `${t('transacButton.submit')}`}
                  </Button>
                </Col>
                <Col xs={24}>
                  <Link to={'/transaction'}>
                    <Button
                      style={{ width: '100%' }}
                      size={'large'}
                      htmlType="button"
                    >
                      {t('transacButton.cancel')}
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : (
              <Row gutter={16} justify="end">
                <Col>
                  <Link to={'/transaction'}>
                    <Button size={'large'} htmlType="button">
                      {t('transacButton.cancel')}
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button size={'large'} type="primary" htmlType="submit">
                    {paramsId
                      ? `${t('transacButton.edit')}`
                      : `${t('transacButton.submit')}`}
                  </Button>
                </Col>
              </Row>
            )}
          </Space>
        </Form>
      )}
    </div>
  )
}
export default TransactionFormPage
