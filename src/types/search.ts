/**
 * https://www.google.com/search?q=antd&oq=antd&aqs=edge..69i57j69i59l2j0i67l6.3439j0j1&sourceid=chrome&ie=UTF-8
 */

export enum EngineName{
  google="google",
  baidu="baidu",
  bing="bing"
}

export const GoogleSearch:SearchEngine={
  name:"google",
  url:"https://www.google.com/search?q=",
}

export const BaiduSearch:SearchEngine={
  name:"baidu",
  url:"https://www.baidu.com/s?wd="
}

export const BingSearch:SearchEngine={
  name:"bing",
  url:"https://cn.bing.com/search?q="
}



export interface SearchEngine {
  name:string;
  url:string;
}
