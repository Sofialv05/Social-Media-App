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

const MainStack = (props) => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
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
          component={CreatePostScreen}
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
    </NavigationContainer>
  );
};

export default MainStack;
