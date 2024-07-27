import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloConnection";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStateProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <AuthProvider>
      <GlobalStateProvider>
        <ApolloProvider client={client}>
          <GestureHandlerRootView>
            <MainStack />
          </GestureHandlerRootView>
        </ApolloProvider>
      </GlobalStateProvider>
    </AuthProvider>
  );
}
