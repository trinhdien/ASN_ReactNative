import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import HomeComponent from "./HomeComponent";
import Post from "../Screens/Post";
import Me from "../Screens/Me";
import Coment from "../Screens/Coment";
import EditProfile from "../Screens/EditProfile";
import EditPost from "../Screens/EditPost";
export default function MainComponent(props) {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Main"
          component={HomeComponent}
          options={{ headerShown: false }}
        />
        <stack.Screen name="Register" component={Register} />
        <stack.Screen name="Post" component={Post} />
        <stack.Screen name="Coment" component={Coment} />
        <stack.Screen name="EdiProfile" component={EditProfile} />
        <stack.Screen name="EditPost" component={EditPost} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
