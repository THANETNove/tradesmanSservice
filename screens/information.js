import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import image from "./service/getService";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgProfile: null,
      url: `${this.props.posts.urlImage}profile/`,
      activityIndicator: true
    };
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      imgProfile: result,
    });
  };

  saveImage = async () => {
    this.setState({
      activityIndicator: false
    })
    let id_user = this.props.posts.login.id;
    let imag = this.state.imgProfile;
    const result = await image.imageProfile(imag, id_user);

    if (result === "success") {
      this.gitImage(id_user);
      await Alert.alert("บันทึกสำเร็จ");
      this.props.navigation.popToTop();
    } else {
      await Alert.alert("บันทึกไม่สำเร็จ");
    }
  };

  gitImage = async (e) => {
    const result1 = await image.getImageProfile(e);

    if (result1 !== null) {
      const imag = [
        {
          id: `${result1[0].id}`,
          name: `${result1[0].file_src}`,
          uri: `${this.state.url}${result1[0].file_src}`,
        },
      ];
      this.props.dispatch({
        type: "ADD_IMAGE_PROFILE",
        payload: imag,
      });

      await this.setImage();
    }
  };

  setImage = async () => {
    let img = await this.props.posts.imageProfile;
    if (img !== null) {
      this.setState({
        imgProfile: img[0],
      });
    }
  };

  updateImage = async () => {
    this.setState({
      activityIndicator: false
    })
    let img = this.state.imgProfile;
    let id = this.props.posts.imageProfile[0].id;
    let name = this.props.posts.imageProfile[0].name;
    let id_user = this.props.posts.login.id;

    const result2 = await image.uplodeUpdateImagesProfile(img, id, name);
    if (result2 === "success") {
      this.gitImage(id_user);
      await Alert.alert("บันทึกสำเร็จ");
      this.props.navigation.popToTop();
    } else {
      await Alert.alert("บันทึกไม่สำเร็จ");
    }
  };

  componentDidMount() {
    let id_user = this.props.posts.login.id;
    let imag = this.state.imgProfile;
    if (imag === null) {
      this.gitImage(id_user);
    }
    this.setImage();
  }

  render() {
    const { imgProfile } = this.state;
    return (

      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <Image
                style={styles.image2}
                source={require("../assets/images/AA1.png")}
              />
            </View>
          <View style={styles.centerImg}></View>
            <View style={styles.box6}>
              <TouchableOpacity onPress={() => this.pickImage()}>
                {imgProfile === null ? (
                  <AntDesign name="pluscircleo" style={styles.icons} />
                ) : (
                  <Image style={styles.imgPro} source={{ uri: imgProfile.uri }} />
                )}
              </TouchableOpacity>
            </View>

          <View style={styles.box1}>
              <View style={styles.box}>
                <Text style={styles.text}>ข้อมูลเกี่ยวกับบัญชี</Text>
              </View>

              <View style={styles.box}>
                <View style={styles.box3}>
                  <Text style={styles.text2}>{"เบอร์โทร"}</Text>
                  <Text style={styles.text3}>{this.props.posts.login.phone}</Text>
                </View>

                <View style={styles.box3}>
                  <Text style={styles.text2}>{"สถานะการสมัคร"}</Text>
                  <Text style={styles.text3}>
                    {this.props.posts.login.status_user}
                  </Text>
                </View>
                {
                  this.state.activityIndicator === true ?
                  <>
                  {
                    this.props.posts.imageProfile === null ? 
                    <>
                        <TouchableOpacity style={styles.box2}>
                          <Text onPress={() => this.saveImage()} style={styles.text4}>
                            Save เพิ่มรูป
                          </Text>
                        </TouchableOpacity>
                    </> 
                    : 
                    <>
                    <TouchableOpacity style={styles.box2}>
                        <Text onPress={() => this.updateImage()} style={styles.text4}>
                          บันทึกรูปภาพ
                        </Text>
                      </TouchableOpacity>
                    </>
                  }
                  </>
                  : null
                }
                {
                }
              </View>
            </View> 
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "#fff",
  },
  box: {
    marginTop: 20,
  },
  box1: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -44,
  },
  box2: {
    height: 45,
    width: 200,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 10,
  },
  box3: {
    height: 50,
    width: "90%",
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    padding: -10,
    marginBottom: 10,
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
  },

  box6: {
  
    height: 140,
    width: 140,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 80,
    marginLeft: 110,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: -90,
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    
  },
  imgPro: {
    textAlign: "center",
    height: 135,
    width: 135,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    borderRadius: 100,
    zIndex: 1,
  },
  icons: {
    fontSize: 40,
    color: "#000",
    textAlign: "center",
    marginTop: 45,
    color: "#fff",
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 50,
  },
  text2: {
    marginLeft: 26,
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    marginTop: -20,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 26,
  },
  text4: {
    paddingTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  image2: {
    height: 220,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },
  image3: {
    width: 100,
    height: 100,
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};
export default connect(mapStateToProps, null)(Information);
