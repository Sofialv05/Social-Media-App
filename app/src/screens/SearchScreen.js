import { View, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries/user";
import UserList from "../components/UserList";
import { FlatList } from "react-native-gesture-handler";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      search: query,
    },
  });

  const updateSearch = (query) => {
    setQuery(query);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          value={query}
          onChangeText={updateSearch}
          searchIcon={<Feather name="search" size={24} color="gray" />}
          inputContainerStyle={{
            height: 40,
            backgroundColor: "#e8eced",
            borderRadius: 8,
          }}
          inputStyle={{ color: "black" }}
          lightTheme
          autoCorrect={false}
          placeholder="Search"
          leftIconContainerStyle={{ width: 30, height: 30 }}
          containerStyle={{
            backgroundColor: "white",
            paddingTop: 20,
            paddingHorizontal: 15,
          }}
          cancelIcon={
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          }
        />

        <View style={{ margin: 20 }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"medium"} />
            </View>
          ) : (
            <FlatList
              data={data.findUsers}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <UserList
                  username={item.username}
                  key={index}
                  name={item.name}
                  userId={item._id}
                  navigation={navigation}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
