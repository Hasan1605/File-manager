import React, { useState, useContext } from "react";
import styles from "./lower_sidebar.module.scss";
import Folderimag from "../../Images/Group 29195.png";
import FolderimagDark from "../../Images/Group 29376 (1).png";
import Fileimag from "../../Images/Group 29377 (1).png"
import FileimagDark from "../../Images/Group 29377.png"
import { BsArrowLeft } from "react-icons/bs"
import Context from "../Context/Context";

export default function Lower_sidebar(props) {
    const reader = useContext(Context);
    const [renamefolder, setrenamefolder] = useState(false)
    var path_reader = (reader.path_reader);
    console.log();
    console.log("HEllo");
    var x = [];
    var changed = JSON.parse(localStorage.getItem('CompleteStructure'));
    var variable = changed;
    var len = path_reader.length;
    if (len === 0) {
        x = [];
    }
    else if (len === 1) {
        x.push(changed.childNodes[path_reader[0]].name)
        changed = changed.childNodes[path_reader[0]];
    }
    else {

        changed = changed.childNodes[path_reader[0]];
        x.push(changed.name);
        var lenvar = len - 1;

        while (lenvar !== 0) {
            changed = changed.childNodes[path_reader[len - lenvar]];
            x.push(changed.name)
            lenvar--;
        }
    }
    function Input(props) {
        const [value, setvalue] = useState(props.value.content)
        return (<>
            <div className={styles.Input_main}>
                <div className={styles.file_showing_div}>
                    <h1 style={{ margin: "20px", borderBottom: "solid 1px grey", textAlign: "center" }}>{props.value.title}</h1>
                    <div className={styles.file_showing_div_inner}>
                        <textarea value={value} onChange={(event) => {
                            var x = event.target.value;
                            console.log(x);
                            setvalue(x);
                        }} />
                    </div>
                    <div className={styles.file_div_button}>
                        <button onClick={() => { props.cancel() }}>Cancel</button>
                        <button onClick={() => {
                            props.value.content = value;
                            localStorage.setItem('CompleteStructre', variable);
                            props.cancel()
                        }}>Save Changes</button>
                    </div>
                </div>
            </div>
        </>)
    }
    function DivInner(props) {
        const [show, setshow] = useState(false);
        const [renamefile, setrenamefile] = useState(false);
        const reader = useContext(Context);
        var z;
        console.log(props.num);
        return (<>
            <div className={styles.folder} >
                <img src={reader.mode ? Fileimag : FileimagDark} alt="Fileimage" onClick={() => { setshow(true) }}></img>
                {renamefile ? <input style={{ width: "100px", fontSize: "17px" }} onKeyPress={(event) => {
                    console.log(event.key);
                    if (event.key === "Enter") {
                        props.file.name = z;
                        console.log(props.file.name);
                        localStorage.setItem('CompleteStructure', JSON.stringify(variable));
                        reader.update()
                    }

                }} onMouseOut={() => { setrenamefile(false) }} onChange={(event) => { z = event.target.value }} /> : <p onDoubleClick={() => {
                    setrenamefile(true);
                }}>{props.file.name}</p>}

                <button className={styles.buttonDelete} onClick={() => {

                    var y = props.Wholefile.splice(props.num, 1);
                    var x = JSON.parse(localStorage.getItem('storedValues'));
                    x.splice(y[0].insearch, 1);
                    localStorage.setItem('storedValues', JSON.stringify(x));
                    localStorage.setItem('CompleteStructure', JSON.stringify(variable));
                    reader.update()
                }}>Delete</button>
            </div>

            {
                show && <Input value={props.file} cancel={() => { setshow(false) }} />
            }</>)
    }
    function Div(props) {
        // const [show, setshow] = useState(false);
        return (<>
            {
                props.File.map((file, key) => {
                    return (<>
                        <DivInner file={file} Wholefile={props.File} num={key} marg={props.marg} />
                    </>)
                })
            }
        </>);
    }

    var z;
    return (<>
        <div className={props.mode ? styles.lower_sidebar_main : styles.lower_sidebar_main_Dark} style={{ display: props.display }}>
            <div className={styles.lower_sidebar_inner}>

                <button onClick={() => { path_reader.pop(); localStorage.setItem('currentpath', JSON.stringify(path_reader)); reader.update() }}><BsArrowLeft /></button>
                {
                    x.length > 0 ? (x.map((Structure) => {
                        return (<>
                            /
                            <span>
                                {Structure}
                            </span>
                        </>
                        )
                    })) : (<span>/</span>)
                }
            </div>
            <div className={styles.lower_sidebar_inner2}>

                {
                    changed.childNodes.map((Structure, key) => {
                        return (<>
                            <div className={styles.folder}>
                                <div className={styles.folder_inner} >
                                    <img src={reader.mode ? Folderimag : FolderimagDark} alt="Folderimage" onClick={() => { path_reader.push(key); localStorage.setItem('currentpath', JSON.stringify(path_reader)); reader.update() }}></img>
                                    {renamefolder ? <input style={{ width: "100px", fontSize: "17px" }} onKeyPress={(event) => {

                                        if (event.key === "Enter") {

                                            Structure.name = z;
                                            // console.log(props.file.name);
                                            localStorage.setItem('CompleteStructure', JSON.stringify(variable));
                                            setrenamefolder(false)
                                            reader.update()
                                        }

                                    }} onMouseOut={() => { setrenamefolder(false) }} onChange={(event) => { z = event.target.value }} /> : <p style={{ fontSize: "19px" }} onDoubleClick={() => {
                                        setrenamefolder(true)
                                    }}>{Structure.name}</p>}
                                </div>
                                <button className={styles.buttonDelete} onClick={() => {

                                    var y = changed.childNodes.splice(key, 1);
                                    var x = JSON.parse(localStorage.getItem('storedValues'));
                                    x.splice(y[0].insearch, 1)
                                    localStorage.setItem('storedValues', JSON.stringify(x))
                                    localStorage.setItem('CompleteStructure', JSON.stringify(variable))
                                    reader.update()
                                }}>Delete</button>
                            </div>
                        </>
                        )
                    })
                }
                <Div File={changed.Files} />
            </div>
        </div>
    </>)

}