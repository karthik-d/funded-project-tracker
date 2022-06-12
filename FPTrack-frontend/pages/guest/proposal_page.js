import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import FullProposal from '../../components/FullProposalCard'




export default function Proposal(props) {
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
    <FullProposal props={data[0]}/>
    </div>
  );
}
