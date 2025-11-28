import {  useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { initializeApollo, addApolloState } from '../client';
import  RootLayout  from './layout';
import { POSTS_QUERY } from "../src/queries/queries";

interface Post {
  databaseId: number;
  title: string;
}

interface PostEdge {
  node: Post;
}

const POSTS_PER_PAGE = 10;


export default function SSR() {
  const { loading, error, data } = useQuery(POSTS_QUERY, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });
  const posts = data?.posts ?? [];
  const havePosts = Boolean(posts.length);

  return (
    <RootLayout>
      <h1>SSR Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post: Post) => {
          return (
            <article
              key={null}
              style={{
                border: '2px solid #eee',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '10px',
              }}
            >
              <h2>{post.title}</h2>
              {/* <img src={post} alt={post.title} /> */}
            </article>
          );
        })
      )}
    </RootLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: Posts,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}