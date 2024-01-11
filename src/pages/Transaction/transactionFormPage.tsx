import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Space, Button, message, Row, Col, Spin } from 'antd'
import API from '../../api'
import MzkUploadFile from './components/MzkUploadFile'

import { TransactionForm, TransactionOfferingForm } from '../../model/model'
import TextArea from 'antd/es/input/TextArea'
import { CreateTransactions } from '../../api/transactionapi'
import { CreateOffering } from '../../api/models'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

import BasicForm from './components/BasicForm'
import formatDate from '../../util/formatDate'
import OfferingsButton from './components/OfferingButton'
import dayjs from 'dayjs'

const initialForm = {
  // id: 0,
  // donorName: '',
  // amount: '',
  // transferDate: '',
  // toBank: '',
  // fromBank: '',
  // staffName: '',
  // department: '',
  // descriptions: '',
  // createAt: '',
  offerings: [],
}

const TransactionFormPage: React.FC<{
  isEdit: boolean
}> = ({ isEdit }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id: paramsId } = useParams<string>()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  // const transactionForm = useTransactionForm()
  const [form] = Form.useForm<TransactionForm>()
  // const offeringForm = useOfferingForm()
  const [t] = useTranslation('translation')
  // const transactionForm = useContext(transactionFormContext)
  const isEditing: boolean = isEdit || (location.state && location.state.isEdit)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: ทำ tokenAPI ส่ง response ให้เสร็จ

  useEffect(() => {
    console.log('params', paramsId)
    // Edit
    if (paramsId) {
      setIsLoading(true)
      API.getTransactionByID(paramsId)
        .then((transaction) => {
          const response: TransactionForm = {
            staffName: transaction.data.staffName,
            donorName: transaction.data.donorName,
            department: transaction.data.department,
            amount: transaction.data.amount.toString(),
            transferDate: formatDate.formatStringToDayJs(
              transaction.data.transferDate
            ),
            toBank: transaction.data.toBank,
            fromBank: transaction.data.fromBank,
            descriptions: transaction.data.descriptions,
            id: transaction.data.id,
            createAt: dayjs(transaction.data.createAt),
            // offerings: transaction.data.offerings,
            offerings: transaction.data.offerings.map((offering) => {
              return {
                id: offering.id,
                staffName: offering.staffName,
                department: offering.department,
                kind: offering.kind,
                amount: offering.amount.toString(),
                projectName: offering.projectName,
                startDate: formatDate.formatStringToDayJs(offering.startDate),
                dueDate: formatDate.formatStringToDayJs(offering.dueDate),
                descriptions: offering.descriptions,
              }
            }),
          }

          form.setFieldsValue(response)
          setIsLoading(false)
        })
        .catch((_) => {
          // TODO: แก้ชื่อ
          message.error('Update Fail !')
          navigate('/transaction')
        })
    }
  }, [])

  // TODO: แยกไฟล์ให้ถูก
  const onSubmit = async (value: TransactionForm) => {
    if (isEditing) {
      console.log('edit mode', form.getFieldValue('offerings'))
      const edited: CreateTransactions = {
        donorName: value.donorName,
        staffName: value.staffName,
        department: value.department,
        fromBank: value.fromBank,
        toBank: value.toBank,
        amount: parseFloat(value.amount),
        descriptions: value.descriptions,
        transferDate: value.transferDate.format('DD/MM/YYYY HH:mm:ss'),
        offerings: [],
      }
      console.log('key id', paramsId)
      console.log('after edit ', edited)

      try {
        if (paramsId) {
          API.updateTransaction(edited, parseInt(paramsId))
          message.success('Update successful!')
          navigate('/transaction/')
        }
      } catch (err) {
        message.error('Update Fail!')
      }
    } else {
      console.log('to create', value)
      console.log('transferDate!!', value.transferDate)

      const transaction: CreateTransactions = {
        donorName: value.donorName,
        staffName: value.staffName,
        department: value.department,
        fromBank: value.fromBank,
        toBank: value.toBank,
        // TODO: Transactions
        amount: parseFloat(value.amount),
        transferDate: value.transferDate.format('DD/MM/YYYY HH:mm:ss'),
        descriptions: value.descriptions,
        offerings: [],
      }
      // value.offerings
      // form.getFieldValue("offerings")

      const saveOffers: CreateOffering[] = form
        .getFieldValue('offerings')
        .map((offer: TransactionOfferingForm) => {
          const offerapi: CreateOffering = {
            ...offer,
            amount: parseFloat(offer.amount),
            startDate: offer.startDate.format('DD/MM/YYYY'),
            dueDate: offer.dueDate.format('DD/MM/YYYY'),
          }
          return offerapi
        })
      // console.log('offering', saveOffers)
      // console.log('offering length', saveOffers.length)
      try {
        const response = API.createTransaction(transaction)
        response.then(() => {
          if (saveOffers.length > 0) {
            API.createOffering(saveOffers)
          }
        })
        message.success('Add successful!')
        navigate('/transaction/')
      } catch (err) {
        console.log(err)
        message.error('Add Fail!')
      }
    }
  } /// out of submit

  return (
    <div className="transaction-add-form">
      {isLoading ? (
        // <div>รอก่อนนน</div>
        <Spin />
      ) : (
        <Form
          onFinish={onSubmit}
          form={form}
          initialValues={initialForm}
          className="input-transaction"
        >
          <Space direction="vertical" size={20} style={{ display: 'flex' }}>
            <BasicForm />
            <OfferingsButton form={form} />
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
                    {isEditing
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
                    {isEditing
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
