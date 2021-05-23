import { Container } from "@material-ui/core";
import Head from "next/head";
import Landing from "../components/Landing";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Container>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Shreeyansh Bhardwaj" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Landing />
        </main>
      </Container>
    </>
  );
}
