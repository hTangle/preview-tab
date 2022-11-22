import {Button, Stack, TextField, Typography} from "@mui/material";
import {hostExp, updateCollections} from "@/service/collection";
import * as React from "react";
import {useEffect, useState} from "react";

const Popup = () => {
    const [newHttpUrl, setNewHttpUrl] = useState('')
    const [isValidHttpUrl, setIsValidHttpUrl] = useState(true)
    const [newHttpUrlName, setNewHttpUrlName] = useState("")
    const [isValidHttpUrlName, setIsValidHttpUrlName] = useState(true)
    useEffect(() => {
        let queryOptions = {active: true, lastFocusedWindow: true};
        chrome.tabs.query(queryOptions, ([tab]) => {
            if (chrome.runtime.lastError)
                console.error(chrome.runtime.lastError);
            // `tab` will either be a `tabs.Tab` instance or `undefined`.
            console.log(tab)
            if (tab.url) {
                setNewHttpUrl(tab.url)
                setNewHttpUrlName(tab.title ? tab.title : "")
            }
        });
    }, [])
    return (
        <Stack style={{minWidth: "500px", minHeight: "200px", margin: "10px 10px 10px 10px"}}>
            <Typography style={{marginBottom:"10px"}} variant="h6" component="h6">
                添加网站
            </Typography>
            <TextField id="standard-basic" defaultValue={newHttpUrl}
                       value={newHttpUrl}
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
                       value={newHttpUrlName}
                       helperText={"名称不能为空，且长度需要小于20"}
                       error={!isValidHttpUrlName}
                       label="名称" variant="standard" onChange={(value) => {
                setIsValidHttpUrlName(!!value.target.value || value.target.value.length <= 20)
                setNewHttpUrlName(value.target.value);
            }}/>
            <Button style={{marginTop: "20px"}} variant="contained" onClick={() => {
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
                window.close()
            }}>确认</Button>
        </Stack>
    )
};

export default Popup;
