import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile, UploadProps } from 'antd'
import { MouseEventHandler } from 'react'

function UploadFileExcel({
  props,
  handleUpload,
  fileList,
}: {
  props:UploadProps<any>
  handleUpload: MouseEventHandler<HTMLElement>
  fileList: UploadFile<any>[]
  
}) {
  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Upload File
      </Button>
    </>
  )
}

export default UploadFileExcel
