import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Skeleton, Space, Spin } from 'antd'
import { Link } from 'react-router-dom'
import MzkUploadFileExcel from '../../components/UploadFileXcel'
import UserTableView from '../user/components/TableView'
import useDonorList from './hook/useDonorList'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import useDonorUploadFile from './hook/useDonorUploadFile'

function DonorListPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const donor = useDonorList()
  const { isLoading } = donor
  const useUploadFile = useDonorUploadFile()
  const { onOpen, onCancel, modalVisible } = useUploadFile

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
                  <Link to={'/user/create'}>
                    <Button
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
            <MzkUploadFileExcel onCancel={onCancel} />
          </Modal>

          {/* //TODO: mobile ยังไม่พร้อม */}
          {isMobile ? <></> : <UserTableView />}
        </Space>
      )}
    </>
  )
}

export default DonorListPage
