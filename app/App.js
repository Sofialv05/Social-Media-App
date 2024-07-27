import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloConnection";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView>
          <MainStack />
        </GestureHandlerRootView>
      </ApolloProvider>
    </AuthProvider>
  );
}
