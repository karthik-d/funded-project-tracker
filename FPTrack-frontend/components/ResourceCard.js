import React, { useState } from "react";

import styles from "./styles/ProjectCard.module.css";
import { useRouter } from "next/router";

import useSWR from "swr";

export default function ResourseCard(props) {
  let [count, setCount] = useState(0);

  console.log("recource card", { props });
  const setCount_modified = (counter) => {
    if (counter < 0 || counter > props.avl_qty) return;
    setCount(counter);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (count > 0) alert(count);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_container}>
        <span className={styles.pro}>{props.name}</span>
        <h3 className={styles.h3}>{props.kind}</h3>
        <h6 className={styles.h6}>SSN Collge of Engineering</h6>
        <p className={`${styles.email} ${styles.p}`}>{props.description}</p>
        <p className={`${styles.email} ${styles.p}`}>
          Avilable quantity: {props.avl_qty}
        </p>
      </div>
    </div>
  );
}
