import { useEffect, useState } from 'react'
import { UserResponse } from '../../../api/user/response'
import { useService } from '../../../service/service'
import { initialPagination } from '../../../constants/api'
import { TableProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { debounce } from '../../../service/debounce'

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
  const [isLoading, setIsloading] = useState(false)
  const [search, setSearch] = useState<string>('')

  const handleTableChange: TableProps<UserResponse>['onChange'] = (
    pagination
  ) => {
    setPagination({
      current: pagination.current ?? initialPagination.currentPage,
      itemsPerPage: pagination.pageSize ?? initialPagination.itemsPerPage,
    })
  }

  useEffect(() => {
    setIsloading(true)
    service.api.user
      .getAll(
        {
          currentPage: pagination.current,
          itemsPerPage: pagination.itemsPerPage,
        },
        search
      )
      .then((user) => {
        setTotalItems(user.totalItems)
        setUserList(user.data)
      })
      .catch((err) => {
        console.error(err)
        setUserList([])
        throw new Error(err)
      })
      .finally(() => setIsloading(false))
  }, [pagination, search])

  const handleSearch = async (fullName: string) => {
    return debounce(await onSearch(fullName), 3000)
  }

  const onSearch = (fullName: string) => {
    setSearch(fullName)
  }

  const onEdit = (id: string) => {
    navigate(`/user/edit/${id}`)
  }

  const onDelete = async (id: string) => {
    try {
      setProcess(true)
      const result = await service.api.user.delete(id)

      if (result) {
        message.warning(`Delete the user ${id} successfully!`)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
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
    handleSearch,
  }
}

export default useUserList
