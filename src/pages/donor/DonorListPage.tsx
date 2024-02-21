import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Select, Skeleton, Space, Spin } from 'antd'
import { Link } from 'react-router-dom'
import useDonorList from './hook/useDonorList'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import DonorTableView from './components/TableView'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import useUploadFile from '../../hooks/uploadFile/useUploadFile'
import { useService } from '../../service/service'
import { initialRegion } from '../../constants/api'

function DonorListPage() {
  const formData = new FormData()

  const services = useService()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const [t] = useTranslation('translation')
  const { isLoading } = useDonorList()
  const {
    props,
    error,
    isUploading,
    handleUpload,
    fileList,
    modalVisible,
    onOpen,
    onCancel,
    setError,
    onSelectDepartment,
  } = useUploadFile({
    formData: formData,
    callback: (formData) => services.api.donor.importFile(formData),
  })

  return (
    <>
      {isLoading ? (
        <>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <Skeleton active />
          </Spin>
        </>
      ) : (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Row justify={'end'} gutter={8}>
                <Col
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    size="large"
                    style={{
                      width: isMobile ? '100%' : '',
                    }}
                    onClick={() => onOpen()}
                  >
                    {/* TODO: translation */}
                    <FileAddOutlined /> Import
                  </Button>
                </Col>
                <Col>
                  <Link to={'/donor/create'}>
                    <Button
                      disabled
                      size="large"
                      type="primary"
                      style={{ width: isMobile ? '100%' : '' }}
                      className="btn-primary"
                    >
                      {t('transacButton.addDonor')}
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            /* TODO: translation */
            title={<h2>กรุณาเลือกไฟล์ Excel</h2>}
            centered
            open={modalVisible}
            footer={false}
            closeIcon={true}
            onCancel={() => onCancel()}
            destroyOnClose={true}
          >
            <Row
              style={{
                justifyContent: 'center',
              }}
            >
              <Select
                placeholder={'ภูมิภาค'}
                style={{
                  width: (window.innerWidth * 45) / 100,
                  marginTop: 6,
                  marginBottom: 6,
                }}
                onChange={onSelectDepartment}
                options={initialRegion}
              />
            </Row>

            <Col
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UploadFileExcel
                props={props}
                error={error}
                handleUpload={handleUpload}
                file={fileList[0]}
                setError={setError}
              />
            </Col>
          </Modal>
          {/* //TODO: mobile ยังไม่พร้อม */}
          {!isMobile && <DonorTableView />}
          {isUploading && <FullScreenLoading spinning={isUploading} />}
        </Space>
      )}
    </>
  )
}

export default DonorListPage
