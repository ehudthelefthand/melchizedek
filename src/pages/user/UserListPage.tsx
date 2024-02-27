import { Button, Col, Modal, Row, Skeleton, Space, Spin, Typography } from 'antd'
import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UserTableView from './components/TableView'
import useUserList from './hook/useUserList'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import { useAntdUserListData, useAntdUserTableData } from './hook/useAntdComponent'
import useUploadFile from '../../hooks/uploadFile/useUploadFile'
import { useService } from '../../service/service'
import Search from 'antd/es/input/Search'
import UserMobileView from './components/UserMobileView'

function UserListPage() {
  const [t] = useTranslation('translation')
  const formData = new FormData()
  const { Text } = Typography

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
    handleListChange,
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

  const { userItems } = useAntdUserListData({
    onDelete: (id: string) => onDelete(id),
  })

  const { userColumns } = useAntdUserTableData({
    onDelete: (id: string) => onDelete(id),
    onEdit: (id: string) => onEdit(id),
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
                <Link to={'/user/create'} style={{ width: isMobile ? '100%' : undefined }}>
                  <Button
                    size="large"
                    type="primary"
                    style={{ width: isMobile ? '100%' : undefined }}
                    className="btn-primary"
                  >
                    <Text style={{ color: 'white' }}>{t('transacButton.addStaff')}</Text>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
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
        {isMobile && (
          <UserMobileView
            userItems={userItems}
            userList={userList}
            isLoading={isLoading}
            pagination={pagination}
            totalItems={totalItems}
            handlePageChange={handleListChange}
          />
        )}

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
