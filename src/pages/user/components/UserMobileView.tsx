import { List, Skeleton } from "antd"
import { UserResponse } from "../../../api/user/response"
import { PageResponse } from "../../../constants/api"


function UserMobileView(
  {
    userItems,
    userList,
    isLoading,
    pagination,
    totalItems,
    handlePageChange,
  }: {
    userItems: any
    userList: UserResponse[] | []
    isLoading: boolean
    pagination: PageResponse
    totalItems: number
    handlePageChange: (page: number) => void
  }
) {
  return isLoading ? (
    <Skeleton active />
  ) : (
    <List
      grid={{
        gutter: [10, 10],
        xs: 1,
        sm: 1,
        md: 2,
      }}
      itemLayout='vertical'
      loading={isLoading}
      renderItem={userItems}
      dataSource={userList}
      pagination={{
        current: pagination.current,
        pageSize: pagination.itemsPerPage,
        total: totalItems,
        onChange: handlePageChange,
      }}
    />
  )
}

export default UserMobileView
