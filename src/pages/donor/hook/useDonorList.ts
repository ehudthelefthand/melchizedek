import { useEffect, useState } from 'react'
import { DonorListResponse } from '../../../api/donor/response'
import { TableProps, message } from 'antd'
import { initialPagination } from '../../../constants/api'
import { useService } from '../../../service/service'
import { useMediaQuery } from 'react-responsive'
import { debounce } from '../../../service/debounce'

const useDonorList = () => {
  const service = useService()

  const [isProcess, setIsProcess] = useState<boolean>(false)
  const [donorList, setDonorList] = useState<DonorListResponse[]>([])
  const [search, setSearch] = useState<string>('')
  const [pagination, setPagination] = useState({
    current: initialPagination.currentPage,
    itemsPerPage: initialPagination.itemsPerPage,
  })
  const [totalItems, setTotalItems] = useState(initialPagination.totalItems)
  const [isLoading, setIsloading] = useState(false)

  const handleTableChange: TableProps<DonorListResponse>['onChange'] = (
    pagination
  ) => {
    setPagination({
      current: pagination.current ?? initialPagination.currentPage,
      itemsPerPage: pagination.pageSize ?? initialPagination.itemsPerPage,
    })
  }

  useEffect(() => {
    setIsloading(true)
    service.api.donor
      .getAll(
        {
          currentPage: pagination.current,
          itemsPerPage: pagination.itemsPerPage,
        },
        search
      )
      .then((donor) => {
        setTotalItems(donor.totalItems)
        setDonorList(donor.data)
      })
      .catch((err) => {
        console.error(err)
        setDonorList([])
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [pagination, search])

  const handleSearch = async (fullName: string) => {
    return debounce(await onSearch(fullName), 3000)
  }

  const onSearch = async (fullName: string) => {
    setSearch(fullName)
  }

  const onDelete = async (id: string) => {
    try {
      setIsProcess(true)
      const result = await service.api.donor.delete(id)
      if (result) {
        message.success(`Delete the donor ${id} successfully!`)
        window.location.reload()
      }
    } catch (error) {
      message.error(`Fail to delete the donor ${id}!`)
    } finally {
      setIsProcess(false)
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return {
    isMobile,
    donorList,
    isLoading,
    pagination,
    totalItems,
    handleTableChange,
    onDelete,
    isProcess,
    handleSearch,
  }
}

export default useDonorList
