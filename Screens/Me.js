import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../Styles/Styles";

export default function Me(props) {
  const [data_me, setData_me] = useState([]);
  const [dataPost, setdataPost] = useState([]);
  const [isload, setisload] = useState(true);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getUser();
    });
    return unsubscribe;
  }, [props.navigation]);
  const getUser = async () => {
    let url_user = "http://172.20.10.2:3000/tb_users/" + props.route.params.id;
    try {
      const response = await fetch(url_user);
      const json_user = await response.json();
      setData_me(json_user);
      let url_post =
        "http://172.20.10.2:3000/tb_Post?id_useName=" +
        json_user.username +
        "&_sort=id&_order=desc";
      try {
        const response = await fetch(url_post);
        const json_post = await response.json();
        setdataPost(json_post);
      } catch (error) {
        console.error(error);
      } finally {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisload(false);
    }
  };
  const renderItem = ({ item }) => {
    const deletePost = () => {
      Alert.alert("Warning", "Do you want to delete this post?", [
        {
          text: "Oke",
          onPress: () => {
            let url = "http://172.20.10.2:3000/tb_Post/" + item.id;
            fetch(url, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }).then((response) => {
              if (response.status == 200) {
                Alert.alert("Success", "Delete Post Success");
                getUser();
              }
            });
          },
        },
        {
          text: "No",
        },
      ]);
    };
    return (
      <View style={styles.box_post}>
        <View style={styles.flexRow}>
          <Image source={{ uri: item.avatar }} style={styles.avatar_Post} />
          <Text style={styles.txt_fullname}>{item.fullname}</Text>
        </View>
        <Text style={styles.txt_content}>{item.content}</Text>
        <Image source={{ uri: item.image }} style={styles.imgPost} />
        <View style={styles.flexRowMe}>
          <TouchableOpacity onPress={deletePost}>
            <Image
              style={styles.icon_cmt}
              source={require("../assets/delete.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_me}
            onPress={() => {
              props.navigation.navigate("EditPost", { data_post: item });
            }}
          >
            <Image
              style={styles.icon_cmt}
              source={require("../assets/edit.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: data_me.avatar,
        }}
      />
      <Text style={styles.txtAvt}>{data_me.fullname}</Text>
      <View style={styles.buttonRegister}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            props.navigation.navigate("Post", { data_post: data_me });
          }}
        >
          <Text style={styles.txtButon}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            props.navigation.navigate("EdiProfile", {
              dataEditProfile: data_me,
            });
          }}
        >
          <Text style={styles.txtButon}>Edit account</Text>
        </TouchableOpacity>
      </View>
      {isload ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dataPost}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
