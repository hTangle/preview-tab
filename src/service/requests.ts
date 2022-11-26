import axios, {AxiosRequestConfig} from "axios";
import {BingImagePageResponse, BingImageResponse} from "@/types/bing";

const bingInstance = axios.create({
    // baseURL: "https://cn.bing.com/"
})


export const bingPageRequest = async (config: AxiosRequestConfig): Promise<BingImagePageResponse> => {
    try {
        const response = await bingInstance(config)
        return response.data
    } catch (err) {
        console.error(err)
        return {
            images: [],
            total: 0,
            pages: 1,
            page: 0
        }
    }
}

export const bingTotalRequest = async (config: AxiosRequestConfig): Promise<BingImageResponse[]> => {
    try {
        const response = await bingInstance(config)
        return response.data
    } catch (err) {
        console.error(err)
        return []
    }
}
