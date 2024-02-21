import { UserResponse } from '../../../api/user/response'
import { ColumnType } from 'antd/es/table'
import { DeleteOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import { useService } from '../../../service/service'
import { useTranslation } from 'react-i18next'

const useAntdUserTableData = ({ onDelete }: { onEdit: any; onDelete: any }) => {
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
      width: 100,
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

export default useAntdUserTableData
