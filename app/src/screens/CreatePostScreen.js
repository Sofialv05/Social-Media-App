import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../mutations/post";
import Toast from "react-native-toast-message";

const CreatePostScreen = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [addPostFn, { loading }] = useMutation(ADD_POST);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    setImage(result.assets[0].uri);
  };

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "zs2jfkgj");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dphp2ihaz/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let result = await response.json();
      console.log(result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image, please retry", error);
      return null;
    }
  };

  const handleSubmitPost = async () => {
    if (!image) {
      Toast.show({
        type: "error",
        text1: "Please choose an image",
        text1Style: {
          fontSize: 16,
          fontWeight: "600",
          color: "red",
        },
      });
      return;
    }

    const imageUrl = await uploadImageToCloudinary(image);
    // console.log(imageUrl);
    if (!imageUrl) {
      console.error("Failed to upload image");
      Toast.show({
        type: "error",
        text1: "Failed to upload image",
        text2: "Please, try again",
        text1Style: {
          fontSize: 16,
          fontWeight: "600",
          color: "red",
        },
      });
      return;
    }

    try {
      const result = await addPostFn({
        variables: {
          inputPost: {
            content: content,
            tags: tags.split(" "),
            imgUrl: imageUrl,
          },
        },
      });

      if (result) {
        setContent("");
        setTags("");
        setImage(null);
        navigation.replace("MainTab");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || error.toString(),
        text1Style: {
          fontSize: 16,
          fontWeight: "600",
          color: "red",
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ alignSelf: "center" }}>
          {image ? (
            <Image
              style={{ width: 200, height: 200, borderRadius: 10 }}
              source={{
                uri: image,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "silver",
                width: 200,
                height: 200,
                borderRadius: 10,
              }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <View>
              <Text>Choose Image</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={{ ...styles.input, textAlignVertical: "top" }}
              onChangeText={(value) => setContent(value)}
              placeholder="Add Caption"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setTags(value)}
              placeholder="Add Tags"
            />
          </View>
          <View
            style={{
              backgroundColor: "blue",
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={handleSubmitPost}>
              <View>
                {loading ? (
                  <View>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Share
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignSelf: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default CreatePostScreen;
