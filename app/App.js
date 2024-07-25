import { Image, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => {
            if (route.name === "Home") {
              return (
                <Image
                  source={require("./assets/home-black.png")}
                  style={{ width: 24, height: 24 }}
                />
              );
            }
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={HomeScreen} />
        <Tab.Screen name="+" component={HomeScreen} />
        <Tab.Screen name="Story" component={HomeScreen} />
        <Tab.Screen name="profile" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
