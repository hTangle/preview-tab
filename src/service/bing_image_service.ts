import {bingPageRequest, bingTotalRequest} from "@/service/requests";
import {LStorage} from "@/service/storage_service";

export async function getBingImages(page: number, page_size: number = 12) {
    return bingPageRequest({
        method: "get",
        url: "/bing/page",
        params: {
            page: page,
            page_size: page_size
        }
    })
}

export async function getBingTotalImages() {
    return bingTotalRequest({
        method: "get",
        // url: "/bing",
        url: "https://ahsup.top/bing",
    })
}

export function getBackgroundImage() {
    const image: string = LStorage.get("background-image")
    if (image && image.length > 10) {
        return image
    }
    return "https://bing.com/th?id=OHR.TurenneSunrise_ZH-CN2357226217_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp"
}

export function setBackgroundImage(image: string) {
    LStorage.set("background-image", image)
}