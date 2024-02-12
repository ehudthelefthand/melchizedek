import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Form, message, Modal, Row, Space, Spin } from 'antd'

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
import FixOfferingList from './components/FixOfferingList'
import FixOfferingForm from './components/FixOffering'
import GiftOfferingForm from './components/GiftOffering'
import ProjectOfferingForm from './components/ProjectOffering'
import GiftOfferingList from './components/GiftOfferingList'
import ProjectOfferingList from './components/ProjectOfferingList'
import { calculateOffering } from './utils/calculateOffering'
import { EvidenceDeleteRequest } from '../../../api/transaction/request/image'

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
  images: [],
  imagesName: [],
  newImages: [],
  imagesDelete: [],
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [offeringType, setOfferingType] = useState<string | null>(null)
  const service = useService()

  useEffect(() => {
    if (paramsId) {
      setIsLoading(true)
      service.api.transaction
        .getOne(parseInt(paramsId))
        .then((transaction) => {
          const transactionResponse: TransactionForm = {
            id: transaction.id,
            staffId: service.metadatums.getStaff(transaction.staffId).id,
            donorId: service.metadatums.getDonor(transaction.donorId).id,
            departmentId: service.metadatums.getDepartment(
              transaction.departmentId
            ).id,
            toBankId: service.metadatums.getBank(transaction.toBankId).id,
            fromBankId: service.metadatums.getBank(transaction.fromBankId).id,
            amount: transaction.amount.toString(),
            transferDate: dayjs(transaction.transferDate),
            images: [],
            imagesName: transaction.images,
            descriptions: transaction.descriptions,
            fixOfferings: transaction.fixOfferings.map(
              (fixOffering: TransactionFixOfferingResponse) => {
                const fix: TransactionFixOfferingForm = {
                  id: fixOffering.id,
                  startMonth: dayjs(fixOffering.startMonth),
                  dueMonth: dayjs(fixOffering.dueMonth),
                  staffId: service.metadatums.getStaff(fixOffering.staffId).id,
                  departmentId: service.metadatums.getDepartment(
                    fixOffering.departmentId
                  ).id,
                  amount: fixOffering.amount,
                }
                return fix
              }
            ),
            giftOfferings: transaction.giftOfferings.map(
              (giftOffering: TransactionGiftOfferingResponse) => {
                const gift: TransactionGiftOfferingForm = {
                  id: giftOffering.id,
                  staffId: service.metadatums.getStaff(giftOffering.staffId).id,
                  departmentId: service.metadatums.getDepartment(
                    giftOffering.departmentId
                  ).id,
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
                  staffId: service.metadatums.getStaff(projectOffering.staffId)
                    .id,
                  departmentId: service.metadatums.getDepartment(
                    projectOffering.departmentId
                  ).id,
                  amount: projectOffering.amount,
                  date: dayjs(projectOffering.date),
                  projectId: service.metadatums.getProject(
                    projectOffering.projectId
                  ).id,
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

  const onSubmit = async (transaction: TransactionForm) => {
    const images = form.getFieldValue('images')
    const newImages = form.getFieldValue('newImages')
    const deleteImages = form.getFieldValue('imagesDelete')

    const fixOfferings: TransactionFixOfferingForm[] | [] =
      form.getFieldValue('fixOfferings')
    const giftOfferings: TransactionGiftOfferingForm[] | [] =
      form.getFieldValue('giftOfferings')
    const projectOfferings: TransactionProjectOfferingForm[] | [] =
      form.getFieldValue('projectOfferings')

    if (calculateOffering(form, 0, 0).leftAmount < 0) {
      Modal.warning({
        title: 'โปรดตรวจสอบยอดเงินทั้งหมดก่อน !',
        content: 'ไม่สามารถแบ่งยอดเงินได้เกินกว่ายอดเงินทั้งหมด..',
      })
      return
    }

    if (paramsId) {
      const formData = new FormData()
      newImages.forEach((newImage: File) => {
        formData.append('photo', newImage)
      })

      const deleteEvidence: EvidenceDeleteRequest = {
        imagesName: deleteImages,
        transactionId: parseInt(paramsId),
      }

      const transactionEdited: TransactionUpdateRequest = {
        id: parseInt(paramsId),
        donorId: transaction.donorId!,
        staffId: transaction.staffId!,
        departmentId: transaction.departmentId!,
        toBankId: transaction.toBankId!,
        fromBankId: transaction.fromBankId!,
        amount: parseFloat(transaction.amount),
        descriptions: transaction.descriptions,
        transferDate: +transaction.transferDate!,
        images: transaction.images,
        fixOfferings:
          fixOfferings.length > 0
            ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
                const fix: TransactionFixOfferingUpdateRequest = {
                  id: fixOffering.id,
                  staffId: fixOffering.staffId,
                  departmentId: fixOffering.departmentId,
                  startMonth: +fixOffering.startMonth,
                  dueMonth: +fixOffering.dueMonth,
                  amount: parseFloat(fixOffering.amount.toString()),
                  transactionId: parseInt(paramsId),
                }
                return fix
              })
            : [],
        giftOfferings:
          giftOfferings.length > 0
            ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
                const gift: TransactionGiftOfferingUpdateRequest = {
                  id: giftOffering.id,
                  staffId: giftOffering.staffId,
                  departmentId: giftOffering.departmentId,
                  transferDate: +giftOffering.transferDate,
                  amount: parseFloat(giftOffering.amount.toString()),
                  transactionId: parseInt(paramsId),
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
                    staffId: projectOffering.staffId,
                    departmentId: projectOffering.departmentId,
                    date: +projectOffering.date,
                    projectId: projectOffering.projectId,
                    amount: parseFloat(projectOffering.amount.toString()),
                    descriptions: projectOffering.descriptions,
                    transactionId: parseInt(paramsId),
                  }
                  return project
                }
              )
            : [],
      }
      service.api.transaction
        .update(transactionEdited)
        .then((response) => {
          service.api.transaction.upload(formData, response.id).then(() => {
            service.api.transaction.deleteImages(deleteEvidence).then(() => {
              message.success('Update successful!')
              navigate('/transaction')
            })
          })
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
        })
    } else {
      const formData = new FormData()
      images.forEach((image: File) => {
        // formData has no data??
        formData.append('photo', image)
      })

      const transactionCreated: TransactionCreateRequest = {
        donorId: transaction.donorId!,
        staffId: transaction.staffId!,
        departmentId: transaction.departmentId!,
        toBankId: transaction.toBankId!,
        fromBankId: transaction.fromBankId!,
        amount: parseFloat(transaction.amount),
        descriptions: transaction.descriptions,
        transferDate: +transaction.transferDate!,
        images: transaction.images,
        fixOfferings:
          fixOfferings.length > 0
            ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
                const fix: TransactionFixOfferingCreateRequest = {
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
                const gift: TransactionGiftOfferingCreateRequest = {
                  staffId: giftOffering.staffId,
                  departmentId: giftOffering.departmentId,
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
                    staffId: projectOffering.staffId,
                    departmentId: projectOffering.departmentId,
                    date: +projectOffering.date,
                    projectId: projectOffering.projectId,
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
        .then((response) => {
          service.api.transaction
            .upload(formData, response.id)
            .then((response) => response)
          message.success('Create successful!')
          navigate('/transaction')
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
        })
    }
  }

  const onCancel = () => {
    setModalVisible(false)
    setEditId(null)
    setOfferingType(null)
  }

  return (
    <div className="transaction-add-form">
      {isLoading ? (
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
            <Row>
              <Col xs={24} sm={8} md={8}>
                <Row gutter={[5, 5]}>
                  <Col xs={24} sm={24} md={8}>
                    <Button
                      onClick={() => {
                        form
                          .validateFields()
                          .then(() => {
                            setModalVisible(true)
                            setOfferingType('fix')
                          })
                          .catch(() => {
                            message.error('โปรดกรอกข้อมูลให้ครบ!')
                          })
                      }}
                      size="large"
                      type="primary"
                      htmlType="button"
                      style={{ width: '100%' }}
                    >
                      Fix
                    </Button>
                  </Col>
                  <Col xs={24} sm={8} md={8}>
                    <Button
                      onClick={() => {
                        form
                          .validateFields()
                          .then(() => {
                            setModalVisible(true)
                            setOfferingType('gift')
                          })
                          .catch(() => {
                            message.error('โปรดกรอกข้อมูลให้ครบ!')
                          })
                      }}
                      size="large"
                      type="primary"
                      htmlType="button"
                      style={{ width: '100%' }}
                    >
                      Gift
                    </Button>
                  </Col>
                  <Col xs={24} sm={8} md={8}>
                    <Button
                      onClick={() => {
                        form
                          .validateFields()
                          .then(() => {
                            setModalVisible(true)
                            setOfferingType('project')
                          })
                          .catch(() => {
                            message.error('โปรดกรอกข้อมูลให้ครบ!')
                          })
                      }}
                      size="large"
                      type="primary"
                      htmlType="button"
                      style={{ width: '100%' }}
                    >
                      Project
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Modal
              centered
              open={modalVisible}
              onCancel={() => {
                onCancel()
              }}
              width={800}
              footer={null}
              closeIcon={null}
              destroyOnClose={true}
              maskClosable={false}
            >
              {offeringType === 'fix' ? (
                <FixOfferingForm
                  onCancel={() => onCancel()}
                  editId={editId!}
                  transactionForm={form}
                />
              ) : offeringType === 'gift' ? (
                <GiftOfferingForm
                  onCancel={() => onCancel()}
                  editId={editId!}
                  transactionForm={form}
                />
              ) : (
                <ProjectOfferingForm
                  onCancel={() => onCancel()}
                  editId={editId!}
                  transactionForm={form}
                />
              )}
            </Modal>
            <Space direction="vertical" size={20} style={{ display: 'flex' }}>
              <Row gutter={[5, 5]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <FixOfferingList
                    transactionForm={form}
                    setModalVisible={setModalVisible}
                    setEditId={setEditId}
                    setOfferingType={setOfferingType}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <GiftOfferingList
                    transactionForm={form}
                    setModalVisible={setModalVisible}
                    setEditId={setEditId}
                    setOfferingType={setOfferingType}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <ProjectOfferingList
                    transactionForm={form}
                    setModalVisible={setModalVisible}
                    setEditId={setEditId}
                    setOfferingType={setOfferingType}
                  />
                </Col>
              </Row>
            </Space>
            <Space direction="vertical" size={20} style={{ display: 'flex' }}>
              <Row>
                <Col span={24}>
                  <MzkUploadFile transactionForm={form} paramsId={paramsId} />
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
            </Space>
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
