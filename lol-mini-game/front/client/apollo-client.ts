import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4002/graphql'
      : 'https://minigame.our.gg/graphql',
  cache: new InMemoryCache(),
});

export default client;
