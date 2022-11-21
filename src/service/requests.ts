import axios, {AxiosRequestConfig} from "axios";
import {BingResponse} from "@/types/bing";

const bingInstance = axios.create({
  // baseURL: "https://cn.bing.com/"
})

export const bingRequest = async (config: AxiosRequestConfig): Promise<BingResponse> => {
  try {
    const response = await bingInstance(config)
    return response.data
  } catch (err) {
    console.error(err)
    return {
      images: [],
    }
  }
}
