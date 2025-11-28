import styles from "../styles/global.module.css";
import RootLayout from "./layout";
import Link from "next/link";

const Home = () => {
  return (
    <RootLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Training App</h1>
          <div className={styles.cardGrid}>
            <Link href="/ssr" className={styles.card}>
              <h2>Server-Side Rendering</h2>
              <p>
                Explore SSR with Apollo Client. Data is fetched on the server
                for every request using getServerSideProps.
              </p>
              <span className={styles.badge}>SSR</span>
            </Link>

            <Link href="/gipHydration" className={styles.card}>
              <h2>getInitialProps Hydration</h2>
              <p>
                Learn about cache hydration with getInitialProps. Data fetched
                on server, rehydrated on client.
              </p>
              <span className={styles.badge}>Hybrid</span>
            </Link>

            <Link href="/client" className={styles.card}>
              <h2>Client-Side Rendering</h2>
              <p>
                Pure client-side data fetching with Apollo useQuery hook.
                Perfect for dynamic, user-specific data.
              </p>
              <span className={styles.badge}>CSR</span>
            </Link>
          </div>
        </main>
      </div>
    </RootLayout>
  );
};

export default Home;
