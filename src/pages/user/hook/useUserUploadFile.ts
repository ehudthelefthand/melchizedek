import { GetProp, message } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload'
import { useState } from 'react'
import { useService } from '../../../service/service'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const useUserUploadFile = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const onOpen = () => setModalVisible(true)
  const onCancel = () => setModalVisible(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isUserLoading, setIsUserLoading] = useState(false)
  const service = useService()

  const isExcelFile = (file: UploadFile<any>) => {
    const excelExtensions = ['.xlsx', '.xls']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    return excelExtensions.includes(`.${fileExtension}`)
  }

  const handleUpload = () => {
    setIsUserLoading(true)
    if (fileList.length === 0) {
      message.error('Please upload Excel file!')
      setIsUserLoading(true)
    } else {
      const isExcel = isExcelFile(fileList[0])

      const formData = new FormData()
      fileList.forEach((file: any) => {
        formData.append('file', file as FileType)
      })

      if (!isExcel) {
        setFileList([])
        message.error('You can only upload Excel file!')
      } else {
        service.api.user
          .importFile(formData)
          .then((response) => {
            response
            message.success('Success')
            onCancel
          })
          .catch((err) => {
            console.error(err), message.error('Upload Fail')
          })
          .finally(() => {
            onCancel(), setIsUserLoading(false)
          })
      }
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
    fileList,
    handleUpload,
    props,
    onCancel,
    onOpen,
    modalVisible,
    isUserLoading,
  }
}

export default useUserUploadFile
