import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Form,
  message,
  Row,
  Select,
  Space,
  Spin,
} from 'antd'

import TextArea from 'antd/es/input/TextArea'

import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

import BasicForm from './components/BasicForm'
import MzkUploadFile from './components/MzkUploadFile'
import dayjs from 'dayjs'
import { TransactionForm } from '../model/transaction'
import { TransactionFixOfferingForm } from '../model/fixOffering'
import { TransactionGiftOfferingForm } from '../model/giftOffering'
import { TransactionProjectOfferingForm } from '../model/projectOffering'
import { TransactionGiftOfferingResponse } from '../../../api/response/giftOffering'
import { TransactionFixOfferingResponse } from '../../../api/response/fixOffering'
import { TransactionProjectOfferingResponse } from '../../../api/response/projectOffering'
import {
  CreateTransactionFixOfferingRequest,
  TransactionFixOfferingRequest,
} from '../../../api/request/fixOffering'
import {
  CreateTransactionGiftOfferingRequest,
  TransactionGiftOfferingRequest,
} from '../../../api/request/giftOffering'
import { TransactionProjectOfferingRequest } from '../../../api/request/projectOffering'
import {
  CreateTransactionRequest,
  TransactionRequest,
} from '../../../api/request/transaction'
import API from '../../../api'
import OfferingButton from './components/ButtonOffering'

const initialTransactionForm: TransactionForm = {
  id: null,
  donor: null,
  amount: '',
  transferDate: null,
  toBank: null,
  fromBank: null,
  staff: null,
  department: null,
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
    'No paramsId GetOfferings',
    form.getFieldsValue(['fixOfferings', 'giftOfferings', 'projectOfferings'])
  )

  useEffect(() => {
    //TODO: Set value to edit form
    API.getMetadatum().then((metadatum) => {
      if (paramsId) {
        setIsLoading(true)
        API.getTransactionByID(paramsId)
          .then((transaction) => {
            let staff = metadatum.staffs.find(
              (staff) => staff.id === transaction.staffId
            )
            let donor = metadatum.staffs.find(
              (donor) => donor.id === transaction.donorId
            )
            let department = metadatum.departments.find(
              (department) => department.id === transaction.departmentId
            )
            let toBank = metadatum.banks.find(
              (bank) => bank.id === transaction.toBankId
            )
            let fromBank = metadatum.banks.find(
              (bank) => bank.id === transaction.fromBankId
            )

            if (!staff) {
              staff = { id: 0, fullName: 'No Data' }
            }
            if (!donor) {
              donor = { id: 0, fullName: 'No Data' }
            }
            if (!department) {
              department = { id: 0, name: 'No Data' }
            }
            if (!toBank) {
              toBank = { id: 0, code: 'No Data' }
            }
            if (!fromBank) {
              fromBank = { id: 0, code: 'No Data' }
            }

            const transactionResponse: TransactionForm = {
              id: transaction.id,
              staff: staff,
              donor: donor,
              department: department,
              toBank: toBank,
              fromBank: fromBank,
              amount: transaction.amount.toString(),
              transferDate: dayjs(transaction.transferDate),
              descriptions: transaction.descriptions,
              createAt: dayjs(transaction.createAt),
              fixOfferings: transaction.fixOfferings.map(
                (fixOffering: TransactionFixOfferingResponse) => {
                  let staff = metadatum.staffs.find(
                    (staff) => staff.id === transaction.staffId
                  )
                  if (!staff) {
                    staff = { id: 0, fullName: 'No Data' }
                  }
                  let department = metadatum.departments.find(
                    (department) => department.id === transaction.departmentId
                  )
                  if (!department) {
                    department = { id: 0, name: 'No Data' }
                  }

                  const fix: TransactionFixOfferingForm = {
                    id: fixOffering.id,
                    startMonth: dayjs(fixOffering.startMonth),
                    dueMonth: dayjs(fixOffering.dueMonth),
                    staff: staff,
                    department: department,
                    amount: fixOffering.amount,
                  }
                  return fix
                }
              ),
              giftOfferings: [],
              // giftOfferings: transaction.giftOfferings.map(
              //   (giftOffering: TransactionGiftOfferingResponse) => {
              //     const gift: TransactionGiftOfferingForm = {
              //       transferDate: dayjs(giftOffering.transferDate),
              //       staff: [undefined],
              //       department: undefined,
              //     }
              //     return gift
              //   }
              // ),
              projectOfferings: transaction.projectOfferings.map(
                (projectOffering: TransactionProjectOfferingResponse) => {
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
          .catch((error: Error) => {
            console.error(error)
            message.error('Update Fail!')
            navigate('/transaction')
          })
      }
    })
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
      const transactionEdited: TransactionRequest = {
        id: parseInt(paramsId),
        donorId: transaction.donor!.id,
        staffId: transaction.staff!.id,
        departmentId: transaction.department!.id,
        toBankId: transaction.toBank!.id,
        fromBankId: transaction.fromBank!.id,
        amount: parseFloat(transaction.amount),
        descriptions: transaction.descriptions,
        transferDate: +transaction.transferDate!,
        fixOfferings:
          fixOfferings.length > 0
            ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
                const fix: TransactionFixOfferingRequest = {
                  id: fixOffering.id!,
                  staffId: fixOffering.staff.id,
                  departmentId: fixOffering.department.id,
                  startMonth: +fixOffering.startMonth,
                  dueMonth: +fixOffering.dueMonth,
                  amount: parseFloat(fixOffering.amount.toString()),
                }
                return fix
              })
            : [],
        giftOfferings: [],
        // giftOfferings.length > 0
        //   ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
        //       const gift: TransactionGiftOfferingRequest = {
        //         ...giftOffering,
        //         transferDate: +giftOffering.transferDate,
        //         staffId: giftOffering.staffId,
        //         departmentId: giftOffering.departmentId,
        //       }
        //       return gift
        //     })
        //   : [],
        projectOfferings:
          projectOfferings.length > 0
            ? projectOfferings.map(
                (projectOffering: TransactionProjectOfferingForm) => {
                  const project: TransactionProjectOfferingRequest = {
                    ...projectOffering,
                    startDate: +projectOffering.startDate,
                    dueDate: +projectOffering.dueDate,
                    staffId: projectOffering.staffId,
                    departmentId: projectOffering.departmentId,
                  }
                  return project
                }
              )
            : [],
      }
      console.log('Update', transactionEdited)
      API.updateTransaction(transactionEdited, parseInt(paramsId))
        .then(() => {
          message.success('Update successful!')
          navigate('/transaction/')
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
        })
    } else {
      console.log('fixOfferings.length', fixOfferings.length)
      //   // const transactionCreated: CreateTransactionRequest = {
      //   //   donorId: transaction.donorId!,
      //   //   staffId: transaction.staffId!,
      //   //   departmentId: transaction.departmentId!,
      //   //   fromBankId: transaction.fromBankId!,
      //   //   toBankId: transaction.toBankId!,
      //   //   // TODO: Transactions
      //   //   amount: parseFloat(transaction.amount),
      //   //   transferDate: +transaction.transferDate!,
      //   //   descriptions: transaction.descriptions,
      //   //   fixOfferings:
      //   //     fixOfferings.length > 0
      //   //       ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
      //   //           const fix: CreateTransactionFixOfferingRequest = {
      //   //             staffId: fixOffering.staffId,
      //   //             departmentId: fixOffering.departmentId,
      //   //             startMonth: +fixOffering.startMonth,
      //   //             dueMonth: +fixOffering.dueMonth,
      //   //             amount: parseFloat(fixOffering.amount.toString()),
      //   //           }
      //   //           return fix
      //   //         })
      //   //       : [],
      //   //   giftOfferings:
      //   //     giftOfferings.length > 0
      //   //       ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
      //   //           const gift: CreateTransactionGiftOfferingRequest = {
      //   //             ...giftOffering,
      //   //             transferDate: +giftOffering.transferDate,
      //   //             staff: undefined,
      //   //             department: undefined,
      //   //           }
      //   //           return gift
      //   //         })
      //   //       : [],
      //   //   projectOfferings:
      //   //     projectOfferings.length > 0
      //   //       ? projectOfferings.map(
      //   //           (projectOffering: TransactionProjectOfferingForm) => {
      //   //             const project: TransactionProjectOfferingRequest = {
      //   //               ...projectOffering,
      //   //               startDate: +projectOffering.startDate,
      //   //               dueDate: +projectOffering.dueDate,
      //   //               staff: undefined,
      //   //               department: undefined,
      //   //             }
      //   //             return project
      //   //           }
      //   //         )
      //   //       : [],
      //   // }
      //   console.log('transactionCreated !!', transactionCreated)
      //   API.createTransaction(transactionCreated)
      //     .then(() => {
      //       console.log('Createeeee')
      //       message.success('Add successful!')
      //       navigate('/transaction/')
      //     })
      //     .catch((error: Error) => {
      //       console.error(error)
      //       message.error('Create Transaction Fail!')
      //     })
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
            {/* TODO: OfferingLists */}
            <BasicForm />
            <OfferingButton transactionForm={form} paramsId={paramsId} />

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
