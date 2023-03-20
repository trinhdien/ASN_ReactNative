import { View, Text, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    // backgroundColor: "black",
    flex: 1,
  },
  containerMusic: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    backgroundColor: "#7CB9E8",
    flex: 1,
  },
  logo: {
    marginTop: 100,
    alignSelf: "center",
    width: 360,
    height: 140,
  },
  textInput: {
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  txtInputContent: {
    height: 200,
    padding: 20,
    borderWidth: 4,
    borderColor: "gray",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 30,
    textAlign: "center",
    marginRight: 30,
  },
  buttonLogin: {
    alignSelf: "center",
    margin: 10,
    backgroundColor: "#7CB9E8",
    borderWidth: 1,
    borderColor: "#7CB9E8",
    borderRadius: 10,
    padding: 10,
    width: 150,
  },
  txtButon: {
    textAlign: "center",
    fontSize: 20,
  },
  buttonRegister: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  txtRegister: {
    marginLeft: 10,
    color: "#7CB9E8",
    textDecorationLine: "underline",
  },
  imgPost: {
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  avatar: {
    marginTop: 20,
    borderRadius: 75,
    alignSelf: "center",
    width: 80,
    height: 80,
  },
  avatar_Post: {
    borderRadius: 75,
    width: 40,
    height: 40,
  },
  icon_post: {
    alignSelf: "center",
    marginLeft: 30,
    width: 30,
    height: 30,
  },
  flexRow: {
    marginBottom: 10,
    flexDirection: "row",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  flexRowMe: {
    alignSelf: "center",
    flexDirection: "row",
  },
  flexColum: {
    marginLeft: 10,
    flexDirection: "column",
  },
  flexRow_btnPost: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "row",
  },
  txt_fullname: {
    fontStyle: "bold",
    marginLeft: 20,
    textAlignVertical: "center",
    color: "black",
    fontSize: 15,
  },
  txt_content: {
    fontStyle: "bold",
    color: "black",
    fontSize: 20,
  },
  txt_contentCmt: {
    marginTop: 5,
    fontStyle: "bold",
    color: "black",
  },
  txtAvt: {
    fontSize: 20,
    textAlign: "center",
  },
  txtMusic: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
  },
  txtTheoDoi: {
    fontSize: 15,
    margin: 10,
  },
  box_post: {
    backgroundColor: "white",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#AEA2C5",
    padding: 5,
  },
  box_cmt: {
    width: "90%",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#AEA2C5",
    padding: 5,
  },
  txt_icon: {
    marginLeft: 40,
  },
  inpuCmt: {
    width: "90%",
    padding: 20,
    borderWidth: 2,
    borderColor: "gray",
    textAlign: "center",
    borderRadius: 20,
  },
  inputEditProfile: {
    marginTop: 5,
    width: "90%",
    padding: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "gray",
    textAlign: "center",
    borderRadius: 20,
  },
  icon_cmt: {
    alignSelf: "center",
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  icon_me: {
    alignSelf: "center",
    marginLeft: 90,
    width: 30,
    height: 30,
  },
});
export default styles;
