import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GoogleSignin from '../components/auth/google_oauth'
import React, { useEffect } from 'react';

export default function Header() {

  return (
    <div className={styles.header}>
      <Head>
        <title>FpTrack App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <center>
        <a href="/"><img src="/logo.png" height="100px"></img></a>
      </center>
      <div>
        <p className={styles.pageTitle}>
          Funded Project Tracker
        </p>
      </div>
      <GoogleSignin />
    </div>
  )
}
