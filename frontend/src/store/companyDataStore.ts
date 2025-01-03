import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICompany } from "../types/companyInterface";

interface ICompanyStore {
  companyData: ICompany,
  setCompanyData: (companyData: ICompany) => void
}
const defaultCompanyData: ICompany = {
  _id: "",
  companyName: "",
  companyEmail: "",
  companyAddress: "",
  industryType: "",
  managerName: "",
  managerEmail: "",
  campaigns: [],
  causesSupported: [],
  isActive: true,
  joinedDate: new Date(),
};

export const useCompanyStore = create(
  persist<ICompanyStore>(
    (set) => ({
     companyData: defaultCompanyData,
     setCompanyData: (companyDataIncoming) => set({ companyData: companyDataIncoming })
    }),
    {
      name: "billion-smiles-company-data",
    }
  )
);

