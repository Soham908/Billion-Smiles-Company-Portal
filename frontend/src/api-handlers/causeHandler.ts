import axios from "axios";
import { IApiResponse } from "../types/api-handler-response";
import { ICause } from "../types/causeInterface";
const url = import.meta.env.VITE_BACKEND_URL + "/cause"

interface IFetchCauseResponse extends IApiResponse {
    causesData?: ICause[];
}

export const fetchCausesHandler = async (): Promise<IFetchCauseResponse> => {
    try {
        const response = await axios.get(url + "/fetch-causes");
        return { success: true, message: response.data.message, causesData: response.data.causesData };
    } catch (error) {
        console.log("error: " + error);
        return { success: false, message: "error: " + error };
    }
};
