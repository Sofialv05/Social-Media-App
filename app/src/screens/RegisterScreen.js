import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
const RegisterScreen = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
              secureTextEntry
              style={styles.input}
              value={form.name}
              placeholder="Name"
              placeholderTextColor="#6b7280"
              onChangeText={(name) => setForm({ ...form, name })}
            />
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
              value={form.email}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              onChangeText={(email) => setForm({ ...form, email })}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              value={form.password}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              onChangeText={(password) => setForm({ ...form, password })}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              value={form.confirmPassword}
              placeholder="Confirm password"
              placeholderTextColor="#6b7280"
              onChangeText={(confirmPassword) =>
                setForm({ ...form, confirmPassword })
              }
            />
            <View>
              <TouchableOpacity>
                <View style={{ ...styles.button, backgroundColor: "#075eec" }}>
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 18 }}
                  >
                    Create account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity>
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
                Already have an account? Log in
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
    marginBottom: 100,
    marginTop: 20,
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

export default RegisterScreen;
