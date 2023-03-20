import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../Styles/Styles";

export default function Coment(props) {
  const avatar = props.route.params.img;
  const fullname = props.route.params.fullname;
  const item = props.route.params.dataComent;
  const youAcount = props.route.params.youAcount;
  const idPost = props.route.params.idPost;
  const [content, setcontent] = useState("");
  const [dataComent, setdataComent] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [isload, setisload] = useState(true);
  // console.log(youAcount);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getListCmt();
      getListUser();
    });
    return unsubscribe;
  }, [props.navigation]);
  const getListUser = async () => {
    try {
      const response = await fetch("http://172.20.10.2:3000/tb_users");
      const json = await response.json();
      setListUser(json);
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({ item }) => {
    let avtPost = "";
    let fullNameNew = "";
    ListUser.map((value) => {
      if (value.username == item.idUserCmt) {
        avtPost = value.avatar;
        fullNameNew = value.fullname;
        console.log(fullNameNew);
      }
    });
    return (
      <View style={styles.box_cmt}>
        <View style={styles.flexRow}>
          <Image source={{ uri: avtPost }} style={styles.avatar_Post} />
          <View style={styles.flexColum}>
            <Text>{fullNameNew}</Text>
            <Text style={styles.txt_contentCmt}>{item.contentCmt}</Text>
          </View>
        </View>
      </View>
    );
  };
  const getListCmt = async () => {
    try {
      const response = await fetch(
        "http://172.20.10.2:3000/tb_comentPost?idPost=" +
          idPost +
          "&_sort=id&_order=desc"
      );
      const json = await response.json();
      setdataComent(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisload(false);
    }
  };
  const cmt = () => {
    let objCmt = {
      avt: youAcount.avatar,
      fullname: youAcount.fullname,
      idUserCmt: youAcount.username,
      contentCmt: content,
      idPost: idPost,
    };
    let url = "http://172.20.10.2:3000/tb_comentPost";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objCmt),
    })
      .then((res) => {
        if (res.status == 201) {
          getListCmt();
          setcontent("");
          Alert.alert("Success", "Post coment successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ padding: 20 }}>
      <View style={styles.box_post}>
        <View style={styles.flexRow}>
          <Image source={{ uri: avatar }} style={styles.avatar_Post} />
          <Text style={styles.txt_fullname}>{fullname}</Text>
        </View>
        <Text style={styles.txt_content}>{item.content}</Text>
        <Image source={{ uri: item.image }} style={styles.imgPost} />
      </View>
      <View style={styles.flexRow}>
        <TextInput
          value={content}
          placeholder="Enter your coment"
          style={styles.inpuCmt}
          onChangeText={(txt) => {
            setcontent(txt);
          }}
        />
        <TouchableOpacity style={styles.icon_cmt} onPress={cmt}>
          <Image
            source={require("../assets/cmt.png")}
            style={styles.icon_cmt}
          />
        </TouchableOpacity>
      </View>
      {isload ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dataComent}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
