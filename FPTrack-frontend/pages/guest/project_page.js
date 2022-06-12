import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import FullProject from '../../components/FullProjectCard'





export default function Project(props) {

  const fetcher = (url) => fetch(url).then((res) => res.json());
    const router = useRouter();
    const { data, error } = useSWR(router.query.data, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
     // render data
     console.log(data);
  return (
    <div className={styles.container}>
    <Header></Header>
<<<<<<< HEAD
    <FullProposal props={data[0]}/>
=======
    <FullProject props={data[0]}/>
>>>>>>> 2aa164e3c89e56b5e76ee9dbeba245768e89a2fa
    </div>
  );
}
