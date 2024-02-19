import { Skeleton, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import useUser from '../hook/useUserList'
import { UserResponse } from '../../../api/user/response'
// import { useService } from '../../../service/service'

function UserTableView({
  data,
}: {
  data: ColumnsType<UserResponse> | undefined
}) {
  // const service = useService()
  const user = useUser()
  const { userList, isLoading, handleTableChange, pagination, totalItems } =
    user

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Table
      loading={isLoading}
      columns={data}
      rowKey={(record) => record.id}
      dataSource={userList}
      pagination={{
        pageSize: pagination.itemsPerPage,
        current: pagination.current,
        total: totalItems,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 40, 80, 100],
      }}
      onChange={handleTableChange}
    />
  )
}

export default UserTableView
