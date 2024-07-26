import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";

const Stories = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* map */}
        <View style={styles.container}>
          <Image
            style={styles.story}
            source={require("../../assets/new-user.png")}
          />
          <Text>username</Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.story}
            source={require("../../assets/new-user.png")}
          />
          <Text>username</Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.story}
            source={require("../../assets/new-user.png")}
          />
          <Text>username</Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.story}
            source={require("../../assets/new-user.png")}
          />
          <Text>username</Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.story}
            source={require("../../assets/new-user.png")}
          />
          <Text>username</Text>
        </View>

        {/* map */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    marginVertical: 10,
    right: 7,
    borderWidth: 3,
  },
  container: {
    marginLeft: 16,
    alignItems: "center",
  },
});

export default Stories;
