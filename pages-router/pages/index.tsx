import { gql } from "@apollo/client";
import { createApolloClient } from "../client";
import styles from "./page.module.css";
import { Posts } from "../src/generated/graphql";
import Image from "next/image";
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



interface HomeProps {
  posts: Posts[];
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
              <p>By: {post.author.name}</p>
              <Image
                src={post.thumbnail || "/placeholder.png"}
                alt={post.title || "Post image"}
                width={500}
                height={300}
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
