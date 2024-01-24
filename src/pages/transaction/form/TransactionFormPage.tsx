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
import './transactionFormPage.css'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

import BasicForm from './components/BasicForm'
import MzkUploadFile from './components/MzkUploadFile'
import dayjs from 'dayjs'
import { TransactionForm } from './model/transaction'
import { TransactionFixOfferingForm } from './model/fixOffering'
import { TransactionGiftOfferingForm } from './model/giftOffering'
import { TransactionProjectOfferingForm } from './model/projectOffering'
import { TransactionFixOfferingResponse } from '../../../api/transaction/response/fixOffering'
import { TransactionProjectOfferingResponse } from '../../../api/transaction/response/projectOffering'

import OfferingButton from './components/ButtonOffering'
import { useService } from '../../../service/service'
import {
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from '../../../api/transaction/request/transaction'
import {
  TransactionFixOfferingCreateRequest,
  TransactionFixOfferingUpdateRequest,
} from '../../../api/transaction/request/fixOffering'
import { TransactionGiftOfferingResponse } from '../../../api/transaction/response/giftOffering'
import {
  TransactionGiftOfferingCreateRequest,
  TransactionGiftOfferingUpdateRequest,
} from '../../../api/transaction/request/giftOffering'
import {
  TransactionProjectOfferingCreateRequest,
  TransactionProjectOfferingUpdateRequest,
} from '../../../api/transaction/request/projectOffering'

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
  const service = useService()

  useEffect(() => {
    //TODOe Set value to edit form

    if (paramsId) {
      setIsLoading(true)
      service.api.transaction
        .getOne(parseInt(paramsId))
        .then((transaction) => {
          const transactionResponse: TransactionForm = {
            id: transaction.id,
            staff: service.metadatums.getStaff(transaction.staffId),
            donor: service.metadatums.getDonor(transaction.donorId),
            department: service.metadatums.getDepartment(
              transaction.departmentId
            ),
            toBank: service.metadatums.getBank(transaction.toBankId),
            fromBank: service.metadatums.getBank(transaction.fromBankId),
            amount: transaction.amount.toString(),
            transferDate: dayjs(transaction.transferDate),
            descriptions: transaction.descriptions,
            fixOfferings: transaction.fixOfferings.map(
              (fixOffering: TransactionFixOfferingResponse) => {
                const fix: TransactionFixOfferingForm = {
                  id: fixOffering.id,
                  startMonth: dayjs(fixOffering.startMonth),
                  dueMonth: dayjs(fixOffering.dueMonth),
                  staff: service.metadatums.getStaff(fixOffering.staffId),
                  department: service.metadatums.getDepartment(
                    fixOffering.departmentId
                  ),
                  amount: fixOffering.amount,
                }
                return fix
              }
            ),
            giftOfferings: transaction.giftOfferings.map(
              (giftOffering: TransactionGiftOfferingResponse) => {
                const gift: TransactionGiftOfferingForm = {
                  id: giftOffering.id,
                  staff: service.metadatums.getStaff(giftOffering.id),
                  department: service.metadatums.getDepartment(
                    giftOffering.departmentId
                  ),
                  amount: giftOffering.amount,
                  transferDate: dayjs(giftOffering.transferDate),
                }
                return gift
              }
            ),
            projectOfferings: transaction.projectOfferings.map(
              (projectOffering: TransactionProjectOfferingResponse) => {
                const project: TransactionProjectOfferingForm = {
                  id: projectOffering.id,
                  staff: service.metadatums.getStaff(projectOffering.staffId),
                  department: service.metadatums.getDepartment(
                    projectOffering.departmentId
                  ),
                  amount: projectOffering.amount,
                  startDate: dayjs(projectOffering.startDate),
                  dueDate: dayjs(projectOffering.dueDate),
                  project: service.metadatums.getProject(projectOffering.id),
                  descriptions: projectOffering.descriptions,
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
      const transactionEdited: TransactionUpdateRequest = {
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
                const fix: TransactionFixOfferingUpdateRequest = {
                  id: fixOffering.id,
                  staffId: fixOffering.staff.id,
                  departmentId: fixOffering.department.id,
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
                const gift: TransactionGiftOfferingUpdateRequest = {
                  id: giftOffering.id,
                  staffId: giftOffering.staff.id,
                  departmentId: giftOffering.department.id,
                  transferDate: +giftOffering.transferDate,
                  amount: parseFloat(giftOffering.amount.toString()),
                }
                return gift
              })
            : [],
        projectOfferings:
          projectOfferings.length > 0
            ? projectOfferings.map(
                (projectOffering: TransactionProjectOfferingForm) => {
                  const project: TransactionProjectOfferingUpdateRequest = {
                    id: projectOffering.id,
                    staffId: projectOffering.staff.id,
                    departmentId: projectOffering.department.id,
                    startDate: +projectOffering.startDate,
                    projectId: projectOffering.project.id,
                    dueDate: +projectOffering.dueDate,
                    amount: parseFloat(projectOffering.amount.toString()),
                    descriptions: projectOffering.descriptions,
                  }
                  return project
                }
              )
            : [],
      }
      service.api.transaction
        .update(transactionEdited)
        .then(() => {
          message.success('Update successful!')
          navigate('/transaction/')
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
        })
    } else {
      const transactionCreated: TransactionCreateRequest = {
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
                const fix: TransactionFixOfferingCreateRequest = {
                  staffId: fixOffering.staff.id,
                  departmentId: fixOffering.department.id,
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
                const gift: TransactionGiftOfferingCreateRequest = {
                  staffId: giftOffering.staff.id,
                  departmentId: giftOffering.department.id,
                  transferDate: +giftOffering.transferDate,
                  amount: parseFloat(giftOffering.amount.toString()),
                }
                return gift
              })
            : [],
        projectOfferings:
          projectOfferings.length > 0
            ? projectOfferings.map(
                (projectOffering: TransactionProjectOfferingForm) => {
                  const project: TransactionProjectOfferingCreateRequest = {
                    staffId: projectOffering.staff.id,
                    departmentId: projectOffering.department.id,
                    startDate: +projectOffering.startDate,
                    projectId: projectOffering.project.id,
                    dueDate: +projectOffering.dueDate,
                    amount: parseFloat(projectOffering.amount.toString()),
                    descriptions: projectOffering.descriptions,
                  }
                  return project
                }
              )
            : [],
      }
      service.api.transaction
        .create(transactionCreated)
        .then(() => {
          message.success('Create successful!')
          navigate('/transaction/')
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
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
