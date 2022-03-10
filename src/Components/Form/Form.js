import React, { useState } from 'react';
import styles from "./form.module.scss";

export default function Form(props) {
    const [input, setinput] = useState("");
    const [confirmInput, setconfirmInput] = useState("");
    const [value, setvalue] = useState(false);
    const [value1, setvalue1] = useState(false);
    function handleonchange(event) {
        var x = event.target.value;
        var y = event.target.name;
        if (y === "password") {
            setinput(x);
        }
        else {
            setconfirmInput(x);
        }
        setvalue1(false);
        setvalue(false);
    }
    return (
        <div className={props.mode ? styles.form : styles.formDark} style={props.whichone ? { position: "fixed", boxShadow: "0px 0px 21px 3px grey" } : {}}>
            <div className={styles.formInner}>
                <label>Password</label>
                <div>
                    <input name='password' value={input} type="password" placeholder='Enter New pin here' onChange={handleonchange} maxLength={4} />
                </div>
                <label>Confirm Password</label>
                <div>
                    <input name='Cpassword' value={confirmInput} type="password" placeholder='Confirm Pin here' onChange={handleonchange} maxLength={4} />
                </div>
                {value ? <p style={{ color: "red", fontSize: "20px", marginLeft: "30px" }}>Both password must be same</p> : <></>}
                {value1 ? <p style={{ color: "red", fontSize: "20px", marginLeft: "30px" }}>Please enter a valid 4 digit password</p> : <></>}
            </div>
            <div className={styles.formInnerInner}>
                {props.whichone ? <button onClick={() => { props.changedecision() }}>Cancel</button> : (<></>)}
                <button onClick={(event) => {

                    if (input.length < 4) {
                        setvalue1(true);
                    }
                    else if (input === confirmInput) {
                        (localStorage.setItem('password', input));
                        props.savechanges(input);
                    }
                    else {
                        setvalue(true);
                    }
                }}>
                    Save Changes
                </button>
            </div>
        </div>);
}

