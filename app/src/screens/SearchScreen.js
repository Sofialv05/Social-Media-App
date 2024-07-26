import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import PostGrid from "../components/PostGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { Feather, Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  const updateSearch = (query) => {
    setQuery(query);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
        <PostGrid />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
