import * as React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {Solar} from "lunar-typescript";


export default function TimeShower() {
  const beginDate=new Date();
  const [hour, setHour] = useState(beginDate.getHours());
  const [minute, setMinute] = useState(beginDate.getMinutes())
  const [second, setSecond] = useState(beginDate.getSeconds())
  const [year, setYear] = useState(beginDate.getFullYear())
  const [month, setMonth] = useState(beginDate.getMonth()+1)
  const [day, setDay] = useState(beginDate.getDate())
  const [week,setWeek] = useState(beginDate.getDay())
  useEffect(()=>{
    const time=window.setInterval(()=>{
      const date=new Date();
      setHour(date.getHours());
      setMinute(date.getMinutes());
      setSecond(date.getSeconds());
      setYear(date.getFullYear());
      setMonth(date.getMonth()+1);
      setDay(date.getDate());
      setWeek(date.getDay())
    },1000)
    return ()=>{
      clearInterval(time);
    }
  },[hour,minute,second,year,month,day,week]);

  const [lunarMonth,setLunarMonth]=useState("");
  const [lunarDay,setLunarDay]=useState("");

  useEffect(()=>{
    const solar=Solar.fromYmd(year,month,day);
    setLunarMonth(solar.getLunar().getMonthInChinese());
    setLunarDay(solar.getLunar().getDayInChinese());
  },[year,month,day])
  return (
    <div style={{color:"white"}}>
      <Typography variant="h4" style={{opacity:"0"}}>{year}</Typography>
      <Typography variant="h1" style={{color:"white"}}>{(hour>9?hour:"0"+hour)+":"+(minute>=10?minute:"0"+minute)+":"+(second>=10?second:"0"+second)}</Typography>
      <Typography variant="h5"  style={{color:"white"}} gutterBottom>{month+"月"+day+"日  星期"+'日一二三四五六'.charAt(week)+"  "+(lunarMonth?(lunarMonth+"月"):"")+lunarDay}</Typography>
    </div>

  )
}
