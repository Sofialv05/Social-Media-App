import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloConnection";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStateProvider } from "./contexts/GlobalContext";
import Toast from "react-native-toast-message";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <GlobalStateProvider>
          <ApolloProvider client={client}>
            <GestureHandlerRootView>
              <MainStack />
              <Toast />
            </GestureHandlerRootView>
          </ApolloProvider>
        </GlobalStateProvider>
      </AuthProvider>
    </View>
  );
}
