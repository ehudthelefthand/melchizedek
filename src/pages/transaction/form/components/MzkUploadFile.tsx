import { PropsWithChildren, useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import type { FormInstance, GetProp, UploadProps } from 'antd'
import { Modal, Upload, UploadFile } from 'antd'
import { TransactionForm } from '../model/transaction'

const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

function MzkUploadFile(
  mzkProps: PropsWithChildren<{
    transactionForm: FormInstance<TransactionForm>
    paramsId: string | undefined
  }>
) {
  const { transactionForm, paramsId } = mzkProps
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [deletedImages, setDeletedImages] = useState<string[]>([])

  useEffect(() => {
    if (paramsId) {
      const currentImage = transactionForm.getFieldValue('imagesName')
      const fileListFromImages = currentImage.map(
        (imageName: string, index: number) => ({
          uid: index.toString(),
          name: `${imageName}`,
          status: 'done',
          url: `${baseURL}/image/${imageName}`,
        })
      )

      setFileList(fileListFromImages)
    }
  }, [])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const props: UploadProps = {
    fileList,
    listType: 'picture-card',
    multiple: true,
    onRemove: (file: UploadFile<any>) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)

      transactionForm.setFieldValue(
        'images',
        newFileList.map((file) => file.originFileObj)
      )

      if (paramsId) {
        const currentImage: string[] =
          transactionForm.getFieldValue('imagesName')
        const selectedImage = currentImage.find((_, id) => id === index)

        if (selectedImage) {
          setDeletedImages([...deletedImages, selectedImage])
        }
      }
    },

    beforeUpload: (file, allFile) => {
      if (paramsId) {
        setFileList([...fileList, file])
        const newImages = transactionForm.getFieldValue('newImages')
        transactionForm.setFieldValue('newImages', [...newImages, ...allFile])
      } else {
        setFileList([...fileList, file])
        const images = transactionForm.getFieldValue('images')
        transactionForm.setFieldValue('images', [...images, ...allFile])
      }
      return false
    },
    onChange: handleChange,
    onPreview: handlePreview,
  }

  transactionForm.setFieldValue('imagesDelete', deletedImages)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <>
      <Upload {...props}>{uploadButton}</Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="evidence" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default MzkUploadFile
