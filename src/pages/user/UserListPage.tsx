import { Button, Col, Modal, Row, Skeleton, Space, Spin, message } from 'antd'
import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import UserTableView from './components/TableView'
import useUserList from './hook/useUserList'
import UploadFileExcel from '../../components/UploadFileXcel'
import FullScreenLoading from '../../components/FullScreenLoading'
import useDonorUploadFile from '../donor/hook/useDonorUploadFile'
import useAntdUserTableData from './hook/useAntdComponent'
import { useService } from '../../service/service'
import { useState } from 'react'

function UserListPage() {
  const { isLoading } = useUserList()
  const {
    props,
    isDonorUploadLoading,
    handleUpload,
    fileList,
    modalVisible,
    onOpen,
    onCancel,
  } = useDonorUploadFile()
  const navigate = useNavigate()
  const service = useService()

  const [isProcess, setProcess] = useState<boolean>(false)

  const onEdit = (id: string) => {
    navigate(`/user/edit/${id}`)
  }

  const onDelete = async (id: string) => {
    try {
      setProcess(true)
      const result = await service.api.user.delete(id)

      if (result) {
        message.success(`Delete the user ${id} successfully!`)
      }
    } catch (error) {
      message.error(`Fail to delete the user ${id}!`)
    } finally {
      setProcess(false)
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { userColumns } = useAntdUserTableData({
    onDelete: (id: string) => onDelete(id),
    onEdit: (id: string) => onEdit(id),
  })

  const [t] = useTranslation('translation')

  if (isLoading || isProcess) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        <Skeleton active />
      </Spin>
    )
  }

  return (
    <>
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
          <UploadFileExcel
            props={props}
            handleUpload={handleUpload}
            fileList={fileList}
          />
        </Modal>
        {/* //TODO: mobile ยังไม่พร้อม */}
        {!isMobile && <UserTableView data={userColumns} />}
        {isDonorUploadLoading && (
          <FullScreenLoading spinning={isDonorUploadLoading} />
        )}
      </Space>
    </>
  )
}

export default UserListPage
