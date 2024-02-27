import { UserResponse } from '../../../api/user/response'
import { ColumnType } from 'antd/es/table'
import { DeleteOutlined, MinusOutlined, PartitionOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Col, List, Modal, Row, Space, Typography } from 'antd'
import { useService } from '../../../service/service'
import { useTranslation } from 'react-i18next'

// Antd Table for user
export const useAntdUserTableData = ({ onDelete }: { onEdit: any; onDelete: any }) => {
  const service = useService()
  const [t] = useTranslation('translation')

  const userColumns: ColumnType<UserResponse>[] = [
    {
      title: '#',
      key: 'id',
      dataIndex: 'id',
      width: 10,
      align: 'center',
    },
    {
      title: 'ชื่อภาษาไทย',
      key: 'fullNameTH',
      dataIndex: 'fullNameTH',
      width: 150,
      align: 'left',
    },
    {
      title: 'ชื่อภาษาอังกฤษ',
      key: 'fullNameEN',
      dataIndex: 'fullNameEN',
      width: 200,
      align: 'left',
    },
    {
      title: 'ชื่อเล่น',
      key: 'nickName',
      dataIndex: 'nickName',
      width: 10,
      align: 'left',
    },
    {
      title: 'ชื่อผู้ใช้',
      key: 'userName',
      dataIndex: 'userName',
      width: 10,
      align: 'left',
    },

    {
      title: 'แผนก',
      key: 'departmentId',
      dataIndex: 'departmentId',
      width: 10,
      align: 'left',
      render: (id: number) => service.metadatums.getDepartment(id).name,
    },
    {
      title: 'บทบาท',
      key: 'role',
      dataIndex: 'role',
      width: 10,
      align: 'left',
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 20,
      align: 'center',
      render: (userResponse: UserResponse) => (
        <Space size={'large'} key={userResponse.id}>
          {/* <EditOutlined
            onClick={() => onEdit(userResponse.id)}
            style={{ cursor: 'pointer', color: '#2196F3', fontSize: 20 }}
          /> */}
          <DeleteOutlined
            onClick={() =>
              Modal.confirm({
                title: `${t('transacMessage.confirmDelete')}`,
                centered: true,
                width: 400,
                onOk() {
                  onDelete(userResponse.id)
                },
              })
            }
            style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
          />
        </Space>
      ),
    },
  ]

  return {
    userColumns,
  }
}

// Antd List for user
export const useAntdUserListData = ({ onDelete }: { onDelete: any }) => {
  const service = useService()
  const { t } = useTranslation()
  const { Text } = Typography

  const userItems = (user: UserResponse) => {
    return (
      <List.Item
        key={user.id}
      >
        <Card
          title={user.nickName}
          extra={<Text>{user.role}</Text>}
          actions={[
            <DeleteOutlined
              onClick={() =>
                Modal.confirm({
                  title: `${t('transacMessage.confirmDelete')}`,
                  centered: true,
                  width: 400,
                  onOk() {
                    onDelete(user.id)
                  },
                })
              }
              style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
            />
          ]}
        >
          <Row gutter={[0, 10]}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {user.fullNameTH === undefined && (
                <Text><MinusOutlined /></Text>
              )}
              {user.fullNameTH !== undefined && (
                <Space>
                  <SolutionOutlined />
                  <Text>{user.fullNameTH}</Text>
                </Space>
              )}
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {user.fullNameEN === '' && (
                <Text><MinusOutlined /></Text>
              )}
              {user.fullNameEN !== '' && (
                <Space>
                  <SolutionOutlined />
                  <Text>{user.fullNameEN}</Text>
                </Space>
              )}
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <UserOutlined />
                <Text>{user.userName}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <PartitionOutlined />
                <Text>{service.metadatums.getDepartment(user.departmentId).name}</Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </List.Item>
    )
  }

  return { userItems }
}