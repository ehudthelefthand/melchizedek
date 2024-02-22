import dayjs from 'dayjs'
import { TransactionFixOfferingResponse } from '../../../../../api/transaction/response/fixOffering'
import { TransactionGiftOfferingResponse } from '../../../../../api/transaction/response/giftOffering'
import { TransactionProjectOfferingResponse } from '../../../../../api/transaction/response/projectOffering'
import { TransactionFixOfferingForm } from '../../model/fixOffering'
import { TransactionGiftOfferingForm } from '../../model/giftOffering'
import { TransactionProjectOfferingForm } from '../../model/projectOffering'
import { TransactionForm } from '../../model/transaction'
import {
  TransactionFixOfferingCreateRequest,
  TransactionFixOfferingUpdateRequest,
} from '../../../../../api/transaction/request/fixOffering'
import {
  TransactionGiftOfferingCreateRequest,
  TransactionGiftOfferingUpdateRequest,
} from '../../../../../api/transaction/request/giftOffering'
import {
  TransactionProjectOfferingCreateRequest,
  TransactionProjectOfferingUpdateRequest,
} from '../../../../../api/transaction/request/projectOffering'
import {
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from '../../../../../api/transaction/request/transaction'
import {
  PageTransactionResponse,
  TransactionResponse,
} from '../../../../../api/transaction/response/transaction'
import { TransactionFixOfferingList } from '../../../list/model/fixOffering'
import { TransactionGiftOfferingList } from '../../../list/model/giftOffering'
import { TransactionProjectOfferingList } from '../../../list/model/projectOffering'
import { TransactionList } from '../../../list/model/transaction'

export function createTransadtionForm(
  transaction: any,
  service: any
): TransactionForm {
  return {
    id: transaction.id,
    staffId: service.metadatums.getStaff(transaction.staffId).id,
    donorId: service.metadatums.getDonor(transaction.donorId).id,
    departmentId: service.metadatums.getDepartment(transaction.departmentId).id,
    toBankId: service.metadatums.getBank(transaction.toBankId).id,
    fromBankId: service.metadatums.getBank(transaction.fromBankId).id,
    amount: transaction.amount.toString(),
    transferDate: dayjs(transaction.transferDate),
    images: [],
    imagesName: transaction.images,
    descriptions: transaction.descriptions,
    fixOfferings: transaction.fixOfferings.map(
      (fixOffering: TransactionFixOfferingResponse) => {
        const fix: TransactionFixOfferingForm = {
          id: fixOffering.id,
          startMonth: dayjs(fixOffering.startMonth),
          dueMonth: dayjs(fixOffering.dueMonth),
          staffId: service.metadatums.getStaff(fixOffering.staffId).id,
          departmentId: service.metadatums.getDepartment(
            fixOffering.departmentId
          ).id,
          amount: fixOffering.amount,
        }
        return fix
      }
    ),
    giftOfferings: transaction.giftOfferings.map(
      (giftOffering: TransactionGiftOfferingResponse) => {
        const gift: TransactionGiftOfferingForm = {
          id: giftOffering.id,
          staffId: service.metadatums.getStaff(giftOffering.staffId).id,
          departmentId: service.metadatums.getDepartment(
            giftOffering.departmentId
          ).id,
          amount: giftOffering.amount,
          transferDate: dayjs(giftOffering.transferDate),
        }
        return gift
      }
    ),
    projectOfferings: transaction.projectOfferings.map(
      (projectOffering: TransactionProjectOfferingResponse) => {
        const project: TransactionProjectOfferingForm = {
          id: projectOffering.id,
          staffId: service.metadatums.getStaff(projectOffering.staffId).id,
          departmentId: service.metadatums.getDepartment(
            projectOffering.departmentId
          ).id,
          amount: projectOffering.amount,
          date: dayjs(projectOffering.date),
          projectId: service.metadatums.getProject(projectOffering.projectId)
            .id,
          descriptions: projectOffering.descriptions,
        }
        return project
      }
    ),
  }
}

export function editedTransactionForm({
  paramsId,
  fixOfferings,
  giftOfferings,
  projectOfferings,
  transaction,
}: {
  paramsId: string
  fixOfferings: any
  giftOfferings: any
  projectOfferings: any
  transaction: any
}): TransactionUpdateRequest {
  return {
    id: parseInt(paramsId),
    donorId: transaction.donorId!,
    staffId: transaction.staffId!,
    departmentId: transaction.departmentId!,
    toBankId: transaction.toBankId!,
    fromBankId: transaction.fromBankId!,
    amount: parseFloat(transaction.amount),
    descriptions: transaction.descriptions,
    transferDate: +transaction.transferDate!,
    images: transaction.images,
    fixOfferings:
      fixOfferings.length > 0
        ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
            const fix: TransactionFixOfferingUpdateRequest = {
              id: fixOffering.id,
              staffId: fixOffering.staffId,
              departmentId: fixOffering.departmentId,
              startMonth: +fixOffering.startMonth,
              dueMonth: +fixOffering.dueMonth,
              amount: parseFloat(fixOffering.amount.toString()),
              transactionId: parseInt(paramsId),
            }
            return fix
          })
        : [],
    giftOfferings:
      giftOfferings.length > 0
        ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
            const gift: TransactionGiftOfferingUpdateRequest = {
              id: giftOffering.id,
              staffId: giftOffering.staffId,
              departmentId: giftOffering.departmentId,
              transferDate: +giftOffering.transferDate,
              amount: parseFloat(giftOffering.amount.toString()),
              transactionId: parseInt(paramsId),
            }
            return gift
          })
        : [],
    projectOfferings:
      projectOfferings.length > 0
        ? projectOfferings.map(
            (projectOffering: TransactionProjectOfferingForm) => {
              const project: TransactionProjectOfferingUpdateRequest = {
                id: projectOffering.id,
                staffId: projectOffering.staffId,
                departmentId: projectOffering.departmentId,
                date: +projectOffering.date,
                projectId: projectOffering.projectId,
                amount: parseFloat(projectOffering.amount.toString()),
                descriptions: projectOffering.descriptions,
                transactionId: parseInt(paramsId),
              }
              return project
            }
          )
        : [],
  }
}

export function createNewTransaction({
  fixOfferings,
  giftOfferings,
  projectOfferings,
  transaction,
}: {
  fixOfferings: any
  giftOfferings: any
  projectOfferings: any
  transaction: any
}): TransactionCreateRequest {
  return {
    donorId: transaction.donorId!,
    staffId: transaction.staffId!,
    departmentId: transaction.departmentId!,
    toBankId: transaction.toBankId!,
    fromBankId: transaction.fromBankId!,
    amount: parseFloat(transaction.amount),
    descriptions: transaction.descriptions,
    transferDate: +transaction.transferDate!,
    images: transaction.images,
    fixOfferings:
      fixOfferings.length > 0
        ? fixOfferings.map((fixOffering: TransactionFixOfferingForm) => {
            const fix: TransactionFixOfferingCreateRequest = {
              staffId: fixOffering.staffId,
              departmentId: fixOffering.departmentId,
              startMonth: +fixOffering.startMonth,
              dueMonth: +fixOffering.dueMonth,
              amount: parseFloat(fixOffering.amount.toString()),
            }
            return fix
          })
        : [],
    giftOfferings:
      giftOfferings.length > 0
        ? giftOfferings.map((giftOffering: TransactionGiftOfferingForm) => {
            const gift: TransactionGiftOfferingCreateRequest = {
              staffId: giftOffering.staffId,
              departmentId: giftOffering.departmentId,
              transferDate: +giftOffering.transferDate,
              amount: parseFloat(giftOffering.amount.toString()),
            }
            return gift
          })
        : [],
    projectOfferings:
      projectOfferings.length > 0
        ? projectOfferings.map(
            (projectOffering: TransactionProjectOfferingForm) => {
              const project: TransactionProjectOfferingCreateRequest = {
                staffId: projectOffering.staffId,
                departmentId: projectOffering.departmentId,
                date: +projectOffering.date,
                projectId: projectOffering.projectId,
                amount: parseFloat(projectOffering.amount.toString()),
                descriptions: projectOffering.descriptions,
              }
              return project
            }
          )
        : [],
  }
}

export function formatedTransaction(
  pageTransaction: PageTransactionResponse,
  service: any
): TransactionList[] {
  return pageTransaction.data.map((transaction: TransactionResponse) => {
    const result: TransactionList = {
      id: transaction.id,
      donorName: service.metadatums.getDonor(transaction.donorId).fullName,
      amount: transaction.amount.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      transferDate: dayjs(transaction.transferDate),
      toBankCode: service.metadatums.getBank(transaction.toBankId).code,
      fromBankCode: service.metadatums.getBank(transaction.fromBankId).code,
      staffName: service.metadatums.getStaff(transaction.staffId).nickName,
      departmentName: service.metadatums.getDepartment(transaction.departmentId)
        .name,
      descriptions: transaction.descriptions,
      createAt: dayjs(transaction.createAt),

      fixOfferings: transaction.fixOfferings.map((fixOffering) => {
        const fix: TransactionFixOfferingList = {
          id: fixOffering.id,
          staffName: service.metadatums.getStaff(fixOffering.staffId).nickName,
          departmentName: service.metadatums.getDepartment(
            fixOffering.departmentId
          ).name,
          amount: fixOffering.amount,
          startMonth: dayjs(fixOffering.startMonth),
          dueMonth: dayjs(fixOffering.startMonth),
        }

        return fix
      }),
      giftOfferings: transaction.giftOfferings.map((giftOffering) => {
        const gift: TransactionGiftOfferingList = {
          id: giftOffering.id,
          staffName: service.metadatums.getStaff(giftOffering.id).nickName,
          departmentName: service.metadatums.getDepartment(giftOffering.id)
            .name,
          amount: giftOffering.amount,
          transferDate: dayjs(giftOffering.transferDate),
        }

        return gift
      }),
      projectOfferings: transaction.projectOfferings.map((projectOffering) => {
        const project: TransactionProjectOfferingList = {
          id: projectOffering.id,
          staffName: service.metadatums.getStaff(projectOffering.id).nickName,
          departmentName: service.metadatums.getDepartment(projectOffering.id)
            .name,
          amount: projectOffering.amount,
          project: service.metadatums.getProject(projectOffering.id).name,
          date: dayjs(projectOffering.date),
          descriptions: projectOffering.descriptions,
        }
        return project
      }),
      totalOfferings: {
        sumFixOfferings: transaction.totalOfferings.sumFixOfferings,
        sumGiftOfferings: transaction.totalOfferings.sumGiftOfferings,
        sumProjectOfferings: transaction.totalOfferings.sumProjectOfferings,
      },
      images: transaction.images,
    }
    return result
  })
}
