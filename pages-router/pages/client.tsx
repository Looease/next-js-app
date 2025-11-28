import { useQuery } from "@apollo/client";
import styles from "../styles/global.module.css";
import Posts from "../src/components/Posts/Posts";
import { POSTS_QUERY } from "../src/queries/queries";
import RootLayout from "./layout";

const Client = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);

  const posts = data?.posts ?? [];
  const havePosts = Boolean(posts.length);

  return (
    <RootLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Client-Side Rendering</h1>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error loading posts: {error.message}</p>
          ) : !havePosts ? (
            <p>No posts found.</p>
          ) : (
            <Posts posts={posts} />
          )}
        </main>
      </div>
    </RootLayout>
  );
};

export default Client;