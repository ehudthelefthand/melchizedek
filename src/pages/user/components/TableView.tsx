import { Skeleton, Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import useUser from '../hook/useUserList'
import { UserResponse } from '../../../api/user/response'


function UserTableView() {
  const user = useUser()
  const { userList, isLoading, handleTableChange, pagination, totalItems } =
    user

  // TODO: แปลภาษา
  const columns: ColumnType<UserResponse>[] = [
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
      width: 10,
      align: 'left',
    },
    {
      title: 'ชื่อภาษาอังกฤษ',
      key: 'fullNameEN',
      dataIndex: 'fullNameEN',
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
      width: 10,
      align: 'left',
    },
    {
      title: 'แผนก',
      key: 'department',
      dataIndex: 'department',
      width: 10,
      align: 'left',
    },
    {
      title: 'บทบาท',
      key: 'role',
      dataIndex: 'role',
      width: 10,
      align: 'left',
    },
  ]

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Table
      loading={isLoading}
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={userList}
      pagination={{
        pageSize: pagination.itemsPerPage,
        current: pagination.current,
        total: totalItems,
        showSizeChanger: true,
        pageSizeOptions: [20, 40, 80, 100],
      }}
      onChange={handleTableChange}
    />
  )
}

export default UserTableView
