import React from 'react';
import styles from '../../components/styles/FullProjectCard.module.css';
import useCollapse from 'react-collapsed';

export default function FullProject(props){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (

        <div>
            <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'Expand'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                Now you can see the hidden content. <br/><br/>
                Click again to hide...
            </div>
        </div>
            <div className={styles.wrapper}>
            <div className={styles.card_container}>
                <h1 className={styles.h1}>Title</h1>
                <div className={styles.h3}>Domain</div>
                <h3 >Leader</h3>
                <h6 className={styles.h6}>Members</h6>
                <p className={`${styles.email} ${styles.p}`}>Supervisors</p>
                <div><span>proposed budget</span><span>allocated buddget</span></div>
                

            </div >
            
        </div>
        <br></br>
        Status/Outcomes
        
        <br></br>
        Resources
        <div className={styles.wrapper}>
            <div className={styles.card_container}>
                <h1 className={styles.h1}>Title</h1>
                <div className={styles.h3}>Domain</div>
                <h3 >Leader</h3>
                <h6 className={styles.h6}>Members</h6>
                <p className={`${styles.email} ${styles.p}`}>Supervisors</p>
                <div><span>proposed budget</span><span>allocated buddget</span></div>
                

            </div >
            
        </div>
        </div>
    );

}