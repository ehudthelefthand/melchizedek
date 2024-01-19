import { createContext, useContext, useState } from 'react'
import { TransactionFixOfferingForm } from '../../model/model'
import dayjs from 'dayjs'

const initialFixOfferingForm: TransactionFixOfferingForm[] = [
  {
    id: 0,
    staffName: '',
    department: '',
    amount: 0,
    startMonth: dayjs(),
    dueMonth: dayjs(),
  },
]

export const offeringFormContext = createContext({
  // ค่าเริ่มต้น
  data: initialFixOfferingForm,
  setData: (_: TransactionFixOfferingForm) => {},
})

//  สร้างก้อนข้อมูล
export function useOfferingFormProvider() {
  const [offeringForm, setOfferingForm] = useState(initialFixOfferingForm)
  return {
    data: offeringForm,
    setData: setOfferingForm,
    offeringFormContext,
  }
}

export function useOfferingForm() {
  return useContext(offeringFormContext)
}
