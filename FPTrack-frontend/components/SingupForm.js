import styles from './styles/SignupForm.module.css';

import React from 'react';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className={styles.signup}>
                <div className={styles.container}>
                    <div className={styles.signup_content}>
                        <div className={styles.signup_form}>
                            <h2 className={styles.form_title}>Sign up</h2>
                            <form method="POST" className={styles.register_form} id="register_form">
                                <div className={styles.form_group}>
                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                </div >
                                <div className={styles.form_group}>
                                    <input type="email" name="email" id="email" placeholder="Your Email" />
                                </div >
                                <div className={styles.form_group}>
                                    <input type="password" name="pass" id="pass" placeholder="Password" />
                                </div >
                                <div className={styles.form_group}>
                                    < input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                </div >

                                <div className={`${styles.form_group} ${styles.form_button}`} >
                                    <input type="submit" name="signup" id="signup" className={styles.form_submit} value="Register" />
                                </div>
                            </form >
                        </div >
                    </div >
                </div >
            </section >
        );
    }
}




