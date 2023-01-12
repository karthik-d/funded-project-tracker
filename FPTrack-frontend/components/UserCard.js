import { React, useState } from "react";

import styles from "./styles/UserCard.module.css";

import { useRouter } from "next/router";

import useSWR from "swr";
export default function User(props) {
  if (props.props != null) props = props.props;
  const router = useRouter();

  const [href, setHref] = useState("//localhost:3000/api/user/" + props._id);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HREF", href);

    // let data=JSON.parse(JSON.stringify(jsondata));
    router.push(
      {
        pathname: "/guest/user_page",
        query: { data: href },
      },
      "userpage"
    );
  };
  console.log("access", props.access);
  console.log("uservcard", props);

  return (
    <a
      id="link"
      href={"//localhost:3000/api/user/" + props._id}
      onClick={handleSubmit}
    >
      <div className={styles.wrapper}>
        <div className={styles.card_container}>
          <span className={styles.pro}>{props.role}</span>
          <img
            className={styles.round}
            src="../assets/imgs/user-profile.png"
            alt="user"
          />
          <h3 className={styles.h3}>{props.name}</h3>
          <h6 className={styles.h6}>SSN Collge of Engineering</h6>
          <p className={`${styles.email} ${styles.p}`}>{props.email}</p>
          <div className={styles.skills}>
            <h6>Access Rights</h6>
            <ul>
              {props.access.map((access, idx) => {
                return <li key={idx}>{access}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
}

// first_name: { type: String, required: true, maxLength: 100 },
// last_name: { type: String, required: true, maxLength: 100 },
// date_of_birth: { type: Date },
// email: { type: String, required: true, unique: true },
// role: { type: String, required: true, enum: ['student', 'faculty'] },
// access: {
//     type: [{ type: String, enum: ['admin', 'resource_mgr', 'user'] }],
//         required: true
