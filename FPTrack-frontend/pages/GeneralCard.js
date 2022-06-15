import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function General(props) {
  const router = useRouter();
  return <div>{JSON.stringify(router.query)}</div>;
}
