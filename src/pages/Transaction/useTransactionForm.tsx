import { createContext, useContext, useState } from 'react'
import { OfferingAPI } from '../../api/transactionapi'

export const initialForm: OfferingAPI[] = [
  {
    id: 0,
    staffName: '',
    department: '',
    kind: '',
    amount: 0,
    projectName: '',
    startDate: '',
    dueDate: '',
    descriptions: '',
  },
]

export const offeringFormContext = createContext({
  // ค่าเริ่มต้น
  data: initialForm,
  setData: (_: OfferingAPI) => {},
})

//  สร้างก้อนข้อมูล
export function useTransactionFormProvider() {
  const [transactionForm, setTransactionForm] = useState(initialForm)

  //   เศษซากอารยธรรม   const TransactionFormProvider = useMemo(() => (props: PropsWithChildren<{}>) => (
  //       <transactionFormContext.Provider value={{
  //           transactionForm,
  //           setTransactionForm,
  //       }}>
  //           {props.children}
  //       </transactionFormContext.Provider>
  //     ), [])

  return {
    data: transactionForm,
    setData: setTransactionForm,
    offeringFormContext,
  }
}

export function useTransactionForm() {
  return useContext(offeringFormContext)
}
