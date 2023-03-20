import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../Styles/Styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
export default function EditProfile(props) {
  const data_edit = props.route.params.dataEditProfile;
  const [img_source, setimg_source] = useState(null);
  const [img_base64, setiimg_base64] = useState(data_edit.avatar);
  const [passwordCurent, setpasswordCurent] = useState(data_edit.password);
  const [txtPassCurent, settxtPassCurent] = useState("");
  const [txtPass1, settxtPass1] = useState("");
  const [txtPass2, settxtPass2] = useState("");
  const [fullnameNew, setfullnameNew] = useState(data_edit.fullname);
  const savePass = () => {
    if (txtPassCurent == "") {
      Alert.alert("Error", "Please enter your curent password");
      return;
    }
    if (txtPass1 == "") {
      Alert.alert("Error", "Please enter new password");
      return;
    }
    if (txtPass2 == "") {
      Alert.alert("Error", "Please enter new password again");
      return;
    }
    if (txtPass1 != txtPass2) {
      Alert.alert("Error", "Re-entered password does not match");
      return;
    }
    let url = "http://172.20.10.2:3000/tb_users/" + data_edit.id;
    let obj = {
      avatar: img_base64,
      email: data_edit.email,
      fullname: data_edit.fullname,
      numberphone: data_edit.numberphone,
      password: txtPass1,
      username: data_edit.username,
    };
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.password == txtPassCurent) {
          fetch(url, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }).then((res) => {
            if (res.status == 200) {
              Alert.alert("Success", "Edit your new password successfully", [
                {
                  text: "oke",
                  onPress: () => {
                    props.navigation.navigate("Me");
                  },
                },
              ]);
            }
          });
        } else {
          Alert.alert("Error", "Wrong password");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const saveProfile = () => {
    let url = "http://172.20.10.2:3000/tb_users/" + data_edit.id;
    let obj = {
      avatar: img_base64,
      email: data_edit.email,
      fullname: fullnameNew,
      numberphone: data_edit.numberphone,
      password: passwordCurent,
      username: data_edit.username,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then(async (res) => {
      let urlGetListPost =
        "http://172.20.10.2:3000/tb_Post?id_useName=" + data_edit.username;
      try {
        const response = await fetch(urlGetListPost);
        const json = await response.json();
        json.map((value) => {
          let objEditPost = {
            id_useName: value.id_useName,
            content: value.content,
            image: value.image,
            avatar: img_base64,
            fullname: fullnameNew,
          };
          let urlEditPost = "http://172.20.10.2:3000/tb_Post/" + value.id;
          fetch(urlEditPost, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objEditPost),
          });
        });
      } catch (error) {
        console.error(error);
      }
      if (res.status == 200) {
        Alert.alert("Success", "Edit your new avatar successfully", [
          {
            text: "oke",
            onPress: () => {
              props.navigation.navigate("Me");
            },
          },
        ]);
      }
    });
  };
  const pickImage = async () => {
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri; // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        // phải nối chuỗi với tiền tố data image
        setiimg_base64("data:image/" + file_ext + ";base64," + res);
        // console.log(img_base64);
        // upload ảnh lên api thì dùng PUT có thể viết ở đây
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.avatar}
          source={{
            uri: img_base64,
          }}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Enter your curent password"
        value={fullnameNew}
        style={styles.inputEditProfile}
        onChangeText={(txt) => {
          setfullnameNew(txt);
        }}
      />
      <TextInput
        placeholder="Enter your curent password"
        secureTextEntry={true}
        textContentType="password"
        value={txtPassCurent}
        style={styles.inputEditProfile}
        onChangeText={(txt) => {
          settxtPassCurent(txt);
        }}
      />
      <TextInput
        value={txtPass1}
        secureTextEntry={true}
        textContentType="password"
        placeholder="Enter your new password"
        style={styles.inputEditProfile}
        onChangeText={(txt) => {
          settxtPass1(txt);
        }}
      />
      <TextInput
        value={txtPass2}
        secureTextEntry={true}
        textContentType="password"
        placeholder="Enter your new password again"
        style={styles.inputEditProfile}
        onChangeText={(txt) => {
          settxtPass2(txt);
        }}
      />
      <View style={styles.flexRowMe}>
        <TouchableOpacity style={styles.buttonLogin} onPress={saveProfile}>
          <Text style={styles.txtButon}>Save avatar and name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogin} onPress={savePass}>
          <Text style={styles.txtButon}>Save Pass</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
