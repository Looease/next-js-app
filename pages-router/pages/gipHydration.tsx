import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState, APOLLO_STATE_PROP_NAME, useApollo } from '../client';
import RootLayout from './layout';
import { POSTS_QUERY } from '../src/queries/queries';
import Posts from "../src/components/Posts/Posts";

interface Post {
  databaseId: number;
  title: string;
}

interface SSRPageProps {
  [APOLLO_STATE_PROP_NAME]: any; // for rehydration
}

const POSTS_PER_PAGE = 10;

export default function SSR(props: SSRPageProps) {
  // Rehydrate Apollo cache with the server-fetched data
  const apolloClient = useApollo(props);

  // Now use Apollo hooks as normal
  const { loading, error, data } = useQuery(POSTS_QUERY, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
    client: apolloClient,
  });

  const posts = data?.posts ?? [];
  const havePosts = Boolean(posts.length);

  return (
    <RootLayout>
      <h1>SSR Page with getInitialProps</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No posts found.</p>
      ) : (
        <Posts posts={posts} />
      )}
    </RootLayout>
  );
}

// getInitialProps runs on server for first load, and on client during navigation
SSR.getInitialProps = async (ctx) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });

  // Add Apollo cache to props for rehydration
  return addApolloState(apolloClient, { props: {} }).props;
};
