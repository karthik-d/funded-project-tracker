import React from 'react';

import styles from './styles/ProjectCard.module.css';
export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("Project card",this.props);
        return (
            <div className={styles.wrapper}>
            <div className={styles.card_container}>
                <span className={styles.pro}>{this.props[0]}</span>
                <img className={styles.round} src="../assets/imgs/user-profile.png" alt="user" />
                <h3 className={styles.h3}>{this.props[1]}</h3>
                <h6 className={styles.h6}>SSN Collge of Engineering</h6>
                <p className={`${styles.email} ${styles.p}`}>{this.props[2]}</p>
                <div className={styles.skills}>
                    <h6>Access Rights</h6>
                    {/* <ul>
                        {
                            this.props.access.map((access, idx) => {
                                return (<li key={idx}>{access}</li>);
                            })
                        }
                    </ul> */}
                </div>
            </div >
        </div>
        );
    }
}