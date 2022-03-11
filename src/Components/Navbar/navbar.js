import React, { useState, useContext } from "react";
import styles from "./navbar.module.scss"
import { IoIosAddCircleOutline, IoIosSunny, IoIosSearch, IoIosMoon } from "react-icons/io";
import { FiSettings } from "react-icons/fi"
import { RiFolder3Fill, RiFile2Fill } from "react-icons/ri";

import Context from "../Context/Context";


export default function Navbar(props) {

    const [searchTerms, setsearchTerms] = useState("");
    const [addbutton, setaddButton] = useState(false);


    const [show, setshow] = useState(false)

    const [value, setvalue] = useState("");
    const reader = useContext(Context);


    function handleAddClick() {
        setaddButton(!addbutton)
    }
    return (
        <div className={reader.mode ? styles.navbar_main : styles.navbar_Darkmain}>
            <div className={styles.navbar_inner} >
                <div className={styles.navbar_main_inner}>
                    <div className={styles.navbar_left_outer} >
                        <div className={styles.navbar_left} onClick>
                            <IoIosSearch style={{ marginLeft: "15px" }} /><input value={value} placeholder="Search Files or Folders" onChange={(event) => { if (event.target.value === "") { setshow(false) } else { setshow(true); } setsearchTerms(event.target.value); setvalue(event.target.value) }}></input>
                        </div>
                        {show && <div className={styles.navbar_innertwo_inner}>
                            {
                                JSON.parse(localStorage.getItem('storedValues')).filter((val) => {
                                    if (searchTerms === "") {
                                        return null;
                                    }
                                    else if (val.firstone.toLowerCase().includes(searchTerms.toLowerCase())) {
                                        return val;
                                    }
                                    else {
                                        return null;
                                    }
                                }).map((val) => {
                                    return (<div className={styles.inner} onClick={() => { setshow(false); setsearchTerms(""); setvalue(""); localStorage.setItem('currentpath', JSON.stringify(val.secondone)); reader.update() }}>{val.type === "Folder" ? <RiFolder3Fill style={reader.mode ? { margin: "0px 10px 0px 5px", color: "#4361ee" } : { margin: "0px 10px 0px 5px", color: "#112175" }} /> : <RiFile2Fill style={reader.mode ? { margin: "0px 10px 0px 5px", color: "#4361ee" } : { margin: "0px 10px 0px 5px", color: "#112175" }} />}{val.firstone}</div>)
                                })
                            }
                        </div>}

                    </div>
                </div>
                <div className={styles.navbar_Upperright} style={{ display: 'flex', flexDirection: "column", alignItems: "start" }}>
                    <div className={styles.navbar_right}>
                        {reader.mode ? <button onClick={() => { reader.Changemode() }}><p><IoIosSunny /> Light Mode</p></button> : <button onClick={() => reader.Changemode()}><IoIosMoon /><p>Dark Mode</p></button>}
                        <button className={styles.addbutton} onClick={handleAddClick}><IoIosAddCircleOutline /></button>
                        <button className={styles.setting} onClick={() => { props.reset() }}><FiSettings /></button>
                    </div>
                    <div className={styles.navbar_dropDown} style={addbutton ? { display: "flex" } : { display: "none" }}>
                        <button onClick={() => { if (reader.Add_folder === false && reader.Add_file === false) { reader.Changeopac(true); reader.updatefile(true) } }}>
                            {<RiFile2Fill style={{ marginRight: "10px", fontSize: "20px" }} />}
                            Add File</button>
                        <button onClick={() => { if (reader.Add_folder === false && reader.Add_file === false) { reader.Changeopac(true); reader.updatefolder(true) } }}
                        >{<RiFolder3Fill style={{ marginRight: "10px", fontSize: "20px" }} />}Add Folder</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

// {
//     Add_folder ? <DivInput mode={reader.mode} Type={"Folder"}
//         Cancel_File={() => { localStorage.setItem('Add_file', false); setAdd_file(false) }} Cancel_Folder={() => { localStorage.setItem('Add_folder', false); setAdd_folder(false) }} /> : <></>
// }
// {
//     Add_file ? <DivInput mode={reader.mode} Type={"File"}
//         Cancel_Folder={() => { localStorage.setItem('Add_file', false); setAdd_file(false) }}
//     /> : <></>
// }

