import styles from './styles/SignupForm.module.css';

import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.data = {
            roles: [{ name: "Admin", id: "admin" }, { name: "User", id: "user" }, { name: "Resource Manager", id: "rsrc_mgr" }]
        }
    }

    render() {
        return (
            <div className={styles.content}>
                <h2 className={styles.h2}>Hey, {this.props.name}!<br />Just a few more details...</h2>
                <div className={styles.wrapper}>
                    <div className={styles.content} >
                        <form className={styles.form} action="#">
                            <div className={styles.user_details}>
                                <div className={styles.input_box}>
                                    <span className={styles.details}>Username</span>
                                    <input type="text" placeholder="Enter your username" required />
                                </div>
                                <div className={styles.input_box}>
                                    <span className={styles.details}>Email</span>
                                    <input type="text" placeholder="Enter your email" required />
                                </div >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>Phone Number</span>
                                    <input type="text" placeholder="Enter your number" required />
                                </div >
                                <div className={styles.input_box}>
                                    < span className={styles.details}>Access Rights</span>
                                    <Multiselect
                                        style={{
                                            multiselectContainer: {
                                                width: 'fit-content'
                                            }
                                        }}
                                        options={this.data.roles}
                                        displayValue="name"
                                    />
                                </div >
                            </div >
                            <div className={styles.button}>
                                < input type="submit" value="Register" />
                            </div >
                        </form>
                    </div>
                </div >
            </div >
        );
    }
}




