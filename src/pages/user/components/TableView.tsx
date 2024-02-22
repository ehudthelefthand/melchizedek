import { Skeleton, Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table'
import { UserResponse } from '../../../api/user/response'
import { PageResponse } from '../../../constants/api'

function UserTableView({
  data,
  userList,
  isLoading,
  handleTableChange,
  pagination,
  totalItems,
}: {
  data: ColumnsType<UserResponse> | undefined
  userList: UserResponse[] | []
  isLoading: boolean
  handleTableChange: TableProps<UserResponse>['onChange']
  pagination: PageResponse
  totalItems: number
}) {
  return isLoading ? (
    <Skeleton active />
  ) : (
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
