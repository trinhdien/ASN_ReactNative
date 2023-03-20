import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import styles from "../Styles/Styles";
import { useState } from "react";
export default function Login(props) {
  const [isLoading, setisLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const register = () => {
    props.navigation.navigate("Register");
  };
  const login = () => {
    if (username.length == 0) {
      Alert.alert("Login error", "Please enter your username and password");
      return;
    }
    if (password.length == 0) {
      Alert.alert("Login error", "Please enter your username and password");
      return;
    }
    setisLoading(true);
    let url = "http://172.20.10.2:3000/tb_users?username=" + username;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (password != response[0].password) {
          Alert.alert("Login error", "Wrong username or password");
          setisLoading(false);
          return;
        } else {
          props.navigation.navigate("Main", { data: response[0] });
          Alert.alert("Login success", "Logged in successfully");
          setisLoading(false);
          return;
        }
      })
      .catch((error) => {
        Alert.alert("Login error", "Wrong username or password");
        setisLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      {isLoading ? <ActivityIndicator size={100} /> : ""}
      <TextInput
        placeholder="Username"
        style={styles.textInput}
        onChangeText={(txt) => {
          setusername(txt);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(txt) => {
          setpassword(txt);
        }}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={login}>
        <Text style={styles.txtButon}>Login</Text>
      </TouchableOpacity>
      <View style={styles.buttonRegister}>
        <Text>Do not have an account?</Text>
        <TouchableOpacity onPress={register}>
          <Text style={styles.txtRegister}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
