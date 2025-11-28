import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
      content
      author {
        id
        name
        photo
      }
      thumbnail
      createdAt
    }
  }
`;