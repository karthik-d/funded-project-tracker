import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';

function Opt_button({props}){
    return (<Link href={props.url}> 
            <button>{props.name}</button></Link>);
}

export default function Options() {
    const options =[ {"url":"/registered_user/proposal",
                      "name":"Submit proposal"}
                      ,
                      {"name":"Guest Search",
                        "url":"nothing"
                      }

                    ];
  return (
    <div className={styles.option}>
    <center><h1>Available Options</h1></center> 
      <ul>
      {options.map((opt) => {
        
            return <Opt_button props={opt} />
      
      })}
    </ul>
    </div>

  )
}
