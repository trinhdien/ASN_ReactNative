import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../Styles/Styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
export default function EditPost(props) {
  console.log(props.route.params.data_post);
  const data_post = props.route.params.data_post;
  const [img_source, setimg_source] = useState(null);
  const [img_base64, setiimg_base64] = useState(data_post.image);
  const [content, setcontent] = useState(data_post.content);
  const addPost = () => {
    if (content.length == 0) {
      Alert.alert("Error Post", "Please Enter your content");
      return;
    }
    let objUser = {
      id_useName: data_post.id_useName,
      content: content,
      image: img_base64,
      avatar: data_post.avatar,
      fullname: data_post.fullname,
    };
    let url = "http://172.20.10.2:3000/tb_Post/" + data_post.id;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    })
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Success", "Edit Post successfully", [
            {
              text: "oke",
              onPress: () => {
                props.navigation.navigate("Me");
              },
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pickImage = async () => {
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9], // khung view cắt ảnh
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      console.log(img_source);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri; // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        // phải nối chuỗi với tiền tố data image
        setiimg_base64("data:image/" + file_ext + ";base64," + res);
        console.log(img_base64);
        // upload ảnh lên api thì dùng PUT có thể viết ở đây
      });
    }
  };
  return (
    <ScrollView>
      <Image
        style={styles.avatar}
        source={{
          uri: data_post.avatar,
        }}
      />
      <Text style={styles.txtAvt}>{props.route.params.data_post.fullname}</Text>
      <TextInput
        value={content}
        onChangeText={(txt) => {
          setcontent(txt);
        }}
        placeholderTextColor="black"
        placeholder="Emter your content"
        style={styles.txtInputContent}
      />
      {img_base64 && (
        <Image
          source={{ uri: img_base64 }}
          style={{
            width: "100%",
            height: 200,
            marginTop: 10,
            alignSelf: "center",
          }}
        />
      )}
      <View style={styles.buttonRegister}>
        <TouchableOpacity style={styles.buttonLogin} onPress={pickImage}>
          <Text style={styles.txtButon}>Choose new photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogin} onPress={addPost}>
          <Text style={styles.txtButon}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
