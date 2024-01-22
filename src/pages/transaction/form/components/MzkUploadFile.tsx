import { FileImageOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
      console.log(info.file.name)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const MzkUploadFile: React.FC = () => {
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <FileImageOutlined />
        </p>
        <p className="ant-upload-text">Upload Image</p>
      </Dragger>
    </>
  )
}

export default MzkUploadFile
