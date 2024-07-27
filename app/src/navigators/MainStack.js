import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "../components/header/Logo";
import Icon from "../components/header/Icon";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  Octicons,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import CreatePostScreen from "../screens/CreatePostScreen";
import UserProfile from "../screens/UserProfile";
import SearchScreen from "../screens/SearchScreen";
import Sheet from "../components/BottomSheet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheet } from "react-native-elements";
import Post from "../components/Home/Post";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => <Icon />,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <MaterialIcons name="home-filled" size={30} color="black" />
              );
            } else {
              return <Octicons name="home" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <FontAwesome name="search" size={24} color="black" />;
            } else {
              return <Feather name="search" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={Sheet}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <MaterialIcons name="add-box" size={29} color="black" />;
            } else {
              return <Octicons name="diff-added" size={24} color="black" />;
            }
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={BottomSheet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
