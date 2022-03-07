import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cloudinary Task</title>
        <meta name="description" content="A home exercise by Jonathan Weiss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>yo</main>

      <footer className={styles.footer}>
        <span>Created by Jonathan Weiss</span>
      </footer>
    </div>
  );
}
