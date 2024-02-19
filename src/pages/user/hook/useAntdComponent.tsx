// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import { Space } from 'antd'
// import { ColumnType } from 'antd/es/table'
// import { UserResponse } from '../../../api/user/response'
// import { MouseEventHandler } from 'react'

import { UserResponse } from '../../../api/user/response'
import { ColumnType } from 'antd/es/table'
import { DeleteOutlined } from '@ant-design/icons'
import { Space } from 'antd'

const useAntdUserTableData = ({ onDelete }: { onEdit: any; onDelete: any }) => {
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
      title: 'รหัสผ่าน',
      key: 'password',
      dataIndex: 'password',
      width: 20,
      align: 'left',
    },
    {
      title: 'แผนก',
      key: 'departmentId',
      dataIndex: 'departmentId',
      width: 10,
      align: 'left',
      // TODO: เอาชื่อผู้ถวายมาแสดง
      // render: (value: UserResponse) =>
      //   service.metadatums.getDepartment(value.departmentId).name,
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
            onClick={() => onDelete(userResponse.id)}
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
