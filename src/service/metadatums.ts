import { useEffect, useState } from 'react'
import {
  BankResponse,
  DepartmentResponse,
  DonorResponse,
  MetadatumsResponse,
  ProjectResponse,
  StaffResponse,
} from '../api/metadatum/response'
import { api } from '../api/api'
import { store } from '../store'

let metadatums: MetadatumsResponse = { 
  staffs: [],
  departments: [],
  banks: [],
  donors: [],
  projects: [],
}
export function useCreateMetadatumsService() {
  const [isLoading, setIsLoading] = useState(true)

  // general reload page
  useEffect(() => {
    if (store.user) {
      api.metadatum
        .get()
        .then((value) => {
          metadatums = value
          setIsLoading(false)
        })
        .catch((err) => console.error(err))
    } else {
      setIsLoading(false)
    }
  }, [])

  // when click login button
  const loadMetadatums = () => {
    return api.metadatum
      .get()
      .then((value) => {
        metadatums = value
      })
  }

  const getAllStaffs = (): StaffResponse[] => metadatums.staffs

  const getStaff = (id: number): StaffResponse => {
    let staff = metadatums.staffs.find((staff) => staff.id === id)
    if (!staff) {
      staff = { id: 0, fullName: 'No Data.' }
    }
    return staff
  }

  const getAllDepartments = (): DepartmentResponse[] => metadatums.departments

  const getDepartment = (id: number): DepartmentResponse => {
    let department = metadatums.departments.find(
      (department) => department.id === id
    )
    if (!department) {
      department = { id: 0, name: 'No Data.' }
    }
    return department
  }

  const getAllBanks = (): BankResponse[] => metadatums.banks

  const getBank = (id: number): BankResponse => {
    let bank = metadatums.banks.find((bank) => bank.id === id)
    if (!bank) {
      bank = { id: 0, code: 'No Data.' }
    }
    return bank
  }

  const getMZKBanks = (): BankResponse[] => {
    return metadatums.banks.filter(
      (bank) => bank.id === 1 || bank.id === 2 || bank.id === 3
    )
  }

  const getAllDonors = (): DonorResponse[] => metadatums.donors

  const getDonor = (id: number): DonorResponse => {
    let donor = metadatums.donors.find((donor) => donor.id === id)
    if (!donor) {
      donor = { id: 0, fullName: 'No Data.' }
    }
    return donor
  }

  const getAllProjects = (): ProjectResponse[] => metadatums.projects

  const getProject = (id: number): ProjectResponse => {
    let project = metadatums.projects.find((project) => project.id === id)
    if (!project) {
      project = { id: 0, name: 'No Data.' }
    }
    return project
  }

  return {
    getAllStaffs,
    getStaff,
    getAllDonors,
    getDonor,
    getAllDepartments,
    getDepartment,
    getAllBanks,
    getBank,
    getMZKBanks,
    getAllProjects,
    getProject,
    loadMetadatums,
    isLoading,
  }
}
