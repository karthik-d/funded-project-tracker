import React from 'react';

import styles from './styles/ProjectCard.module.css';
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function ProjectCard(props) {

    const router = useRouter(); 
    const handleSubmit =  (e) => {
        e.preventDefault();
        
        let href= document.getElementById("link").href;
        console.log("HREF",href);
        
        // let data=JSON.parse(JSON.stringify(jsondata));
        router.push({
            pathname:"/guest/view_project",
                query: {"data":href}},"projectpage");
     
    }


    return (
            <a id = "link" href ={"//localhost:3000"+props[1]} onClick={handleSubmit}>
            <div className={styles.wrapper}>
            
                <div className={styles.card_container}>
                <span className={styles.pro}>{props[0][6]}</span>
                <img className={styles.round} src="../assets/imgs/user-profile.png" alt="user" />
                <h3 className={styles.h3}>{props[0][7]}</h3>
                <h6 className={styles.h6}>SSN Collge of Engineering</h6>
                <p className={`${styles.email} ${styles.p}`}>{props[2]}</p>
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
        </a>
        );
}