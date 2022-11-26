import {
    Container,
    Fab, Stack,
    TextField
} from "@mui/material";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TimeShower from "@/component/time_shower";
import {CSSProperties, useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {
    getBackgroundImage,
    getBingTotalImages, setBackgroundImage,
} from "@/service/bing_image_service";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import {Dropdown, Menu, message, Modal, Space} from "antd";
import {Image, List, Drawer} from '@arco-design/web-react';

import {getCollections, hostExp, updateCollections} from "@/service/collection";
import {Collection} from "@/types/collection";
import CollectionButton from "@/component/collection_buttion";

import {BaiduSearch, BingSearch, GoogleSearch, SearchEngine} from "@/types/search";
import {getCurrentSearchEngine, getSearchUrl, setDefaultSearchEngine} from "@/service/search";
import TabSearchIcon from "@/component/search_icon";
import {BingImageResponse} from "@/types/bing";
import "@arco-design/web-react/dist/css/arco.css";
import {IconInfoCircle} from "@arco-design/web-react/icon";


export default function HomePage() {
    const [bgImage, setBgImage] = useState(`url("https://bing.com/th?id=OHR.TurenneSunrise_ZH-CN2357226217_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp")`)
    const searchEngines: SearchEngine[] = [GoogleSearch, BaiduSearch, BingSearch];
    const [currentSearchEngine, setCurrentSearchEngine] = useState<SearchEngine>(getCurrentSearchEngine())
    const [mainStyle, setMainStyle] = useState<CSSProperties>({
        textAlign: "center",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: bgImage
    })


    useEffect(() => {
        const image = getBackgroundImage()
        setBgImage(`url("${image}")`)
    }, [])

    const setBackgroundImageToStorage = function (url: string) {
        console.log("set url", url)
        setBackgroundImage(url)
        setBgImage(`url("${url}")`)
    }

    useEffect(() => {
        setMainStyle({...mainStyle, backgroundImage: bgImage})
    }, [bgImage])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isValidHttpUrl, setIsValidHttpUrl] = useState(true)
    const [isValidHttpUrlName, setIsValidHttpUrlName] = useState(true)
    const [newHttpUrl, setNewHttpUrl] = useState("")
    const [newHttpUrlName, setNewHttpUrlName] = useState("")
    const [collections, setCollections] = useState<Collection[]>([]);
    const [searchData, setSearchData] = useState("")

    const refreshCollection = function () {
        const sc = getCollections()
        if (sc) {
            setCollections(sc)
        }
    }

    useEffect(() => {
        const sc = getCollections()
        if (sc) {
            setCollections(sc)
        }
    }, [])

    const doSearch = function () {
        if (searchData) {
            const newUrl = getSearchUrl(currentSearchEngine, searchData);
            location.href = newUrl;
        } else {
            message.warning("搜索内容为空");
        }
    }

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const [allBingImage, setAllBingImage] = useState<BingImageResponse[]>([]);
    const updateAllBingImage = () => {
        getBingTotalImages().then((result) => {
            if (result.length !== allBingImage.length) {
                setAllBingImage(result)
            }
        })
    }


    return (
        <div style={mainStyle}>
            <Container style={{textAlign: "center", width: "100vh", height: "100vh"}}>
                <TimeShower/>
                <Paper
                    component="form"
                    style={{width: "100vh", textAlign: "center", margin: "0 auto", borderRadius: "30px"}}
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "90vh"}}
                >
                    <Dropdown
                        placement="bottomLeft"
                        overlay={
                            <Menu
                                items={
                                    searchEngines.map((value, key) => {
                                        return {
                                            key: key,
                                            label: value.name,
                                            icon: (<TabSearchIcon engine={value}/>)
                                        }
                                    })
                                }
                                onClick={(item) => {
                                    setDefaultSearchEngine(searchEngines[Number(item.key)])
                                    setCurrentSearchEngine(searchEngines[Number(item.key)])
                                }
                                }
                            />
                        }
                        trigger={['click']}
                    >
                        <IconButton sx={{p: '10px'}} aria-label="menu">
                            <TabSearchIcon engine={currentSearchEngine}/>
                        </IconButton>

                    </Dropdown>
                    <InputBase
                        style={{width: "90vh"}}
                        sx={{ml: 1, flex: 1}}
                        placeholder="Search"
                        onChange={(data) => setSearchData(data.target.value)}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                event.preventDefault()
                                doSearch()
                            }
                        }}
                    />
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={() => {
                        console.log(searchData)
                        doSearch()
                    }}>
                        <SearchIcon/>
                    </IconButton>
                </Paper>
                <Space size={[6, 16]} wrap style={{
                    margin: "100px auto",
                    textAlign: "center",
                    width: "100vh",
                    backgroundColor: "rgba(211,211,211, .4)"
                }}>
                    {
                        collections.map((value, index) => (
                            <CollectionButton collection={value} update_collection={refreshCollection}/>
                        ))
                    }
                    <IconButton style={{textAlign: "center", display: "table", width: "100px", height: "120px"}}
                                onClick={showModal} size="large">
                        <AddIcon
                            style={{borderRadius: "30px", backgroundColor: "white", width: "30px", height: "30px"}}/>
                    </IconButton>
                </Space>
            </Container>
            <div style={{position: "fixed", bottom: "3%", right: "2%"}}>
                <Fab size="small" aria-label="add" onClick={() => {
                    updateAllBingImage()
                    showDrawer()
                }}>
                    <WallpaperIcon/>
                </Fab>
            </div>
            <Modal title="添加网站" open={isModalOpen} onOk={() => {
                const allHosts: string[] | null = newHttpUrl.match(hostExp)
                if (!(allHosts && allHosts.length > 0)) {
                    setIsValidHttpUrl(false)
                    return
                }
                if (newHttpUrlName === "") {
                    setIsValidHttpUrlName(false)
                    return
                }
                console.log("add new collection: ", newHttpUrl, newHttpUrlName)
                const addCollection = updateCollections(newHttpUrl, newHttpUrlName, "default")
                if (addCollection) {
                    setCollections([...collections, addCollection])
                }
                handleOk()
            }} onCancel={handleCancel}>
                <Stack>
                    <TextField id="standard-basic" defaultValue={newHttpUrl}
                               helperText={isValidHttpUrl ? "" : "请输入合法网址，以https或http开头"}
                               error={!isValidHttpUrl} label="URL" variant="standard" onChange={(value) => {
                        const allHosts: string[] | null = value.target.value.match(hostExp)
                        console.log(value.target.value, allHosts)
                        if (allHosts && allHosts.length > 0) {
                            setIsValidHttpUrl(true)
                        } else {
                            setIsValidHttpUrl(false)
                        }
                        setNewHttpUrl(value.target.value)
                    }}/>
                    <TextField style={{marginTop: "20px"}} id="standard-basic" defaultValue={newHttpUrlName}
                               helperText={isValidHttpUrlName ? "" : "名称不能为空"}
                               error={!isValidHttpUrlName}
                               label="名称" variant="standard" onChange={(value) => {
                        setIsValidHttpUrlName(!!value.target.value)
                        setNewHttpUrlName(value.target.value);
                    }}/>
                </Stack>
            </Modal>
            <Drawer title="必应每日一图"
                    width={"900px"}
                    visible={open}
                    placement="right" onCancel={onClose} onOk={onClose}>
                <Image.PreviewGroup infinite>
                    <List
                        pagination={{pageSize: 8}}
                        grid={{
                            sm: 24,
                            md: 12,
                        }}
                        dataSource={allBingImage}
                        render={(value) => (
                            <List.Item>
                                <Image key={value.enddate}
                                       alt={value.copyright}
                                       width={400} src={"https://bing.com" + value.url.replaceAll("UHD", "1920x1080")}
                                       description={value.copyright}
                                       actions={[
                                           <button
                                               key='2'
                                               className='image-demo-action-item'
                                               onClick={(e) => {
                                                   setBackgroundImageToStorage(`https://www.bing.com${value.url.replaceAll("1920x1080","UHD")}`)
                                               }}
                                           >
                                               <IconInfoCircle/>
                                           </button>
                                       ]}
                                />
                            </List.Item>
                        )}
                    /></Image.PreviewGroup>
            </Drawer>
        </div>
    );
}
