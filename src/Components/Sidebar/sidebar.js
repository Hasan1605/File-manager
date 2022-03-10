import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import { FiLock } from "react-icons/fi"
import FilesandFolders from "../FilesAndFolders/filesAndFolder";
import SideBarUpper from "../Sidebar_Upper/sidebar_upper";

function SideBar(props) {

    const [w, setW] = useState('360px');
    const [wP, setwP] = useState(true);
    const [wlogo, setwlogo] = useState('160px');

    const handledrag = (event) => {
        var x = event.nativeEvent.screenX;
        var wl = (x - 30);
        var res = x.toString() + 'px';
        if (res !== '0px' && x > 120 && x < 900) {
            setW(res);
            setwlogo((wl.toString() + 'px'))
            handlewidth(res);
        }
    }
    function handlewidth(l) {
        var b = parseInt((l.substring(0, w.length - 2)));
        if (b < 200) {
            setwP(false)
        }
        else {
            setwP(true);
        }
    }

    return (<>
        <div style={props.mode ? { backgroundColor: "#F7F8FA" } : { backgroundColor: "#1E272E" }}>
            <div className={props.mode ? styles.sideBar_main : styles.sideBar_Darkmain} >
                <div className={styles.sidebarinnerone_main} style={{ width: w }}>
                    <div className={styles.sidebarinnerone}>
                        <SideBarUpper wlogo={wlogo} mode={props.mode} wP={wP} />
                        <div className={styles.sideBar_middle} >
                            <FilesandFolders mode={props.mode} />
                        </div>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.sideBar_lower} >
                            <button className={styles.sideBar_lock} onClick={() => { props.Lock() }}>
                                <FiLock size={"25px"} />
                                <p style={wP ? { display: "block" } : { display: "none" }}>Lock Now</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.resizer} draggable onDrag={handledrag}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </>);
}
const Memoz = React.memo(SideBar);
export default Memoz;

