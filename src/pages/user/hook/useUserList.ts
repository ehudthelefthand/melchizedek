import { useEffect, useState } from 'react'
import { UserResponse } from '../../../api/user/response'
import { useService } from '../../../service/service'
import { initialPagination } from '../../../constants/api'
import { TableProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const useUserList = () => {
  const service = useService()
  const navigate = useNavigate()

  const [isProcess, setProcess] = useState<boolean>(false)
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

  return {
    isMobile,
    onEdit,
    onDelete,
    isProcess,
    userList,
    pagination,
    totalItems,
    isLoading,
    handleTableChange,
  }
}

export default useUserList
