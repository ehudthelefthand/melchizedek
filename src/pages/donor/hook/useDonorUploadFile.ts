import { GetProp, message } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload'
import { useState } from 'react'
import { useService } from '../../../service/service'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const useDonorUploadFile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isDonorUploadLoading, setDonorUploadLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const service = useService()

  const isExcelFile = (file: UploadFile<any>) => {
    const excelExtensions = ['.xlsx', '.xls']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    return excelExtensions.includes(`.${fileExtension}`)
  }

  const onOpen = () => setModalVisible(true)
  const onCancel = () => setModalVisible(false)

  function onFinish() {
    setDonorUploadLoading(false)
    setModalVisible(false)
  }

  const handleUpload = async () => {
    try {
      setDonorUploadLoading(true)

      if (fileList.length === 0) {
        message.error('Please upload Excel file!')
        return
      }
      const isExcel = isExcelFile(fileList[0])

      if (!isExcel) {
        setFileList([])
        message.error('You can only upload Excel file!')
        return
      }

      const formData = new FormData()
      fileList.forEach((file: any) => {
        formData.append('file', file as FileType)
      })

      const result = await service.api.donor.importFile(formData)
      result && message.success('Success')
    } catch (error) {
      console.error(error), message.error('Upload Fail')
    } finally {
      onFinish()
    }
  }

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  return {
    props,
    fileList,
    modalVisible,
    isDonorUploadLoading,
    onOpen,
    onCancel,
    handleUpload,
    setModalVisible,
  }
}

export default useDonorUploadFile
