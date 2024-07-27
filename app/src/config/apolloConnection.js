import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://ccff-180-242-225-221.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default client;
