import { View, Text } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Me from "../Screens/Me";
import { useEffect } from "react";
import Messess from "../Screens/Messess";
import MyNetwork from "../Screens/MyNetwork";
import Search from "../Screens/Search";
import Ionicons from "react-native-vector-icons/Ionicons";
import Music from "../Screens/Music";
export default function HomeComponent(props) {
  const Stack = createBottomTabNavigator();
  const data_Me = props.route.params.data;
  // console.log(data_Me);
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          size = 30;
          let iconName;
          route.params = data_Me;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Me") {
            iconName = focused ? "person" : "person-outline";
            // props.navigation.navigate("Me", { data: data_Me });
            // } else if (route.name === "Message") {
            //   iconName = focused
            //     ? "chatbubble-ellipses"
            //     : "chatbubble-ellipses-outline";
            // } else if (route.name === "MyNetwork") {
            //   iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Music") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
            // } else if (route.name === "Search") {
            //   iconName = focused ? "search" : "search-outline";
            // }
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5AA8F2",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Message" component={Messess} />
      <Stack.Screen name="MyNetwork" component={MyNetwork} /> */}
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Me" component={Me} />
    </Stack.Navigator>
  );
}
