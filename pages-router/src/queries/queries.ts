import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
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