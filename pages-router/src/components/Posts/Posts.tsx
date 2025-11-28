import { FC } from "react";
import Image from "next/image";
import type { Posts } from "../../generated/graphql";
import styles from "../../../styles/global.module.css";

const Posts: FC<{ posts: Posts[] }> = ({ posts }) => {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>By: {post.author.name}</p>
              <Image
                src={post.thumbnail || "/blog.jpeg"}
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
)
};

export default Posts;