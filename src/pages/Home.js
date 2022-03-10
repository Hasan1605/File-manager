import React from "react";
import Form from "../Components/Form/Form"
import styles from "../styles/home.module.scss";
import logo from "../Images/logo.png";
import img from "../Images/img1 (1).png";

export default function Home(props) {
    var buttonName = "Save Changes";
    return (
        <div className={styles.Home}>
            <div className={styles.outterHome}>
                <img className={styles.logo} src={logo} alt="logo"></img>
                <div className={styles.innerHome}>
                    <h1>
                        Welcome to your
                        Dashboard
                    </h1>
                    <p>
                        This is the homepage of your
                    </p>
                    <p>
                        file explorer,set your pin and start
                    </p>
                    <img src={img} alt="img" />
                </div>
            </div>
            <div className={styles.sideHome}>
                <Form className={styles.form} buttonName={buttonName} savechanges={() => { props.savechanges() }} whichone={false} />
            </div>
        </div>);
}