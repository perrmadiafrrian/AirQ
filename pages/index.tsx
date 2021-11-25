import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/miyg.png";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rookino - AirQ</title>
        <meta
          name="description"
          content="A simple weather app built in NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top_container}>
        <div className={styles.miyg_logo}>
          <Image src={logo} alt="miyg" />
        </div>
        <span className={styles.side_text}>Colomadu</span>
      </div>
      <div className={styles.center_container}>
        <span className={styles.temperature}>
          22
          <span className={styles.unit}>°C</span>
        </span>
      </div>
      <div className={styles.bottom_container}>
        <span className={styles.side_text}>November, 25th</span>
        <span className={styles.side_text}>2021</span>
      </div>
    </div>
  );
};

export default Home;
