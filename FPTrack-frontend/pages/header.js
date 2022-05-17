import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
      <center>
        <a href="/"><img src="/logo.png" height="100px"></img></a>
      </center>
    </div>
  )
}
