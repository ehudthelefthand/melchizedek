import { Button, Col, Modal, Row, Skeleton, Space, Spin } from 'antd'
import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UserTableView from './components/TableView'
import useUserList from './hook/useUserList'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import useAntdUserTableData from './hook/useAntdComponent'
import useUploadFile from '../../hooks/uploadFile/useUploadFile'
import { useService } from '../../service/service'
import Search from 'antd/es/input/Search'

function UserListPage() {
  const [t] = useTranslation('translation')
  const formData = new FormData()

  const services = useService()
  const {
    isMobile,
    onEdit,
    onDelete,
    isProcess,
    isLoading,
    userList,
    handleTableChange,
    pagination,
    totalItems,
    handleSearch,
  } = useUserList()
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
  } = useUploadFile({
    formData: formData,
    callback: () => services.api.user.importFile(formData),
  })

  const { userColumns } = useAntdUserTableData({
    onDelete: (id: string) => onDelete(id),
    onEdit: (id: string) => onEdit(id),
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
          <Row gutter={[16, 16]}>
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
              <Link to={'/user/create'}>
                <Button
                  size="large"
                  type="primary"
                  style={{ width: isMobile ? '100%' : '' }}
                  className="btn-primary"
                >
                  {t('transacButton.addStaff')}
                </Button>
              </Link>
            </Col>
          </Row>
        </Row>
        <Modal
          /* TODO: translation */
          title={<h2>กรุณาเลือกไฟล์ Excel ของผู้ใช้</h2>}
          centered
          open={modalVisible}
          footer={false}
          closeIcon={true}
          onCancel={() => onCancel()}
          destroyOnClose={true}
        >
          <UploadFileExcel
            props={props}
            error={error}
            handleUpload={handleUpload}
            file={fileList[0]}
            setError={setError}
          />
        </Modal>
        {/* //TODO: mobile ยังไม่พร้อม */}
        {!isMobile && (
          <UserTableView
            data={userColumns}
            userList={userList}
            isLoading={isLoading}
            handleTableChange={handleTableChange}
            pagination={pagination}
            totalItems={totalItems}
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

export default UserListPage
