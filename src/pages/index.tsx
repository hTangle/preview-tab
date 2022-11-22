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
import {getBingDailyImage, getBingTodayImage, setBingTodayImage} from "@/service/bing_image_service";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import {Dropdown, Menu, message, Modal, Space} from "antd";
import {getCollections, hostExp, updateCollections} from "@/service/collection";
import {Collection} from "@/types/collection";
import CollectionButton from "@/component/collection_buttion";

import {BaiduSearch, BingSearch, GoogleSearch, SearchEngine} from "@/types/search";
import {getCurrentSearchEngine, getSearchUrl, setDefaultSearchEngine} from "@/service/search";
import TabSearchIcon from "@/component/search_icon";
import {useLocation} from "react-router-dom";
export default function HomePage() {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    console.log(name)
    // if(name==="option"){
    //   return (<Popup />)
    // }

    const [bgImage, setBgImage] = useState(`url("https://www.bing.com/th?id=OHR.MountAbu_ZH-CN1348295593_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp")`)
    const searchEngines: SearchEngine[] = [GoogleSearch, BaiduSearch, BingSearch];
    const [currentSearchEngine, setCurrentSearchEngine] = useState<SearchEngine>(getCurrentSearchEngine())
    const [idx,setIdx]=useState(0);
    const [imageDay,setImageDay]=useState()

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

    const updateBackgroundImage=()=>{

    }

    useEffect(() => {
        const date: Date = new Date()
        const image = getBingTodayImage(date)
        if (image) {
            setBgImage(`url("https://www.bing.com${image.url}")`)
        } else {
            console.log("try to read image from bing")
            getBingDailyImage().then((images) => {
                if (images && images.images?.length > 0) {
                    setBingTodayImage(images.images[0])
                    setBgImage(`url("https://www.bing.com${images.images[0].url}")`)
                }
            })
        }
    }, [])

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
                            {/*<GoogleIcon/>*/}
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
                <Space size={[6, 16]} wrap style={{margin: "100px auto", textAlign: "center", width: "100vh"}}>
                    {
                        collections.map((value, index) => (
                            <CollectionButton collection={value} update_collection={refreshCollection}/>
                        ))
                    }
                    <IconButton style={{textAlign: "center", display: "table", width: "100px", height: "120px"}}
                                onClick={showModal} color="success">
                        <AddIcon/>
                    </IconButton>
                </Space>
            </Container>
            <div style={{position: "fixed", bottom: "3%", right: "2%"}}>
                <Fab size="small" aria-label="add">
                    <KeyboardArrowLeftIcon/>
                </Fab>
                <Fab size="small" aria-label="edit">
                    <KeyboardArrowRightIcon/>
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
        </div>
    );
}
