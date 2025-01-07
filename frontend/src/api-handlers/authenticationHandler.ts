import axios from "axios"
import { ICompany } from "../types/companyInterface"
import { IAdditionalCompanyDetails } from "../pages/authentication/CompanyDetailsForm"
import { IApiResponse } from "../types/api-handler-response"
const url = import.meta.env.VITE_BACKEND_URL + "/auth"

interface IAuthHandlerResponse extends IApiResponse {
    companyData?: ICompany
}

export const loginCompanyManagerHandler = async ({ managerEmail, password }: { managerEmail: string, password: string }): Promise<IAuthHandlerResponse> => {
    try {
        const response = await axios.post(url + "/login", { managerEmail, password })
        return { success: true, message: response.data.message, companyData: response.data.companyData }
    } catch (error) {
        console.log("login error: " + error);
        return { success: false, message: "error occured: " + error }
    }
}

export const signupCompanyHandler = async ( signupData: IAdditionalCompanyDetails ): Promise<IAuthHandlerResponse> => {
    try {
        const response = await axios.post(url + "/signup", signupData)
        return { success: true, message: response.data.message, companyData: response.data.companyData }
    } catch (error) {
        console.log("signup error: " + error)
        return {success: false, message: "error: " + error}
    }
}
