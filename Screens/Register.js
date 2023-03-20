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
import { useState, useEffect } from "react";
export default function Register(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordAgain, setpasswordAgain] = useState("");
  const [listUser, setlistUser] = useState([]);
  const [fullName, setfullName] = useState("");
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getListUser();
    });
    return unsubscribe;
  }, [props.navigation]);
  const getListUser = async () => {
    let url = "http://172.20.10.2:3000/tb_users";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setlistUser(json);
    } catch (error) {
      console.error(error);
    }
  };
  const login = () => {
    if (username.length == 0) {
      Alert.alert("Register error", "Please enter your username and password");
      return;
    }
    if (fullName.length == 0) {
      Alert.alert("Register error", "Please enter your Fullname");
      return;
    }
    if (password.length == 0) {
      Alert.alert("Register error", "Please enter your username and password");
      return;
    }
    if (password != passwordAgain) {
      Alert.alert("Register error", "Re-entered password does not match");
      return;
    }
    listUser.map((user) => {
      if (user.username == username) {
        Alert.alert("Register error", "Username already used by someone else");
        return;
      }
    });
    let url = "http://172.20.10.2:3000/tb_users";
    let obj = {
      avatar:
        "https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-trang/avatar-trang-29.jpg",
      email: "admin@admin.com",
      fullname: fullName,
      numberphone: "0123456789",
      password: password,
      username: username,
    };
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      if (response.status == 201) {
        Alert.alert("Success", "Register successfully", [
          {
            text: "Ok",
            onPress: () => {
              props.navigation.navigate("Login");
            },
          },
        ]);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <TextInput
        placeholder="Username"
        style={styles.textInput}
        onChangeText={(txt) => {
          setusername(txt);
        }}
      />
      <TextInput
        placeholder="Fullname"
        style={styles.textInput}
        onChangeText={(txt) => {
          setfullName(txt);
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
      <TextInput
        placeholder="Password again"
        style={styles.textInput}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(txt) => {
          setpasswordAgain(txt);
        }}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={login}>
        <Text style={styles.txtButon}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
