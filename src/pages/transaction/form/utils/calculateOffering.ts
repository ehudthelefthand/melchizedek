import { FormInstance } from "antd";
import { TransactionForm } from "../model/transaction";
import { TransactionFixOfferingForm } from "../model/fixOffering";
import { TransactionGiftOfferingForm } from "../model/giftOffering";
import { TransactionProjectOfferingForm } from "../model/projectOffering";

export type CalulationOfferingResult = {
    entireAmount: number,
    leftAmount: number,
    remainingAmount: number,
}

export const calculateOffering = (transactionForm:  FormInstance<TransactionForm>, usageAmount: number, currentAmount: number): CalulationOfferingResult => {
    const entireAmount = Number(transactionForm.getFieldValue('amount'))

    const reductionAmount = usageAmount - currentAmount

    const entireFixAmount = (transactionForm.getFieldValue('fixOfferings') as TransactionFixOfferingForm[]).reduce((sum, fix) => sum + Number(fix.amount) , 0)
    const entireGiftAmount = (transactionForm.getFieldValue('giftOfferings') as TransactionGiftOfferingForm[]).reduce((sum, gift) => sum + Number(gift.amount) , 0)
    const entireProjectAmount = (transactionForm.getFieldValue('projectOfferings') as TransactionProjectOfferingForm[]).reduce((sum, project) => sum + Number(project.amount) , 0)
    const offeringAmount = entireFixAmount + entireGiftAmount + entireProjectAmount

    const leftAmount = entireAmount - offeringAmount

    return {
        entireAmount,
        leftAmount,
        remainingAmount: leftAmount - reductionAmount
    }
}