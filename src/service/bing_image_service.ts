import {bingRequest} from "@/service/requests";
import {BingImage, getImageFromImages} from "@/types/bing";
import {LStorage} from "@/service/storage_service";


export async function getBingDailyImage(idx:number=0) {
  return bingRequest({
    method: "get",
    url: "https://cn.bing.com/HPImageArchive.aspx",
    params: {
      format: "js", // 返回数据格式，jx或者xml
      idx: idx, // 请求图片截至天数 0 今天，-1 明天，1 昨天
      n: 1, // 1-8，返回图片的数量
      uhd:1,
      w:3840,
      h:2160
    }
  })
}

export function getBingDateFormat(date: Date) {
  let month: string | number = date.getMonth() + 1
  let strDate: string | number = date.getDate()
  if (month <= 9) {
    month = "0" + month
  }
  if (strDate <= 9) {
    strDate = "0" + strDate;
  }
  return date.getFullYear() + "" + month + strDate
}

export function getBingTodayImage(date: Date) {
  //首先从缓存中获取
  const images: BingImage[] = LStorage.get("bing_image_daily")
  const key = getBingDateFormat(date)
  const image = getImageFromImages(key, images)
  if (image) {
    return image
  }
}

export function setBingTodayImage(image: BingImage) {
  const images: BingImage[] = LStorage.get("bing_image_daily")
  if (!images) {
    const imgs: BingImage[] = [image]
    LStorage.set("bing_image_daily", imgs)
  } else {
    images.push(image)
    LStorage.set("bing_image_daily", images)
  }
}

