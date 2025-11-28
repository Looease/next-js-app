"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import styles from "./page.module.css";

type Post = {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  thumbnail: string;
  createdAt: string | number | Date;
};

const Home = () => {
  const { loading, error, data } = useQuery()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts: Post[] = data?.posts || [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Training App</h1>

        <div className={styles.grid}>
          {posts.map((post: Post) => (
            <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>By: {post.author.name}</p>
              <Image src={post.thumbnail} alt={post.title} className={styles.thumbnail} width={200} height={200} />
              <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;