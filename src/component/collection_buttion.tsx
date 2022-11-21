import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {Collection} from "@/types/collection";
import style from '@/css/collection.less';
import {Dropdown,Menu} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import {deleteCollection, pinCollectionToFirst} from "@/service/collection";

export default function CollectionButton(props: any) {
  const collection: Collection = props.collection;
  const updateCollection=props.update_collection;
  return (
    <IconButton style={{textAlign: "center", display: "table", width: "100px", height: "120px"}} href={collection.url}>
      <div style={{textAlign: "center", margin: "0px auto", display: "table-cell"}}>
        <img src={`${collection.icon}`} style={{width: "42px", height: "42px"}}
             alt={`${collection.title}`}/>
        <div className={style.lowtab_collection_button_more}>
          <Dropdown
            placement="bottomLeft"
            overlay={
              <Menu
                items={[
                  {
                    key: '1',
                    label: 'Pin',
                    icon: <PushPinIcon />,
                  },
                  {
                    key: '2',
                    label: 'Edit',
                    icon: <EditIcon />,
                  },{
                    key: '3',
                    label: 'Delete',
                    icon: <DeleteIcon />,
                  },
                ]}
                onClick={(item)=>{
                  console.log(item.key)
                  switch (item.key){
                    case "1":
                      pinCollectionToFirst(collection)
                      updateCollection()
                      break
                    case "2":
                      // rename
                      break
                    case "3":
                      deleteCollection(collection)
                      updateCollection()
                      break
                  }
                }
                }
              />
            }
            trigger={['click']}
          >
            <EllipsisOutlined style={{width: "20px", height: "20px"}}/>
          </Dropdown>
        </div>
        <p style={{color: "white", fontSize: "14px"}}>{collection.title}</p>
      </div>
    </IconButton>
  )
}
