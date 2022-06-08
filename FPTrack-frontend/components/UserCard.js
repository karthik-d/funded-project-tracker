import React from 'react';

import styles from './styles/UserCard.module.css';

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.wrapper}>
                <div className={styles.card_container}>
                    <span className={styles.pro}>{this.props.role}</span>
                    <img className={styles.round} src="../assets/imgs/user-profile.png" alt="user" />
                    <h3 className={styles.h3}>{this.props.name}</h3>
                    <h6 className={styles.h6}>SSN Collge of Engineering</h6>
                    <p className={`${styles.email} ${styles.p}`}>{this.props.email}</p>
                    <div className={styles.skills}>
                        <h6>Access Rights</h6>
                        <ul>
                            {
                                this.props.access.map((access, idx) => {
                                    return (<li key={idx}>{access}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div >
            </div>
        );
    }
}

// first_name: { type: String, required: true, maxLength: 100 },
// last_name: { type: String, required: true, maxLength: 100 },
// date_of_birth: { type: Date },
// email: { type: String, required: true, unique: true },
// role: { type: String, required: true, enum: ['student', 'faculty'] },
// access: {
//     type: [{ type: String, enum: ['admin', 'resource_mgr', 'user'] }],
//         required: true