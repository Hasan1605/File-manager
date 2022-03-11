import React, { useContext } from "react";
import logo from "../../Images/logo.png";
import logo1 from "../../Images/logo (1).png";
import { FiFolderPlus, FiFilePlus } from "react-icons/fi";
import styles from "./sidebar_upper.module.scss";
import Context from "../Context/Context";

export default function SideBarUpper(props) {

    const reader = useContext(Context)



    return (<>
        <div className={props.mode ? styles.sideBar_Outter : styles.sideBar_Outter_Dark} >
            <img className={styles.sideBar_logo} src={props.mode ? logo : logo1} alt="logo" width={props.wlogo} height={"auto"} />
            <div className={styles.sideBar_middleUpper}>
                <button onClick={() => { if (reader.Add_folder === false && reader.Add_file === false) { reader.Changeopac(true); reader.updatefile(true) } }}><FiFilePlus size="25px" /><p style={props.wP ? { display: "inline" } : { display: "none" }}>Add File</p></button>
                <button onClick={() => { if (reader.Add_folder === false && reader.Add_file === false) { reader.Changeopac(true); reader.updatefolder(true) } }} ><FiFolderPlus size="25px" /><p style={props.wP ? { display: "inline" } : { display: "none" }}>Add Folder</p></button>
            </div>
        </div>
    </>)
}