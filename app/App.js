import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloConnection";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainStack />
    </ApolloProvider>
  );
}
