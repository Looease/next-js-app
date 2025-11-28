import { createApolloClient } from "../client";
import styles from "../styles/global.module.css";
import Posts from "../src/components/Posts/Posts";
import { POSTS_QUERY } from "../src/queries/queries";

interface HomeProps {
  posts: Posts[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Training App</h1>
        <Posts posts={posts} />
      </main>
    </div>
  );
};

Home.getInitialProps = async () => {
  const client = createApolloClient();

  const { data } = await client.query({
    query: POSTS_QUERY,
  });

  return {
    posts: data.posts,
  };
};

export default Home;
