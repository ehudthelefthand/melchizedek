import { message } from "antd"
import { useService } from "../../service/service"
import { useTranslation } from "react-i18next"

const useTransaction = () => {
   const service = useService()
   const [t] = useTranslation()

   const onDelete = (
      id: number
   ) => {
      service.api.transaction
         .delete(id)
         .then(() => {
            message.success(`${t('transacMessage.deleteSuccess')}`)
            window.location.reload()
         })
         .catch(() => {
            message.error(`${t('transacMessage.deleteFail')}`)
         })
   }

   return {
      onDelete
   }
}

export default useTransaction
