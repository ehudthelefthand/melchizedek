import { useEffect, useState } from 'react'
import { UserResponse } from '../../../api/user/response'
import { useService } from '../../../service/service'
import { initialPagination } from '../../../constants/api'
import { TableProps } from 'antd'

const useUserList = () => {
  const service = useService()
  const [userList, setUserList] = useState<UserResponse[]>([])
  const [pagination, setPagination] = useState({
    current: initialPagination.currentPage,
    itemsPerPage: initialPagination.itemsPerPage,
  })
  const [totalItems, setTotalItems] = useState(initialPagination.totalItems)
  const [isLoading, setIsloading] = useState(true)

  const handleTableChange: TableProps<UserResponse>['onChange'] = (
    pagination
  ) => {
    setPagination({
      current: pagination.current ?? initialPagination.currentPage,
      itemsPerPage: pagination.pageSize ?? initialPagination.itemsPerPage,
    })
  }

  useEffect(() => {
    service.api.user
      .getAll({
        currentPage: pagination.current,
        itemsPerPage: pagination.itemsPerPage,
      })
      .then((pageUser) => {
        setTotalItems(pageUser.totalItems)
        setUserList(pageUser.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsloading(false))
  }, [pagination])

  return {
    userList,
    pagination,
    totalItems,
    isLoading,
    handleTableChange,
  }
}

export default useUserList
