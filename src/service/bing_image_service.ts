import {bingRequest} from "@/service/requests";
import {BingImage, getImageFromImages} from "@/types/bing";
import {LStorage} from "@/service/storage_service";
import dayjs from "dayjs";


export async function getBingDailyImage(idx: number = 0) {
    return bingRequest({
        method: "get",
        //url: "/HPImageArchive.aspx",
         url: "https://cn.bing.com/HPImageArchive.aspx",
        params: {
            format: "js", // 返回数据格式，jx或者xml
            idx: 0, // 请求图片截至天数 0 今天，-1 明天，1 昨天
            n: 8, // 1-8，返回图片的数量
            uhd: 1,
            w: 3840,
            h: 2160
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

export function getBingHistoryDayImage(idx: number) {
    //先用date做运算
    const images: BingImage[] = LStorage.get("bing_image_daily")
    const key = dayjs().add(idx, "day").format("YYYYMMDD")
    console.log(idx, key)
    const image = getImageFromImages(key, images)
    if (image) {
        return image
    }
    // //can not find
    // if (idx <= 1 && idx > -7) {
    //     //only recent 7 days can get
    //     getBingDailyImage(idx).then((result) => {
    //         if (result && result.images?.length > 0) {
    //             setBingTodayImage(result.images[0])
    //             setCurrentImage(`url("https://www.bing.com${result.images[0].url}")`)
    //         }
    //     })
    // }
}

export function setBingImages(imagesNew: BingImage[]) {
    const images: BingImage[] = LStorage.get("bing_image_daily")
    if (!images) {
        LStorage.set("bing_image_daily", imagesNew)
    } else {
        //find oldest index
        for (let x = 0; x < imagesNew.length; x++) {
            const oldestDate = imagesNew[x].enddate;
            for (let index = 0; index < images.length && index < 9; index++) {
                if (images[index].enddate == oldestDate) {
                    if (x == 0) {
                        return
                    }
                    let newImages: BingImage[] = imagesNew.slice(0, x)
                    LStorage.set("bing_image_daily", [...newImages, ...images])
                    return
                }
            }
        }
        // 都没找到
        LStorage.set("bing_image_daily", [...imagesNew, ...images])
        return
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

