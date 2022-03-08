import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { RecoilRoot } from "recoil";
import ImageTagger from "../components/ImageTagger/index.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Tagger</title>
        <meta name="description" content="A home exercise by Jonathan Weiss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RecoilRoot>
        <main>
          <ImageTagger />
        </main>
      </RecoilRoot>
    </div>
  );
}
