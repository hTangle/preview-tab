import {Button, Stack, TextField} from "@mui/material";
import {hostExp, updateCollections} from "@/service/collection";
import * as React from "react";
import {useState} from "react";
const Popup = () => {
    const [newHttpUrl, setNewHttpUrl] = useState('')
    const [isValidHttpUrl, setIsValidHttpUrl] = useState(true)
    const [newHttpUrlName, setNewHttpUrlName] = useState("")
    const [isValidHttpUrlName, setIsValidHttpUrlName] = useState(true)
    return (
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
            <Button variant="contained" onClick={() => {
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
            }}>确认</Button>
        </Stack>
    )
};

export default Popup;
