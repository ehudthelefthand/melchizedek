import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Select, Skeleton, Space, Spin } from 'antd'
import { Link } from 'react-router-dom'
import useDonorList from './hook/useDonorList'
import { useTranslation } from 'react-i18next'
import DonorTableView from './components/TableView'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import useUploadFile from '../../hooks/uploadFile/useUploadFile'
import { useService } from '../../service/service'
import { initialRegion } from '../../constants/api'
import useAntdDonorTableData from './hook/useAntdComponent'
import Search from 'antd/es/input/Search'

function DonorListPage() {
  const formData = new FormData()
  const services = useService()

  const [t] = useTranslation('translation')
  const {
    isMobile,
    onDelete,
    isProcess,
    donorList,
    isLoading,
    handleTableChange,
    pagination,
    totalItems,
    handleSearch,
  } = useDonorList()
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
    statusValue,
  } = useUploadFile({
    formData: formData,
    callback: (formData) => services.api.donor.importFile(formData),
  })

  const { donorColumns } = useAntdDonorTableData({
    onDelete: (id: string) => onDelete(id),
  })

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Row justify={'space-between'}>
          <Col xs={24} sm={24} md={12}>
            <Search
              enterButton
              size="large"
              placeholder={t('transacButton.search')}
              allowClear
              onChange={(e) => handleSearch(e.target.value.toString())}
              style={{ width: ' 100%' }}
            />
          </Col>
          <Row gutter={[14, 14]}>
            <Col xs={12} sm={12} md={12}>
              <Button
                size="large"
                style={{
                  width: isMobile ? '100%' : '',
                }}
                onClick={() => onOpen()}
              >
                <FileAddOutlined /> Import
              </Button>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Link to={'/donor/create'}>
                <Button
                  size="large"
                  type="primary"
                  style={{
                    width: isMobile ? '100%' : '',
                    paddingRight: 8,
                    paddingLeft: 8,
                  }}
                  className="btn-primary"
                >
                  {t('transacButton.addDonor')}
                </Button>
              </Link>
            </Col>
          </Row>
        </Row>
        <Modal
          title={<h2>กรุณาเลือกไฟล์ Excel ของผู้ถวาย</h2>}
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
            {/* TODO: translate */}
            <Select
              placeholder={'เลือกภูมิภาค'}
              style={{
                width: (window.innerWidth * 45) / 100,
                marginTop: 6,
                marginBottom: 6,
              }}
              onChange={onSelectDepartment}
              options={initialRegion}
            />
          </Row>
          <Col>
            <UploadFileExcel
              props={props}
              error={error}
              handleUpload={handleUpload}
              file={fileList[0]}
              setError={setError}
              statusValue={statusValue}
            />
          </Col>
        </Modal>
        {/* //TODO: mobile ยังไม่พร้อม */}

        {!isMobile && (
          <DonorTableView
            data={donorColumns}
            donorList={donorList}
            isLoading={isLoading}
            handleTableChange={handleTableChange}
            totalItems={totalItems}
            pagination={pagination}
          />
        )}
        {isUploading && <FullScreenLoading spinning={isUploading} />}
      </Space>

      {isLoading ||
        (isProcess && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <Skeleton active />
          </Spin>
        ))}
    </>
  )
}

export default DonorListPage
