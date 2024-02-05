import { TransactionReportResponse } from '../../../api/transaction/response/report'

export function getLinkReport(res: TransactionReportResponse) {
  console.log(`url: ${res.fileName}`)
  // service.api.transaction.getLinkReport(service.reactStore.store, url)
}
