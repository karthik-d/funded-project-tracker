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
  const router = useRouter();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (count > 0) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rsrc_mgr_id: "628f1954f5b6a7772b9885b0",
          project_id: props.project_id,
          rsrc_grp_id: props._id,
          qty: count,
        }),
      };

      console.log(requestOptions);
      console.log(props);
      const axios = require("axios");

      axios
        .put("http://localhost:3000/api/resource-assignment", {
          rsrc_mgr_id: "628f1954f5b6a7772b9885b0",
          project_id: props.project_id,
          rsrc_grp_id: props._id,
          qty: count,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
      console.log("called fetcher");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_container}>
        <span className={styles.pro}>{props.name}</span>
        <h3 className={styles.h3}>{props.kind}</h3>
        <h6 className={styles.h6}>SSN Collge of Engineering</h6>
        <p className={`${styles.email} ${styles.p}`}>{props.description}</p>
        <p className={`${styles.email} ${styles.p}`}>
          Available quantity: {props.avl_qty}
        </p>
        <div>
          Requesting Quantity :
          <button onClick={() => setCount_modified(count + 1)}>+</button>
          <span>{count}</span>
          <button onClick={() => setCount_modified(count - 1)}>-</button>
          <button onClick={handlesubmit}>Request</button>
        </div>
      </div>
    </div>
  );
}
