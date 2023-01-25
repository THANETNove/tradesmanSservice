import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Button } from "react-native-web";
import { connect } from "react-redux";
import img1 from "../../assets/images/A-6.png";
import { logoutStore } from "../logout";
import technician_type from "../service/getService";


class Profile_tradesman extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urlImg: null,
      modalVisible: false,
      star: "2",
      image: null,
      name: null,
      stausLogin: null,
      scoreUser: null
    };
  }

  componentDidMount() {
    if (this.state.name === null) {
      this.setState({
        name: this.props.posts.address
      });
    }

    if (this.state.stausLogin === null) {
      this.setState({
        stausLogin: this.props.posts.login
      });
    }

    if (this.state.image === null) {
      this.setState({
        image: this.props.posts.imageProfile,
      });
    }
    this.getUserScore()

  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { statusUpdate } = this.props.posts;
    const { name } = this.state;
    if ((statusUpdate === true)) {
      this.getUserScore()
      this.props.dispatch({
        type: 'ADD_STATUSUPDATE',
        payload: false
      })

    }



    if ((this.props.posts.address == null) && (name == null)) {
      /*   console.log("this.props.posts.login", this.props.posts.login.id);
        console.log("aaa"); */
      const result1 = await technician_type.getAddress_user(this.props.posts.login.id);
      this.setState({
        name: result1[0]
      });
    }

    if (this.props.posts.login !== this.state.stausLogin) {
      this.setState({
        stausLogin: this.props.posts.login
      });
    }
    if (this.props.posts.imageProfile !== this.state.image) {
      this.setState({
        image: this.props.posts.imageProfile,
      });
    }
  }

  getUserScore = async () => {
    const { login } = this.props.posts;

    const user = await technician_type.getUser(login.id);
    this.setState({
      scoreUser: user[0].score
    });

  }

  setModalVisible = (visible, urlImg) => {
    this.setState({
      modalVisible: visible,
      urlImg: urlImg,
    });
  };
  deleteStor() {
    this.props.dispatch({
      type: 'DELETE_LOGIN',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_ADDRESS',
      payload: null
    })
    this.props.dispatch({
      type: "DELETE_IMAGE",
      payload: null,
    });
    this.props.dispatch({
      type: "DELETE_BOOKBANK",
      payload: null,
    });
    this.props.dispatch({
      type: "DELETE_IMAGE_PROFILE",
      payload: null,
    });
    this.props.dispatch({
      type: "DELETE_ADDRESS_USER",
      payload: null,
    });
    this.props.dispatch({
      type: 'DELETE_IDTECHNICAN',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_SHOPALL',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_IMAGESHOP',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_SHOP',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_JOB',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_NOTIFICATIONSREPAIRWORK',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_NOTIFICATIONSREPAIRWORKTCE',
      payload: null
    })
  }

  async logout() {

    this.deleteStor();
    await this.props.navigation.popToTop();
  }

  async deletion() {


    Alert.alert(
      "deletion",
      "คุณเเน่จะลบบัญชีของคุณ ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {

            const login_a = this.props.posts.login;
            const result = technician_type.delete_user(login_a.id);
            result.then((values) => {
              if (values == "success") {
                this.deleteStor();
                this.props.navigation.popToTop();
              }
            });
          }
        }
      ]
    );
  }

  customer() {
    var myStar = [
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />
    ];


    for (let i = 0; i < this.state.star; i++) {
      myStar.splice(i, 1,
        <FontAwesome name="star" style={styles.iconsGold} />
      );
    }
    const { modalVisible, urlImg, image, name, stausLogin, scoreUser } = this.state;
    console.log("66", name);
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.box}>
              <View style={styles.box1}>
                <View style={styles.box6}>
                  {
                    image !== null ?
                      <Image style={styles.imgPro} source={{ uri: image[0].uri }} />
                      :
                      <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />

                  }
                </View>
                {
                  name === null ?
                    <Text style={styles.text}>TECHNICIAN ONLINE</Text>
                    :
                    <>
                      <Text style={styles.text}>{name.name}</Text>
                      <Text style={styles.text1}>เบอร์ติดต่อ {
                        stausLogin !== null ?
                          <>{stausLogin.phone}</>
                          :
                          null
                      }</Text>
                      <Text style={styles.textScore}>คะเเนน  {scoreUser} </Text>
                    </>
                }
              </View>
            </View>

            <View style={styles.top}>
              <View style={styles.box3}>
                <FontAwesome5 name="user-alt" style={styles.icons3} />
                <Text style={styles.text2}
                  onPress={() => this.props.navigation.navigate("Information")}>{"โปรไฟล์"}
                </Text>
              </View>


              <View style={styles.box3}>
                <FontAwesome5 name="address-book" style={styles.icons5} />
                <Text
                  style={styles.text2}
                  onPress={() => this.props.navigation.navigate("Address_user")}>{"ข้อมูลการติดต่อ"}
                </Text>
              </View>
            </View>
            <View style={styles.box3}>
              <MaterialIcons name="privacy-tip" style={styles.icons3} />
              <Text style={styles.text2}
                onPress={() => this.props.navigation.navigate("Privacypolicy")}>{"นโยบายความเป็นส่วนตัว"}
              </Text>
            </View>
            <View style={styles.box3}>
              <MaterialCommunityIcons name="logout" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.logout()}>{"Logout"}
              </Text>
            </View>
            <View style={styles.box3}>
              <AntDesign name="deleteuser" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.deletion()}>{"ลบบัญชี"}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }

  tradesman() {
    const { modalVisible, urlImg, image, name, stausLogin, scoreUser } = this.state;
    var myStar = [
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />,
      <FontAwesome name="star" style={styles.icons} />
    ];
    for (let i = 0; i < this.state.star; i++) {
      myStar.splice(i, 1,
        <FontAwesome name="star" style={styles.iconsGold} />
      );
    }
    /*     console.log("stausLogin",stausLogin && stausLogin.status_user); */

    return (
      <>
        <ScrollView s>
          <View style={styles.box}>
            <View style={styles.box1}>
              <View style={styles.box6}>
                {
                  image !== null ?
                    <Image style={styles.imgPro} source={{ uri: image[0].uri }} />
                    :
                    <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />

                }
              </View>
              {
                name == null ?
                  <Text style={styles.text}>TECHNICIAN ONLINE</Text>
                  :
                  <>
                    <Text style={styles.text}>{name.name}</Text>
                    <Text style={styles.text1}>เบอร์ติดต่อ {
                      stausLogin !== null ?
                        <>{stausLogin.phone}</>
                        :
                        null
                    }</Text>
                    <View style={styles.viewScore}>
                      <Text style={styles.textScore}>คะเเนน {scoreUser} </Text>
                    </View>

                  </>
              }
            </View>
          </View>

          <View style={styles.top}>

            <View style={styles.box3}>
              <FontAwesome name="user" style={styles.icons3} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("Information")}>{"โปรไฟล์"}
              </Text>
            </View>
            {
              stausLogin && stausLogin.status_user === "admin" ?
                <View style={styles.box3}>
                  <FontAwesome name="user" style={styles.icons3} />
                  <Text
                    style={styles.text2}
                    onPress={() => this.props.navigation.navigate("ImageHome")}>{"เพิ่มภาพ"}
                  </Text>
                </View>
                :
                null
            }

            <View style={styles.box3}>
              <FontAwesome5 name="file-image" style={styles.icons5} />
              <Text style={styles.text2}
                onPress={() => this.props.navigation.navigate("Workings")}>{"ผลงาน"}
              </Text>
            </View>
            <View style={styles.box3}>
              <FontAwesome5 name="address-book" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("Servict_form")}>{"ข้อมูลการติดต่อ"}
              </Text>
            </View>
            <View style={styles.box3}>
              <FontAwesome5 name="cc-visa" style={styles.icons4} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("Payment")}>{"ชำระเงิน"}
              </Text>
            </View>
            <View style={styles.box3}>
              <Ionicons name="card" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("Bank_account")}>{"บัญชีธนาคาร"}
              </Text>
            </View>
            <View style={styles.box3}>
              <MaterialIcons name="privacy-tip" style={styles.icons3} />
              <Text style={styles.text2}
                onPress={() => this.props.navigation.navigate("Privacypolicy")}>{"นโยบายความเป็นส่วนตัว"}
              </Text>
            </View>
            <View style={styles.box3}>
              <MaterialCommunityIcons name="logout" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.logout()}>{"Logout"}
              </Text>
            </View>
            <View style={styles.box3}>
              <AntDesign name="deleteuser" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.deletion()}>{"ลบบัญชี"}
              </Text>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setModalVisible(!modalVisible)}
            >
              <View>
                <Image
                  style={styles.image2}
                  source={{
                    uri: `${urlImg}`,
                  }}
                />
              </View>
            </Pressable>
          </View>
        </Modal>
      </>
    )
  }



  login() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.box}>
              <View style={styles.box1}>
                <View style={styles.box6}>
                  <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />
                </View>
                <Text style={styles.text}>TECHNICIAN ONLINE</Text>
              </View>
            </View>

            <View style={styles.top}>
              <View style={styles.box3}>
                <MaterialIcons name="login" style={styles.icons3} />
                <Text style={styles.text2}
                  onPress={() => this.props.navigation.navigate("Login")}>{"เข้าสู่ระบบ"}
                </Text>
              </View>
              <View style={styles.box3}>
                <MaterialIcons name="privacy-tip" style={styles.icons3} />
                <Text style={styles.text2}
                  onPress={() => this.props.navigation.navigate("Privacypolicy")}>{"นโยบายความเป็นส่วนตัว"}
                </Text>
              </View>
            </View>

          </ScrollView>
        </SafeAreaView>

      </>
    )
  }


  render() {
    const { modalVisible, urlImg, stausLogin, ckeckUserId, name } = this.state;
    const login_a = this.props.posts.login;
    console.log("login_a", login_a);
    return (
      <>
        {
          login_a === null
            ?
            this.login()
            :
            login_a.status_user === "ลูกค้าทั่วไป"

              ?
              this.customer()
              :
              this.tradesman()

        }
      </>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image1: {
    width: 134,
    height: 160,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 11,
  },
  image2: {
    width: 300,
    height: 350,
    marginLeft: 28,
    marginTop: 150,
    borderRadius: 15,
  },
  image3: {
    width: 145,
    height: 145,
    marginTop: -5,
    marginLeft: -5,
  },
  image4: {
    width: '100%',
    height: '100%',
  },
  top: {
    marginTop: 20,
  },
  box: {
    height: "auto",
    width: "100%",
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginBottom: 35
  },
  centerProfile: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  box1: {
    height: 250,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 20,
    marginLeft: "5%",
    marginRight: 45,
    marginTop: 25,

  },
  box2: {
    height: 60,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: "5%",
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  box3: {
    height: 60,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: "5%",
    marginRight: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  box4: {
    height: 180,
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 28,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 4,
  },
  box5: {
    height: 25,
    width: 80,
    backgroundColor: '#bcbdbe',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 28,
    marginRight: 20,
    marginTop: 10,
  },
  box6: {
    height: 140,
    width: 140,
    backgroundColor: '#37C1FB',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 4,
    borderColor: '#fff',
  },
  box7: {
    height: 35,
    width: 280,
    backgroundColor: /* '#37C1FB' */'#ffff',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
    borderRadius: 30,
    fontSize: 18,
    zIndex: 2,
    top: 80,
    position: "absolute",
    marginTop: "90%",
    marginLeft: 40,
    marginRight: 30,

  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 15,
  },
  textScore: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  viewScore: {
    marginTop: 35,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FF8C00",
    borderRadius: 2
  },
  text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    paddingTop: 10,
  },
  text2: {
    marginLeft: 55,
    fontSize: 20,
    marginTop: -35,
  },
  text3: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  text4: {
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 25,
    color: '#37C1FB'
  },
  iconsGold: {
    marginLeft: 5,
    fontSize: 25,
    color: "#FFD700",
  },
  icons: {
    marginLeft: 5,
    fontSize: 25,
    color: "#bcbdbe",
  },
  icons1: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  icons3: {
    width: 50,
    height: 48,
    marginLeft: 6,
    marginTop: 5,
    fontSize: 26,
    color: "#37C1FB",
    borderRadius: 10,
    paddingTop: 12,
    paddingLeft: 13,
  },
  icons4: {
    width: 50,
    height: 48,
    marginLeft: 6,
    marginTop: 5,
    fontSize: 20,
    color: "#37C1FB",
    borderRadius: 10,
    paddingTop: 12,
    paddingLeft: 13,
  },
  icons5: {
    width: 50,
    height: 48,
    marginLeft: 6,
    marginTop: 5,
    fontSize: 24,
    color: "#37C1FB",
    borderRadius: 10,
    paddingTop: 12,
    paddingLeft: 13,
  },
  modalView: {
    height: 300,
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 15,
    marginLeft: 28,
    marginRight: 20,
    marginTop: "70%",
  },
  imgPro: {
    height: 132,
    width: 132,
    backgroundColor: '#37C1FB',
    shadowColor: "#000",
    borderRadius: 100,
    zIndex: 1,

  },
});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Profile_tradesman);


