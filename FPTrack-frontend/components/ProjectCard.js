import React from 'react';

import styles from './styles/ProjectCard.module.css';
import { useRouter } from 'next/router'

import useSWR from 'swr'

export default function ProjectCard(props) {

    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();

        let href = document.getElementById("link").href;
        console.log("HREF", href);


        // let data=JSON.parse(JSON.stringify(jsondata));
        router.push({
            pathname: "/guest/project_page",
            query: { "data": href }
        }, "projectpage");

    }


    return (
        <a id="link" href={"//localhost:3000" + props[1]} onClick={handleSubmit}>
            <div className={styles.wrapper}>
                <div className={styles.card_container}>
                    <h6 className={styles.h6}>SSN Collge of Engineering</h6>
                    <h3 className={styles.pro}>{props[0][6]}</h3>
                    <p className={`${styles.email} ${styles.p}`}>{props[2]}</p>
                    <div className={styles.skills}>
                        <ul>
                            {
                                props[0][7].map((domain, idx) => {
                                    return (<li key={idx}>{domain}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div >
            </div>
        </a>
    );
}