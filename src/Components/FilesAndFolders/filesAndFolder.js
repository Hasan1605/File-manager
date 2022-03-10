import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import styles from "./filesAndFolders.module.scss"
import { FiFolder, FiFile } from "react-icons/fi";
import { AiOutlineFolderOpen } from "react-icons/ai";

var variable = JSON.parse(localStorage.getItem('CompleteStructure'))
function Input(props) {
    const [value, setvalue] = useState(props.value.content)
    return (<>
        <div className={styles.file_showing_div}>
            <h1 style={{ margin: "20px", borderBottom: "solid 1px grey" }}>{props.value.title}</h1>
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
    </>)
}
function DivInner(props) {
    const [show, setshow] = useState(false);
    const reader = useContext(Context);
    const background = (reader.mode) ? "#1a8fe3" : "#00406c";
    return (<>
        <div className={styles.Folders_div_inner} style={show ? { marginLeft: (props.marg), backgroundColor: background } : { marginLeft: (props.marg) }} onClick={() => { setshow(true) }}>
            <p>{
                <FiFile style={{ marginRight: "5px" }} />
            }{props.file.name}</p>
        </div>
        {
            show && <Input value={props.file} cancel={() => { setshow(false) }} />
        }
    </>)
}

function FirstDivInner(props) {
    const [show, setshow] = useState(false);
    const reader = useContext(Context);
    const background = (reader.mode) ? "#1a8fe3" : "#00406c";
    return (<>
        <div className={styles.Folders_div} style={show ? { marginLeft: (0), backgroundColor: background } : { marginLeft: (0) }} onClick={() => { setshow(true) }}>
            <p>{
                <FiFile style={{ marginRight: "5px" }} />
            }{props.file.name}</p>
        </div>
        {
            show && <Input value={props.file} cancel={() => { setshow(false) }} />
        }
    </>)
}

function Div(props) {
    const reader = useContext(Context);
    return (<>
        {
            props.File.map((file, key) => {
                return (<>
                    <DivInner file={file} marg={props.marg} />
                </>)
            })
        }
    </>);
}

export default function FilesandFolders(props) {
    const reader = useContext(Context);

    const background = (reader.mode) ? "#1a8fe3" : "#00406c"
    const color = (reader.mode) ? "white" : "#ced4da"
    const path_reader = reader.path_reader;
    const len_main = path_reader.length;

    function Child(props) {
        var len = props.len;

        return (<>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", borderLeft: "solid #6c757d65 1px", marginLeft: (len * 5) }}>
                {
                    props.Folder_name.childNodes.map((Structure, key) => {
                        return (
                            <>
                                <div className={styles.Folders_div_inner} style={len_main > len && path_reader[len] === key ? { backgroundColor: background, marginLeft: (len * 5) } : { marginLeft: (len * 5) }} onClick={() => {
                                    if (len_main === len) {
                                        path_reader.push(key);
                                        localStorage.setItem('currentpath', JSON.stringify(path_reader));
                                        reader.update();
                                    } else {
                                        var x = path_reader;
                                        while (x.length != len) {
                                            x.pop()
                                        }
                                        localStorage.setItem('currentpath', JSON.stringify(x));
                                        reader.update();
                                    }
                                }}>
                                    <p style={len_main > len && path_reader[len] === key ? { color: color } : {}}> {len_main > len && path_reader[len] === key ? <AiOutlineFolderOpen style={{ marginRight: "5px" }} /> : <FiFolder style={{ marginRight: "5px" }} />}{Structure.name}</p>
                                </div>
                                {(len_main > len && path_reader[len] === key) && <Child Folder_name={Structure} len={props.len + 1} />}
                            </>
                        )
                    })

                }
                <Div File={props.Folder_name.Files} marg={(len * 5)} />
            </div>
        </>)
    }
    return (<>
        <div className={props.mode ? styles.main : styles.main_Dark}>
            {
                JSON.parse(localStorage.getItem('CompleteStructure')).childNodes.map((Structure, key) => {
                    { console.log(key); }
                    return (
                        <>
                            <div className={styles.Folders_div} style={len_main > 0 && path_reader[0] === key ? { backgroundColor: background } : {}} onClick={() => {
                                console.log(len_main);
                                if (len_main === 0) {
                                    path_reader.push(key);
                                    localStorage.setItem('currentpath', JSON.stringify(path_reader));
                                    reader.update();
                                } else if (path_reader[0] !== key) {
                                    var x = [key];
                                    localStorage.setItem('currentpath', JSON.stringify(x));
                                    reader.update();
                                }
                                else {
                                    localStorage.setItem('currentpath', JSON.stringify([]));
                                    reader.update();
                                }
                            }}>
                                <p style={len_main > 0 && path_reader[0] === key ? { color: color } : {}}>{len_main > 0 && path_reader[0] === key ? (<AiOutlineFolderOpen style={{ marginRight: "5px" }} />) : <FiFolder style={{ marginRight: "5px" }} />}{Structure.name}</p>
                            </div>
                            {(len_main > 0 && path_reader[0] === key) && <Child Folder_name={Structure} len={1} />}

                        </>

                    );
                })
            }

            {/* <Div File={JSON.parse(localStorage.getItem('CompleteStructure')).Files} />
             */}
            {
                JSON.parse(localStorage.getItem('CompleteStructure')).Files.map((file) => {
                    return (<>
                        <FirstDivInner file={file} />
                    </>)
                })
            }

        </div>
    </>)
}