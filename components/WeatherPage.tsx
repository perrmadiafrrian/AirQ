import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/miyg.png";
import { FunctionComponent } from "react";

type PageProps = {
  location?: string;
  temperature?: string;
  date?: string;
  year?: string | number | null;
};

const WeatherPage: FunctionComponent<PageProps> = ({
  location,
  temperature,
  date,
  year,
}: PageProps) => {
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
        <span className={styles.side_text}>{location}</span>
      </div>
      <div className={styles.center_container}>
        <span className={styles.temperature}>
          {temperature}
          <span className={styles.unit}>°C</span>
        </span>
      </div>
      <div className={styles.bottom_container}>
        <span className={styles.side_text}>{date}</span>
        <span className={styles.side_text}>{year}</span>
      </div>
    </div>
  );
};

export default WeatherPage;
