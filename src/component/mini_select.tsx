import React, { useState } from 'react';
import {Avatar, MenuItem, MenuProps, Select} from "@mui/material";


// Original design here: https://github.com/siriwatknp/mui-treasury/issues/540
const searchIcon=[require('@/resource/icon/google.ico'),require('@/resource/icon/baidu.ico')]
const MinimalSelect = () => {
  const [val,setVal] = useState(1);

  const handleChange = (event:any) => {
    console.log(event.target.value)
    setVal(event.target.value);
  };

  // const minimalSelectClasses = useMinimalSelectStyles();

  // const iconComponent = (props) => {
  //   return (
  //     <ExpandMoreIcon/>
  //   )};

  // moves the menu below the select input
  const menuProps:Partial<MenuProps> = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    // getContentAnchorEl: null
  };


  return (
      <Select
        // disableUnderline
        MenuProps={menuProps}
        // IconComponent={iconComponent}
        value={val}
        onChange={handleChange}
        sx={{ height: 32 }}
      >
        {searchIcon.map((value,index)=>{
          return <MenuItem value={index}>
          <Avatar src={value} sx={{ width: 24, height: 24 }}/>
          </MenuItem>
        })}
        {/*<MenuItem value={0}>Principle</MenuItem>*/}
        {/*<MenuItem value={1}>Sketch</MenuItem>*/}
        {/*<MenuItem value={2}>Photoshop</MenuItem>*/}
        {/*<MenuItem value={3}>Framer</MenuItem>*/}
      </Select>
  );
};


export default MinimalSelect;
