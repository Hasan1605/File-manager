import React, { useState, useContext } from "react";
import Sidebar from "../Components/Sidebar/sidebar"
import Navbar from "../Components/Navbar/navbar";
import Lock from "../Components/Lock/Lock";
import styles from "../styles/home.module.scss"
import LowerSidebar from "../Components/Lower_Sidebar/lower_sidebar";
import Form from "../Components/Form/Form";
import Context from "../Components/Context/Context";
import DivInput from "../Components/Div_Input/Div_input";

export default function HomeExplorer() {


    const [lock, setlock] = useState(true);
    const [reset, setreset] = useState(false);
    const [text, settext] = useState("Enter you Pin");
    const first = useContext(Context);
    var Mode = first.mode;


    function handleLock() {
        first.Changeopac(true);
        setlock(true);
    }

    function handleUnlock(password) {
        var passsset = (localStorage.getItem('password'));
        if (password === passsset) {
            first.Changeopac(false);
            setlock(false);
            settext("Enter your pin");
        }
        else {
            settext("Incorrect Pin");
        }
    }
    return (<>
        {first.Add_folder && <DivInput mode={Mode} Type={"Folder"} />}
        {first.Add_file && <DivInput mode={Mode} Type={"File"} />}
        <Lock lock={lock} Unlock={handleUnlock} mode={Mode} text={text} />
        {reset && <Form mode={Mode} whichone={true} changedecision={() => { setreset(false); first.Changeopac(false) }} savechanges={(input) => { localStorage.removeItem('password'); setreset(false); setlock(true); (localStorage.setItem('password', input)); }} />}
        <div className="HomeExplorer" style={(first.opac) ? { zIndex: -1, opacity: 0.1 } : { opacity: 1 }}>
            <Sidebar mode={Mode} Lock={handleLock} />
            <div className={Mode ? styles.left_side_bar : styles.left_side_bar_Dark}>
                <div className={styles.left_side_bar_inner}>
                    <Navbar reset={() => { setreset(true); first.Changeopac(true) }} />
                    <LowerSidebar mode={Mode} />
                </div>
            </div>
        </div >
    </>);
}

// adjust={handleadjust}
// reset={() => { setreset(true); }}


// Cancel_File={() => { localStorage.setItem('Add_file', false); }} Cancel_Folder={() => { localStorage.setItem('Add_folder', false); first.update() }} 