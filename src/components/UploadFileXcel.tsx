import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import useDonorUploadFile from '../pages/donor/hook/useDonorUploadFile'

function UploadFileExcel({ onCancel }: { onCancel: () => void }) {
  const donorForm = useDonorUploadFile()
  const { handleUpload, props, fileList, isLoading } = donorForm

  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={() => {
          handleUpload(), isLoading === true ? isLoading : onCancel()
        }}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Upload File
      </Button>
    </>
  )
}

export default UploadFileExcel
