import {LStorage} from "@/service/storage_service";
import {Collection} from "@/types/collection";

const collectionsKey = "collections"
export const hostExp: RegExp = new RegExp(`^(http|https)://(www.)?(\\w+(\\.)?)+`)

export function getCollections() {
    const collections: Collection[] = LStorage.get(collectionsKey);
    return collections;
}

export function updateCollections(url: string, title: string, type: string) {
    if (title.length > 20) {
        title = title.substring(0, 20)
    }
    console.log(url, title, type)
    if (url === "") {
        return
    }
    const allHosts: string[] | null = url.match(hostExp);
    if (!allHosts || allHosts.length == 0) {
        return
    }
    let collections: Collection[] = LStorage.get(collectionsKey);
    if (!collections) {
        collections = [];
    }
    const collectionLength = collections.length;
    for (let index = 0; index < collectionLength; index++) {
        if (collections[index].url === url) {
            if (collections[index].title === title && type === collections[index].type) {
                return
            }
            collections[index] = {
                url: url,
                title: title,
                type: type,
                icon: `chrome-search://ntpicon/?size=48@1.000000x&url=${allHosts[0]}`,
                host: `${allHosts[0]}`
            }
            LStorage.set(collectionsKey, collections)
            return
        }
    }

    const collection: Collection = {
        url: url,
        title: title,
        // icon: `${allHosts[0]}/favicon.ico`, //chrome-search://ntpicon/?size=48@1.000000x&url=https://note.ahsup.top/
        // icon: `chrome-search://ntpicon/?size=48@1.000000x&url=${allHosts[0]}`, //chrome-search://ntpicon/?size=48@1.000000x&url=https://note.ahsup.top/
        icon: `chrome://favicon/size/48@1x/${allHosts[0]}`, //chrome-search://ntpicon/?size=48@1.000000x&url=https://note.ahsup.top/
        type: type,
        host: `${allHosts[0]}`
    }
    collections.push(collection)
    LStorage.set(collectionsKey, collections)
    return collection
}

export function deleteCollection(collection: Collection) {
    let collections: Collection[] = LStorage.get(collectionsKey);
    if (!collection) {
        return
    }
    for (let i = collections.length - 1; i >= 0; i--) {
        if (collections[i].url === collection.url) {
            collections.splice(i, 1);
            break
        }
    }
    LStorage.set(collectionsKey, collections)
}

export function pinCollectionToFirst(collection: Collection) {
    let collections: Collection[] = LStorage.get(collectionsKey);
    if (!collection) {
        return
    }
    // find collection in collections
    for (let i = collections.length - 1; i >= 0; i--) {
        if (collections[i].url === collection.url) {
            collections.splice(i, 1);
            break
        }
    }
    LStorage.set(collectionsKey, [collection, ...collections])
}
