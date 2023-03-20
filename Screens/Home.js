import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import styles from "../Styles/Styles";
import { useState } from "react";
export default function Home(props) {
  const [data_home, setdata_home] = useState({});
  const [dataPost, setdataPost] = useState([]);
  const [dataLike, setdataLike] = useState([]);
  const [dataComent, setdataComent] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [isload, setisload] = useState(true);
  const iconLike = [
    "data:image/png;base64,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",
    "data:image/png;base64,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",
  ];
  const [peopleShare, setpeopleShare] = useState(0);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setdata_home(props.route.params);
      getListPost();
      getListLikePost();
      getListCmt();
      getListUser();
    });
    return unsubscribe;
  }, [props.navigation]);
  const dataTemp = dataPost.map((itemPost) => {
    let index = 0;
    let idUserLike = "";
    dataLike.map((itemLike) => {
      itemPost.id === itemLike.idPost ? index++ : "";
    });
    return { id: itemPost.id, count: index };
  });
  let dataTempCmt = dataPost.map((dataPost) => {
    let index = 0;
    dataComent.map((dataCmt) => {
      dataPost.id == dataCmt.idPost ? index++ : "";
    });
    return { id: dataPost.id, count: index };
  });
  const getListCmt = async () => {
    try {
      const response = await fetch("http://172.20.10.2:3000/tb_comentPost");
      const json = await response.json();
      setdataComent(json);
    } catch (error) {
      console.error(error);
    }
  };
  const getListUser = async () => {
    try {
      const response = await fetch("http://172.20.10.2:3000/tb_users");
      const json = await response.json();
      setListUser(json);
    } catch (error) {
      console.error(error);
    }
  };
  const getListPost = async () => {
    let url = "http://172.20.10.2:3000/tb_Post?_sort=id&_order=desc";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setdataPost(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisload(false);
    }
  };
  const getListLikePost = async () => {
    let url = "http://172.20.10.2:3000/tb_LikePost";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setdataLike(json);
      // console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      // console.log(dataLike);
    }
  };
  const renderItem = ({ item, index }) => {
    let avtPost = "";
    ListUser.map((value) => {
      if (value.username == item.id_useName) {
        avtPost = value.avatar;
      }
    });
    let fullname = dataPost[index].fullname;
    let imglike = iconLike[0];
    if (item.id_useName == data_home.username) {
      fullname = dataPost[index].fullname + " (You) ";
    }
    dataLike.map((data) => {
      if (data.idPost == item.id && data.id_user == data_home.username) {
        imglike = iconLike[1];
      }
    });
    const btnLike = () => {
      let objUser = {
        idPost: item.id,
        id_user: data_home.username,
      };
      fetch(
        "http://172.20.10.2:3000/tb_LikePost?idPost=" +
          item.id +
          "&id_user=" +
          data_home.username
      )
        .then((response) => response.json())
        .then((json) => {
          if (json[0] != null) {
            Alert.alert(
              "Warning",
              "You liked this post before, do you want to unlike this post?",
              [
                {
                  text: "oke",
                  onPress: () => {
                    let url_xoa =
                      "http://172.20.10.2:3000/tb_LikePost/" + json[0].id;
                    fetch(url_xoa, {
                      method: "DELETE",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    })
                      .then((res) => {
                        if (res.status == 200) {
                          Alert.alert("Success", "Unlike successfully");
                          getListLikePost();
                          dataTemp = dataPost.map((itemPost) => {
                            let index = 0;
                            let idUserLike = "";
                            dataLike.map((itemLike) => {
                              itemPost.id === itemLike.idPost ? index++ : "";
                            });
                            return { id: itemPost.id, count: index };
                          });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  },
                },
                {
                  text: "no",
                },
              ]
            );
          } else {
            let url = "http://172.20.10.2:3000/tb_LikePost";
            fetch(url, {
              method: "Post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objUser),
            })
              .then((res) => {
                if (res.status == 201) {
                  Alert.alert("Like successfully", "Like successfully");
                  // console.log("Success");
                  getListLikePost();
                  dataTemp = dataPost.map((itemPost) => {
                    let index = 0;
                    let idUserLike = "";
                    dataLike.map((itemLike) => {
                      itemPost.id === itemLike.idPost ? index++ : "";
                    });
                    return { id: itemPost.id, count: index };
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return (
      <View style={styles.box_post}>
        <View style={styles.flexRow}>
          <Image source={{ uri: avtPost }} style={styles.avatar_Post} />
          <Text style={styles.txt_fullname}>{fullname}</Text>
        </View>
        <Text style={styles.txt_content}>{item.content}</Text>
        <Image source={{ uri: item.image }} style={styles.imgPost} />
        <View style={styles.flexRow_btnPost}>
          <TouchableOpacity onPress={btnLike}>
            <Image source={{ uri: imglike }} style={styles.icon_post} />
            <Text style={styles.txt_icon}>{dataTemp[index].count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (item.id_useName == data_home.username) {
                props.navigation.navigate("Coment", {
                  dataComent: item,
                  img: dataPost[index].avatar,
                  fullname: dataPost[index].fullname,
                  likeIndex: dataTemp[index].count,
                  youAcount: data_home,
                  idPost: item.id,
                });
              } else {
                fetch(
                  "http://172.20.10.2:3000/tb_LikePost?idPost=" +
                    item.id +
                    "&id_user=" +
                    data_home.username
                )
                  .then((response) => response.json())
                  .then((json) => {
                    if (json[0] == null) {
                      Alert.alert("Warning", "Please like the post to comment");
                    } else {
                      props.navigation.navigate("Coment", {
                        dataComent: item,
                        img: dataPost[index].avatar,
                        fullname: dataPost[index].fullname,
                        likeIndex: dataTemp[index].count,
                        youAcount: data_home,
                        idPost: item.id,
                      });
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }}
          >
            <Image
              source={require("../assets/comment.png")}
              style={styles.icon_post}
            />
            <Text style={styles.txt_icon}>{dataTempCmt[index].count}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/share.png")}
              style={styles.icon_post}
            />
            <Text style={styles.txt_icon}>{peopleShare}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isload ? (
        <ActivityIndicator size={100} />
      ) : (
        <FlatList
          data={dataPost}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
