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

export function createEditedTransactionForm({
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
