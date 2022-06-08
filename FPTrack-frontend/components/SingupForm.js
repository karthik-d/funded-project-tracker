import styles from './styles/SignupForm.module.css';

import React from 'react';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.content} >
                <form className={styles.form} action="#">
                    <div className={styles.user_details}>
                        <div className={styles.input_box}>
                            <span className={styles.details}>Full Name</span>
                            <input type="text" placeholder="Enter your name" required />
                        </div>
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
                            < span className={styles.details}>Password</span>
                            <input type="text" placeholder="Enter your password" required />
                        </div >
                        <div className={styles.input_box}>
                            < span className={styles.details}>Confirm Password</span>
                            <input type="text" placeholder="Confirm your password" required />
                        </div >
                    </div >
                    <div className={styles.gender_details}>
                        < input type="radio" name="gender" id="dot-1" />
                        <input type="radio" name="gender" id="dot-2" />
                        <input type="radio" name="gender" id="dot-3" />
                        <span className={styles.gender_title}>Gender</span>
                        < div className={styles.category}>
                            <label for="dot_1" >
                                <span className={`${styles.dot} ${styles.one}`}></span>
                                <span className={styles.gender}>Male</span>
                            </ label>
                            <label for="dot_2">
                                <span className={`${styles.dot} ${styles.two}`}></span>
                                <span className={styles.gender}>Female</span>
                            </ label >
                            <label for="dot_3">
                                <span className={`${styles.dot} ${styles.three}`}></span>
                                <span className={styles.gender}>Prefer not to say</span>
                            </ label >
                        </div >
                    </ div >
                    <div className={styles.button}>
                        < input type="submit" value="Register" />
                    </div >
                </form>
            </div>

        );
    }
}




