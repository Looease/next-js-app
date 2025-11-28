import { gql } from "@apollo/client";
import { createApolloClient } from "../client";
import styles from "./page.module.css";

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts {
      id
      title
      content
      author {
        name
      }
      thumbnail
      createdAt
    }
  }
`;

type Post = {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  thumbnail: string;
  createdAt: string | number | Date;
};

interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Training App</h1>

        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>By: {post.author.name}</p>
              <img
                src={post.thumbnail}
                alt={post.title}
                className={styles.thumbnail}
              />
              <p>
                Posted on:{" "}
                <span>{post.createdAt}</span>
              </p>
            </div>
          ))}
        </div>
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
