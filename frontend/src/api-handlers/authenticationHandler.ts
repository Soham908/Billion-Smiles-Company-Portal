import axios from "axios"
import { ICompany } from "../types/companyInterface"
import { IAdditionalCompanyDetails } from "../pages/authentication/CompanyDetailsForm"
const url = import.meta.env.VITE_BACKEND_URL + "/auth"

interface IAuthHandlerResponse {
    success: boolean
    companyData?: ICompany
    errorMessage?: string
}

export const loginCompanyManagerHandler = async ({ managerEmail, password }: { managerEmail: string, password: string }): Promise<IAuthHandlerResponse> => {
    try {
        const response = await axios.post(url + "/login", { managerEmail, password })
        return { success: true, companyData: response.data.companyData }
    } catch (error) {
        console.log("login error: " + error);
        return { success: false, errorMessage: "error occured: " + error }
    }
}

export const signupCompanyHandler = async ( signupData: IAdditionalCompanyDetails ): Promise<IAuthHandlerResponse> => {
    try {
        const response = await axios.post(url + "/signup", signupData)
        return { success: true, companyData: response.data.companyData }
    } catch (error) {
        console.log("signup error: " + error)
        return {success: false, errorMessage: "error: " + error}
    }
}

// export const additionalCompanyDetails = async ({ companyAddress, managerEmail, managerName, managerPhoneNumber }: IAdditionalCompanyDetails): Promise<IAuthHandlerResponse> => {
//     try {
//         const response = await axios.post(url + "/additional-details", { companyAddress, managerEmail, managerName, managerPhoneNumber })
//         return response.data
//     } catch (error) {
//         console.log("error: " + error)
//         return { errorMessage: "error: " + error }
//     }
// }
