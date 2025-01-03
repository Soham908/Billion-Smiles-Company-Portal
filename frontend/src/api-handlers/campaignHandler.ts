import axios from "axios"
import { ICampaign } from "../types/campaignInterface"
import { ICompany } from "../types/companyInterface"
const url = import.meta.env.VITE_BACKEND_URL + "/campaigns"

interface ICreateCampaign {
    success: boolean,
    campaignData?: ICampaign,
    errorMessage?: string,
    companyData?: ICompany,
}

export const createCampaignHandler = async (file: File, campaignData: ICampaign): Promise<ICreateCampaign> => {
    const imageUrl = await uploadCampaignImageHandler(file)
    campaignData.imageUrl = imageUrl
    const response = await campaignStoreInBackend(campaignData)
    console.log(response)
    return { success: true, campaignData: response.campaignData, companyData: response.companyData }
}

const uploadCampaignImageHandler = async (file: File) => {
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", upload_preset);
    
    const response = await axios.post(cloudinary_url, formData)
    return response.data.secure_url
}

const campaignStoreInBackend = async (campaignData: ICampaign) => {
    try {
        const response = await axios.post(url + "/create-campaign", campaignData)
        return response.data
    } catch (error) {
        console.log("error occured: " + error)
    }
}
