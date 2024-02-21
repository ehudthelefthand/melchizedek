import { GetProp, message } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload'
import { useState } from 'react'

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const useUploadFile = ({
  formData,
  callback,
}: {
  formData: FormData
  callback: (formData: FormData) => Promise<any>
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const onOpen = () => setModalVisible(true)
  const onCancel = () => setModalVisible(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [isUploading, setUploading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const onSelectDepartment = (value: string) => {
    console.log(value)
    setSelectedDepartment(value.toString())
  }

  const handleUpload = async () => {
    setUploading(true)

    formData.append('department', selectedDepartment)

    fileList.forEach((file: any) => {
      formData.append('file', file as FileType)
    })

    console.log('new formData file', formData.get('file'))
    console.log('new formData department', formData.get('department'))

    return (
      callback &&
      callback(formData)
        .then((response) => {
          response
          message.success('Success')
          setFileList([])
          window.location.reload()
        })
        .catch((err) => {
          console.error(err), message.error('Upload Fail')
        })
        .finally(() => {
          onCancel(), setUploading(false)
        })
    )
  }

  const props: UploadProps = {
    onRemove: () => {
      setFileList([])
      setError('')
    },
    beforeUpload: (file) => {
      setFileList([file])
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
    error,
    setError,
    modalVisible,
    isUploading,
    setUploading,
    onSelectDepartment,
  }
}
export default useUploadFile
