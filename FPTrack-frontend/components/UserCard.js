import React from 'react';

import styles from './UserCard.module.css';

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.card_container}>
                    <span className={styles.pro}>Leader</span>
                    <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                    <h3 className={styles.h3}>Ricky Park</h3>
                    <h6 className={styles.h6}>New York</h6>
                    <p className={styles.p}>User interface designer and <br /> front-end developer</p>
                    <div className={styles.buttons}>
                        <button className={styles.primary}>
                            Message
                        </button>
                        <button className={`${styles.primary} ${styles.ghost}`}>
                            Following
                        </button>
                    </div>
                    <div className={styles.skills}>
                        <h6>Roles</h6>
                        <ul>
                            <li>UI / UX</li>
                            <li>Front End Development</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Node</li>
                        </ul>
                    </div>
                </div >
            </div>
        );
    }
}