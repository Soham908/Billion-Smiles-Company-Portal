import axios from "axios";
import { IApiResponse } from "../types/api-handler-response";
const url = import.meta.env.VITE_BACKEND_URL + "/company"

interface ICompanyHandler extends IApiResponse {
    companyData?: any;
}

export const fetchCompanyDetailsHandler = async (companyId: string): Promise<ICompanyHandler> => {
    try {
        const response = await axios.get(url + "/company-details/" + companyId);
        return { success: true, message: response.data.message, companyData: response.data.companyData };
    } catch (error) {
        console.log("error: " + error);
        return { success: false, message: "error: " + error };
    }
};
