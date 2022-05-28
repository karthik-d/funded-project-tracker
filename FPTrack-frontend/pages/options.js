import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

function Opt_button({ props }) {
  return (
    <Link href={props.url}>
      <button>{props.name}</button>
    </Link>);
}

export default function Options() {

  const options = [
    {
      "name": "Submit proposal",
      "url": "/registered_user/proposal",
      "key": "submit_proposal"
    }
    ,
    {
      "name": "Guest Search",
      "url": "nothing",
      "key": "search_guest"
    },
    {
      "name": "View Users",
      "url": "viewusers",
      "key": "view_users"
    },
    {
      "name": "View Resources",
      "url": "viewresrcs",
      "key": "view_resources"
    }
  ];

  return (
    <div className={styles.option}>
      <center><h1>Available Options</h1></center>
      <ul>
        {options.map((opt) => {
          return <Opt_button props={opt} key={opt.key} />
        })}
      </ul>
    </div>

  )
}
