import React, { useState } from "react";
import styles from "./Lock.module.scss";

export default function Lock(props) {
    var password = "";
    const [input1, setinput1] = useState("");
    const [input2, setinput2] = useState("");
    const [input3, setinput3] = useState("");
    const [input4, setinput4] = useState("");
    console.log(props.mode);
    function handlePress(event) {

        var x = (event.target.name);
        var y = (event.nativeEvent.inputType);
        var z = (event.nativeEvent.data);
        console.log(y);

        if (x == "input1") {
            if (y === "insertText") {
                const nextfield = document.querySelector(
                    'input[name=input2]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }
                setinput1(z);
            }
            if (y === "deleteContentBackward") {
                setinput1("");
            }

        }
        else if (x == "input2") {
            if (y === "insertText") {

                const nextfield = document.querySelector(
                    'input[name=input3]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }
                setinput2(z)
            }
            if (y === "deleteContentBackward") {
                const nextfield = document.querySelector(
                    'input[name=input1]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }
                setinput2("");
            }

        }
        else if (x == "input3") {
            if (y === "insertText") {
                setinput3(z);
                const nextfield = document.querySelector(
                    'input[name=input4]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }

            }
            if (y === "deleteContentBackward") {

                const nextfield = document.querySelector(
                    'input[name=input2]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }

                setinput3("");
            }
        }
        else if (x == "input4") {
            if (y === "insertText") {
                setinput4(z);
            }
            if (y === "deleteContentBackward") {
                const nextfield = document.querySelector(
                    'input[name=input3]'
                );
                if (nextfield !== null) {
                    nextfield.focus();
                }
                setinput4("");
            }
        }
    }
    const settodefault = () => {
        setinput1("");
        setinput2("");
        setinput3("");
        setinput4("");
        const nextfield = document.querySelector(
            'input[name=input1]'
        );
        if (nextfield !== null) {
            nextfield.focus();
        }

    }
    return (
        <form name="button1" className={props.mode ? styles.formmain : styles.formmainDark} style={props.lock ? { display: "flex" } : { display: "none" }}>
            <div className={props.mode ? styles.Lock_main : styles.Lock_Darkmain}>
                <h1>{props.text}</h1>
                <div className={styles.Lock_inner}>
                    <div><input name="input1" value={input1} type="password" onChange={handlePress} autoFocus={true} maxLength={1}></input></div>
                    <div><input name="input2" value={input2} type="password" onChange={handlePress} maxLength={1}></input></div >
                    <div><input name="input3" value={input3} type="password" onChange={handlePress} maxLength={1}></input></div >
                    <div><input name="input4" value={input4} type="password" onChange={handlePress} maxLength={1}></input></div >
                </div>
                <button type="submit" onClick={(event) => { password = (input1 + input2 + input3 + input4); props.Unlock(password); settodefault(); event.preventDefault(); }}>Enter</button>
            </div>
        </form>
    )
}
