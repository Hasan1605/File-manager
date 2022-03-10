import Context from "./Context"
import React, { useState } from "react"
const ContextContainer = (props) => {
    const [path_reader, setpath_reader] = useState([]);
    const [mode, setmode] = useState(true);
    const [opac, setopac] = useState(true);
    const [Add_folder, setAdd_folder] = useState(false);
    const [Add_file, setAdd_file] = useState(false);
    const update = () => {
        var x = JSON.parse(localStorage.getItem('currentpath'));
        setpath_reader(x);
    }

    const Changemode = () => {
        setmode(!mode);
    }

    const Changeopac = (x) => {
        setopac(x);
    }
    const updatefolder = (x) => {
        console.log("Working");
        setAdd_folder(x);
    }
    const updatefile = (x) => {
        setAdd_file(x);
    }
    return (
        <Context.Provider value={{ path_reader, mode, update, Changemode, opac, Changeopac, Add_folder, Add_file, updatefolder, updatefile }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextContainer;
