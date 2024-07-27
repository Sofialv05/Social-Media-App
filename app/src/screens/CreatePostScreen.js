import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const CreatePostScreen = (props) => {
  // console.log(props);
  return (
    <SafeAreaView>
      <Feather
        name="x"
        size={28}
        color="black"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text>CreatePostScreen</Text>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
