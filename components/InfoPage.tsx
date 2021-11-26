import { FunctionComponent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

type PageProps = {
  message?: string;
};

const InfoPage: FunctionComponent<PageProps> = ({ message }: PageProps) => {
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
      <div className={styles.center_container}>
        <div className={styles.info}>{message}</div>
      </div>
    </div>
  );
};

export default InfoPage;
