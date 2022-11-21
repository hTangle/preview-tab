import {BsGoogle, SiBaidu, SiMicrosoftbing} from "react-icons/all";
import * as React from "react";
import {SearchEngine} from "@/types/search";


export default function TabSearchIcon(props: any) {
  const engine: SearchEngine = props.engine;
  switch (engine.name) {
    case "google":
      return <BsGoogle/>
    case "baidu":
      return <SiBaidu />
    case "bing":
      return <SiMicrosoftbing />
  }
  return <></>
}
