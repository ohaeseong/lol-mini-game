import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://minigame.our.gg/graphql',
  cache: new InMemoryCache(),
});

export default client;
