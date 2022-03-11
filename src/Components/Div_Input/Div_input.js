import React, { useState, useContext } from "react";
import styles from "./Div_input.module.scss";
import { FiFolder } from "react-icons/fi";
import Context from "../Context/Context";

export default function Div_input(props) {
    const [input, setinput] = useState("");
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const reader = useContext(Context);
    function handletext(event) {
        var x = event.target.value
        setinput(x);
    }
    function handletitle(event) {
        var x = event.target.value
        settitle(x);
    }
    return (<div className={props.mode ? styles.div_input_outer : styles.div_input_outer_Dark} >
        <div className={styles.div_input_inner} >
            <h1>Create {props.Type}</h1>
            <FiFolder /><p>Enter {props.Type} Name</p>
            <div className={styles.innerforinput}>
                <input className={styles.div_input_main} placeholder={props.Type === "File" ? "File Name" : "Folder Name"} onChange={handletext} style={props.Type === "File" ? { width: "500px" } : { width: "350px" }} />
            </div>
            {props.Type === "File" && <input className={styles.div_input_main} placeholder="Title" onChange={handletitle} style={props.mode ? { fontSize: "20px", width: "100 %", border: "none", margin: "10px", outline: "none", borderBottom: "solid 2px grey" } : { fontSize: "20px", width: "100 %", border: "none", margin: "10px", outline: "none", borderBottom: "solid 2px grey", backgroundColor: "rgb(231,234,244,0)", color: "white" }} />}
            {props.Type === "File" && <div className={styles.innerfortextarea}>
                <textarea style={{ margin: "10px", width: "95%", height: "250px", resize: "none", outline: "none", fontSize: "20px", border: "none" }} placeholder={"Content..."} onChange={(event) => { setcontent(event.target.value) }}></textarea>
            </div>}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                <button onClick={() => {
                    if (props.Type === "File") {
                        reader.Changeopac(false);
                        reader.updatefile(false)
                    }
                    else {
                        reader.Changeopac(false);
                        reader.updatefolder(false)
                    }
                }}>Cancel</button>
                <button onClick={() => {
                    var Foldername = input
                    var path_reader = reader.path_reader;
                    var len = (path_reader.length);
                    var changed = JSON.parse(localStorage.getItem('CompleteStructure'));
                    var variable = changed;
                    var assign = JSON.parse(localStorage.getItem('storedValues'))
                    var newPath = path_reader;
                    if (props.Type === "File") {
                        if (len === 0) {
                            changed.Files.push({
                                name: Foldername,
                                title: title,
                                content: content,
                                path: newPath,
                                insearch: assign.length
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(changed));
                        }
                        else if (len === 1) {

                            changed.childNodes[newPath[0]].Files.push({
                                name: Foldername,
                                title: title,
                                content: content,
                                path: newPath,
                                insearch: assign.length
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(changed));
                        }
                        else {


                            console.log(variable);
                            changed = changed.childNodes[newPath[0]];
                            var lenvar = len - 1;

                            while (lenvar !== 0) {
                                changed = changed.childNodes[newPath[len - lenvar]];
                                lenvar--;
                            }

                            changed.Files.push({
                                name: Foldername,
                                title: title,
                                content: content,
                                path: newPath,
                                insearch: assign.length
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(variable));
                        }
                        var addNewFolder = JSON.parse(localStorage.getItem('storedValues'));
                        addNewFolder.push({
                            firstone: Foldername,
                            secondone: newPath,
                            type: "File",
                            id: changed.Files.length - 1
                        })
                        localStorage.setItem('storedValues', JSON.stringify(addNewFolder));


                        reader.Changeopac(false);
                        reader.updatefile(false);

                    }
                    else {
                        // var Foldername = input;
                        // var path_reader = reader.path_reader;
                        // var len = (path_reader.length);
                        // var changed = JSON.parse(localStorage.getItem('CompleteStructure'));
                        // var variable = changed;
                        // var assign = JSON.parse(localStorage.getItem('storedValues'))
                        // var newPath = path_reader;
                        if (len === 0) {

                            newPath.push(changed.childNodes.length);
                            changed.childNodes.push({
                                name: Foldername,
                                key: "hdjh",
                                path: newPath,
                                insearch: assign.length,
                                childNodes: [],
                                Files: [],
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(changed));
                        }
                        else if (len === 1) {

                            lenvar = len;
                            newPath.push(changed.childNodes[newPath[0]].childNodes.length)
                            changed.childNodes[path_reader[0]].childNodes.push({
                                name: Foldername,
                                path: newPath,
                                insearch: assign.length,
                                key: "hdjh",
                                childNodes: [],
                                Files: [],
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(changed));


                        }
                        else {
                            changed = changed.childNodes[newPath[0]].childNodes;
                            lenvar = len - 1;
                            while (lenvar !== 0) {
                                changed = changed[path_reader[len - lenvar]].childNodes;
                                console.log(changed);
                                lenvar--;
                            }
                            newPath.push(changed.length);
                            changed.push({
                                name: Foldername,
                                path: newPath,
                                insearch: assign.length,
                                key: "hdjh",
                                childNodes: [],
                                Files: [],
                            });
                            localStorage.setItem('CompleteStructure', JSON.stringify(variable));
                        }
                        addNewFolder = JSON.parse(localStorage.getItem('storedValues'));
                        addNewFolder.push({
                            firstone: Foldername,
                            secondone: newPath,
                            type: "Folder",
                            id: newPath
                        })
                        localStorage.setItem('storedValues', JSON.stringify(addNewFolder));
                        localStorage.setItem('Add_folder', false);
                        reader.Changeopac(false);
                        reader.updatefolder(false);

                    }
                }}>Create {props.Type}</button>
            </div>
        </div>
        <div />
    </div>
    );
}