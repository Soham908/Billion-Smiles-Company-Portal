import axios from "axios";
import { IApiResponse } from "../types/api-handler-response";
import { IActivity } from "../types/activitiesInterface";
const url = import.meta.env.VITE_BACKEND_URL + "/activity-log"

interface IRecentActivity extends IApiResponse {
    activitiesData?: IActivity[];
}

export const fetchActivityHandler = async (companyId: string): Promise<IRecentActivity> => {
    try {
        const response = await axios.get(url + "/fetch-activities/" + companyId );
        return { success: true, message: response.data.message, activitiesData: response.data.activitiesData };
    } catch (error) {
        console.log("error: " + error);
        return { success: false, message: "error: " + error };
    }
};
