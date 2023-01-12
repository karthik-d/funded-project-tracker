import { React, useState } from "react";

import styles from "./styles/ProjectCard.module.css";
import { useRouter } from "next/router";

import useSWR from "swr";

export default function PrposalCard(props) {
  const router = useRouter();
  const [href, setHref] = useState(
    "//localhost:3000/api/proposal/" + props.props._id
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // let data=JSON.parse(JSON.stringify(jsondata));
    router.push({
      pathname: "/guest/proposal_page",
      query: { data: href },
    });
  };
 
  console.log("proposalcard", props);
  return (
    <a
      id="link"
      href={"//localhost:3000/api/proposal/" + props[1]}
      onClick={handleSubmit}
    >
      <div className={styles.wrapper}>
        <div className={styles.card_container}>
          <h6 className={styles.h6}>{props.props.title}</h6>
          <h3 className={styles.pro}>{props.props.funding_type}</h3>
          <p className={`${styles.email} ${styles.p}`}>
            {props.props.funding_agency}
          </p>
          <div className={styles.skills}>Rs{props.props.budget}</div>
        </div>
      </div>
    </a>
  );
}
