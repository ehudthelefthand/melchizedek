import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import './transactionFormPage.css'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import BasicForm from './components/BasicForm'
import MzkUploadFile from './components/MzkUploadFile'
import { TransactionForm } from './model/transaction'
import { TransactionFixOfferingForm } from './model/fixOffering'
import { TransactionGiftOfferingForm } from './model/giftOffering'
import { TransactionProjectOfferingForm } from './model/projectOffering'
import { useService } from '../../../service/service'
import {
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from '../../../api/transaction/request/transaction'
import FixOfferingList from './components/FixOfferingList'
import FixOfferingForm from './components/FixOffering'
import GiftOfferingForm from './components/GiftOffering'
import ProjectOfferingForm from './components/ProjectOffering'
import GiftOfferingList from './components/GiftOfferingList'
import ProjectOfferingList from './components/ProjectOfferingList'
import { calculateOffering } from './utils/calculateOffering'
import { EvidenceDeleteRequest } from '../../../api/transaction/request/image'
import { LoadingOutlined } from '@ant-design/icons'
import {
  createEditedTransactionForm,
  createNewTransaction,
  createTransadtionForm,
} from './utils/transactions/transactionForm'

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
        .then(async (transaction) => {
          const transactionResponse: TransactionForm =
            await createTransadtionForm(transaction, service)
          form.setFieldsValue(transactionResponse)
        })
        .catch((error: Error) => {
          console.error(error)
          message.error('Update Fail!')
          navigate('/transaction')
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const onSubmit = async (transaction: TransactionForm) => {
    setIsLoading(true)

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

      const transactionEdited: TransactionUpdateRequest =
        createEditedTransactionForm({
          paramsId,
          fixOfferings,
          giftOfferings,
          projectOfferings,
          transaction,
        })

      if (transactionEdited || transactionEdited != null) {
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

            throw new Error(error.message)
          })
          .finally(() => setIsLoading(false))
      }
    } else {
      const formData = new FormData()
      images.forEach((image: File) => {
        formData.append('photo', image)
      })
      const transactionCreated: TransactionCreateRequest = createNewTransaction(
        { fixOfferings, giftOfferings, projectOfferings, transaction }
      )

      if (transactionCreated || transactionCreated != null) {
        console.log(transactionCreated)
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
          .finally(() => setIsLoading(false))
      }
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
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Skeleton active />
        </Spin>
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
