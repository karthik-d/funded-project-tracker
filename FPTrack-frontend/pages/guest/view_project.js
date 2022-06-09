import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import { useRouter } from 'next/router'

export default function Project(props) {
      
    const router = useRouter();
    console.log(router.query); 
  return (
    <div className={styles.container}>
    <Header></Header>
    </div>
  )
}
