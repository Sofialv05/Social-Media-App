import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../mutations/auth";
import { AuthContext } from "../../contexts/AuthContext";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const { setIsSignedIn } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loginFn, { data, error, loading }] = useMutation(LOGIN);

  return (
    <SafeAreaView style={{ backgroundColor: "#ebecf4", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Image
              style={styles.icon}
              source={require("../assets/instagram-logo.png")}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={form.username}
              placeholder="Username"
              placeholderTextColor="#6b7280"
              onChangeText={(username) => setForm({ ...form, username })}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              value={form.password}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              onChangeText={(password) => setForm({ ...form, password })}
            />
            <View>
              <TouchableOpacity
                onPress={async () => {
                  const result = await loginFn({
                    variables: {
                      inputLogin: {
                        username: form.username,
                        password: form.password,
                      },
                    },
                  });
                  console.log(result);
                  setIsSignedIn(true);
                  await SecureStore.setItemAsync(
                    "accessToken",
                    result.data.login.token
                  );
                  await SecureStore.setItemAsync(
                    "username",
                    result.data.login.username
                  );
                }}
              >
                <View style={{ ...styles.button, backgroundColor: "#075eec" }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 18,
                      }}
                    >
                      Log in
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <View
              style={{
                ...styles.button,
                borderColor: "#075eec",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Text
                style={{ color: "#075eec", fontWeight: "500", fontSize: 18 }}
              >
                Create new account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginBottom: 140,
    marginTop: 50,
    flex: 1,
    justifyContent: "space-around",
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  input: {
    height: 55,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
    borderColor: "silver",
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default LoginScreen;
