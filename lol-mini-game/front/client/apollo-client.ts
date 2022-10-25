import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4002/graphql'
      : process.env.SERVER_URL,
  cache: new InMemoryCache(),
});

export default client;
