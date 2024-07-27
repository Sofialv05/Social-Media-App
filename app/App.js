import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloConnection";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <MainStack />
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
