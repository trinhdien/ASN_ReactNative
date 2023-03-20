import { View, Text, Button, ScrollView } from "react-native";
import * as React from "react";
import styles from "../Styles/Styles";
import { Linking } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
export default function Music(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const video1 = React.useRef(null);
  const [status1, setStatus1] = React.useState({});
  const video2 = React.useRef(null);
  const [status2, setStatus2] = React.useState({});
  const video3 = React.useRef(null);
  const [status3, setStatus3] = React.useState({});
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box_post}>
          <Text style={styles.txtMusic}>Tấm Lòng Son</Text>
          <Video
            ref={video3}
            style={styles.video}
            source={require("../assets/tam_long_son.mp4")}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status3) => setStatus3(() => status3)}
          />
          <View style={styles.buttons}>
            <Button
              title={status3.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status3.isPlaying
                  ? video3.current.pauseAsync()
                  : video3.current.playAsync()
              }
            />
          </View>
        </View>
        <View style={styles.box_post}>
          <Text style={styles.txtMusic}>
            Khi Người Mình Yêu Khóc - Phan Mạnh Quỳnh
          </Text>
          <Video
            ref={video}
            style={styles.video}
            source={require("../assets/khi_nguoi_minh_yeu_khoc.mp4")}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </View>
        <View style={styles.box_post}>
          <Text style={styles.txtMusic}>Ép Duyên - Long Nón Lá</Text>
          <Video
            ref={video1}
            style={styles.video}
            source={require("../assets/ep_duyen.mp4")}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status1) => setStatus1(() => status1)}
          />
          <View style={styles.buttons}>
            <Button
              title={status1.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status1.isPlaying
                  ? video1.current.pauseAsync()
                  : video1.current.playAsync()
              }
            />
          </View>
        </View>
        <View style={styles.box_post}>
          <Text style={styles.txtMusic}>Quả Phụ Tướng - DUNGHOANGPHAM</Text>
          <Video
            ref={video2}
            style={styles.video}
            source={require("../assets/qua_phu_tuong.mp4")}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status2) => setStatus2(() => status2)}
          />
          <View style={styles.buttons}>
            <Button
              title={status2.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status2.isPlaying
                  ? video2.current.pauseAsync()
                  : video2.current.playAsync()
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
