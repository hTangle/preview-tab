export interface BingImage {
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
}

export function getImageFromImages(key: string, images: BingImage[]) {
    if (images && images.length > 0) {
        for (let image of images) {
            if (image.enddate === key) {
                return image
            }
        }
    }
}

export interface BingImageResponse {
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
    hs: any[];
}

export interface BingImagePageResponse {
    images: BingImageResponse[];
    total: number;
    pages: number;
    page: number;
}

