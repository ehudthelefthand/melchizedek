import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Select, Skeleton, Space, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import useDonorList from './hook/useDonorList'
import { useTranslation } from 'react-i18next'
import DonorTableView from './components/TableView'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import useUploadFile from '../../hooks/uploadFile/useUploadFile'
import { useService } from '../../service/service'
import { initialRegion } from '../../constants/api'
import { useAntdDonorListData, useAntdDonorTableData } from './hook/useAntdComponent'
import Search from 'antd/es/input/Search'
import DonorMobileView from './components/DonorMobileView'

function DonorListPage() {
  const formData = new FormData()
  const services = useService()
  const { Text } = Typography

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
    handleListChange
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
  } = useUploadFile({
    formData: formData,
    callback: (formData) => services.api.donor.importFile(formData),
  })

  const { donorItems } = useAntdDonorListData({
    onDelete: (id: string) => onDelete(id),
  })

  const { donorColumns } = useAntdDonorTableData({
    onDelete: (id: string) => onDelete(id),
  })

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Row gutter={[5, 5]}>
          <Col xs={24} sm={24} md={12}>
            <Search
              enterButton
              size="large"
              placeholder={t('transacButton.search')}
              allowClear
              onChange={(e) => handleSearch(e.target.value.toString())}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Row justify={'space-between'} gutter={5}>
              <Col xs={12}>
                <Button
                  size="large"
                  style={{ width: isMobile ? '100%' : undefined }}
                  onClick={() => onOpen()}
                >
                  <Space>
                    <FileAddOutlined />
                    <Text>Import</Text>
                  </Space>
                </Button>
              </Col>
              <Col
                xs={12}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                }}>
                <Link to={'/donor/create'} style={{ width: isMobile ? '100%' : undefined }}>
                  <Button
                    size="large"
                    type="primary"
                    style={{ width: isMobile ? '100%' : undefined }}
                    className="btn-primary"
                  >
                    <Text style={{ color: 'white' }}>{t('transacButton.addDonor')}</Text>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
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
          <Col>
            <UploadFileExcel
              props={props}
              error={error}
              handleUpload={handleUpload}
              file={fileList[0]}
              setError={setError}
            />
          </Col>
        </Modal>
        {isMobile && (
          <DonorMobileView
            donorItems={donorItems}
            donorList={donorList}
            isLoading={isLoading}
            totalItems={totalItems}
            pagination={pagination}
            handlePageChange={handleListChange}
          />
        )}

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
