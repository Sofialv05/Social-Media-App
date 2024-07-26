import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "../components/header/Logo";
import Icon from "../components/header/Icon";
import Home from "../components/tab/Home";
import AddPost from "../components/tab/AddPost";
import Search from "../components/tab/Search";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const MainStack = () => {
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
            tabBarIcon: () => <Home />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Search"
          component={RegisterScreen}
          options={{
            tabBarIcon: () => <Search />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={LoginScreen}
          options={{
            tabBarIcon: () => <AddPost />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: () => null,
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
