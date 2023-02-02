import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import login from "./service/getService";
import { useSelector, useDispatch } from 'react-redux';
import { connect } from "react-redux";


var md5 = require("md5");
/*;llll*/
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  handleOnPress(e, user) {
    this.setState({
      [user]: e,
    });
  }

  getAddress = async (e) => {
    const result = await login.gettechnicianAddressid(e);


    if (result !== null) {
      let data3 = {
        id: result.id,
        name: result.name,
        phone_number: result.phone_number,
        email: result.email,
        addressUser: result.address,
        subdistrict: result.subdistrict,
        district: result.district,
        province: result.province,
        zipcode: result.zipcode,
        location: JSON.parse(result.location),
        technician_1: result.technician_1,
        technician_2: result.technician_2,
      }
      this.props.dispatch({
        type: 'ADD_ADDRESS',
        payload: data3
      })
    }
  }



  getAddress_user = async (e) => {
    const result = await login.getAddress_user(e);
    if (result !== null) {

      let data3 = {
        id: result.id,
        name: result.name,
        phone_number: result.phone_number,
        email: result.email,
        addressUser: result.address,
        subdistrict: result.subdistrict,
        district: result.district,
        province: result.province,
        zipcode: result.zipcode,
        location: JSON.parse(result.location),
      }
      this.props.dispatch({
        type: 'ADD_ADDRESS_USER',
        payload: data3
      })
    }
  }

  /*   set_State = async (e) => {
      if (e !== null ) {
        if (e[0].status_user === "ลูกค้าทั่วไป") {
          const result = await login.getMessage_user(e[0].id);
          const resultGrouBy = await login.getMessage_user_groupBy(e[0].id);
          if (result && resultGrouBy) {
            this.props.dispatch({
              type: "ADD_MEASSAGE",
              payload: result,
            });
            this.props.dispatch({
              type: "ADD_MEASSAGEGROUBY",
              payload: resultGrouBy,
            });
          }
        } else {
          const result1 = await login.getMessage_technician(e[0].id);
          const resultGrouBy = await login.getMessage_technician_groupBy(e[0].id);
          if (result1 && resultGrouBy) {
            this.props.dispatch({
              type: "ADD_MEASSAGE",
              payload: result1,
            });
            this.props.dispatch({
              type: "ADD_MEASSAGEGROUBY",
              payload: resultGrouBy,
            });
          }
        }
      }
    }
   */

  getImge = async (e) => {
    const result1 = await login.getImageProfile(e);

    if (result1 !== null) {
      const imag = [
        {
          id: `${result1[0].id}`,
          name: `${result1[0].file_src}`,
          uri: `${this.props.posts.urlImage}profile/${result1[0].file_src}`,
        },
      ];
      this.props.dispatch({
        type: "ADD_IMAGE_PROFILE",
        payload: imag,
      });
    }
  }



  login = async () => {

    let password = md5(this.state.password);
    const data = [this.state.username, password];
    const getLogin = await login.getLogin(data);
    if (getLogin !== null) {
      //ส่วน login
      let data2 = {
        id: getLogin[0].id,
        phone: getLogin[0].phone,
        password: getLogin[0].password,
        status_user: getLogin[0].status_user,
        status_check: getLogin[0].status_check,
      }


      const result = login.getRepairWorkUser(getLogin[0].id);
      result.then((values) => {
        if (values.length > 0) {
          this.props.dispatch({
            type: 'ADD_NOTIFICATIONSREPAIRWORK',
            payload: values.length
          })
        }

      }).catch((error) => {
        this.props.dispatch({
          type: 'DELETE_NOTIFICATIONSREPAIRWORK',
          payload: null
        })
      });

      const resultTec = login.getRepairWorkTechnician();
      resultTec.then((values) => {
        if (values.length > 0) {
          this.props.dispatch({
            type: 'ADD_NOTIFICATIONSREPAIRWORKTCE',
            payload: values.length
          })
        }

      }).catch((error) => {
        this.props.dispatch({
          type: 'DELETE_NOTIFICATIONSREPAIRWORKTCE',
          payload: null
        })
      });

      this.props.dispatch({
        type: 'ADD_LOGIN',
        payload: data2
      })
      this.props.dispatch({
        type: 'ADD_STATUSUPDATE',
        payload: true
      })

      /*     this.props.dispatch({
            type: 'ADD_URL',
            payload: "http://192.168.1.5/project/api-database/images/"
          }) */

      if (getLogin[0].status_user == "ช่าง") {
        await this.getAddress(getLogin[0].id);
      } else {
        await this.getAddress_user(getLogin[0].id);
      }
      /*         await this.set_State(getLogin) */

      await this.getImge(getLogin[0].id);

      await this.props.navigation.popToTop();
    } else {
      await Alert.alert('User หรือ password ไม่ถูกต้องกรุณาลองใหม่');
    }
  };

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/AA1.png")}
            />
          </View>

          <View style={styles.box}>
            <View style={styles.marginTop}>
              <View style={styles.input}>
                <FontAwesome name="user" style={styles.icons3} />
                <TextInput keyboardType='numeric'
                  style={{ flex: 1, paddingLeft: 12, fontSize: 20 }}
                  placeholder="PhoneNumber"
                  underlineColorAndroid="transparent"
                  onChange={(e) =>
                    this.handleOnPress(e.nativeEvent.text, "username")
                  }
                />
              </View>

              <View style={styles.input}>
                <FontAwesome name="unlock-alt" style={styles.icons3} />
                <TextInput
                  style={{ flex: 1, paddingLeft: 12, fontSize: 20 }}
                  placeholder="Password"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChange={(e) =>
                    this.handleOnPress(e.nativeEvent.text, "password")
                  }
                />
              </View>
            </View>

            <View style={styles.icons}>
              {/* <AntDesign name="checkcircleo" size={20} color="#37C1FB" /> */}
              <View /* style={styles.button3} */>
                <Text
                  style={styles.text2}
                  title="Go to Details"
                  onPress={() => this.props.navigation.navigate("ResetPassword")}
                >
                  ลืมรหัสผ่าน
                </Text>
              </View>
              <View style={styles.button2}>
                <Text
                  style={styles.text3}
                  title="Go to Details"
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  สมัครสมาชิก
                </Text>
              </View>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => this.login()}
              >
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>

            {/*         <View style={styles.boxIcon}>
              <View style={styles.icons1}>
                <FontAwesome name="facebook" size={35} color="#37C1FB" />
              </View>

              <View style={styles.icons2}>
                <AntDesign name="google" size={35} color="#37C1FB" />
              </View>
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  boxhead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  box: {
    height: 140,
    width: 140,
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 4,
    borderColor: '#fff',
  },
  boxIcon: {
    height: 100,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -44,
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    fontSize: 23,
  },
  text: {
    color: 444,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  text1: {
    marginLeft: 30,
    marginTop: -20,
    fontSize: 16,
    marginBottom: 2,
  },
  text2: {
    marginLeft: -15,
    marginTop: -4,
    fontSize: 16,
    marginBottom: 2,
  },
  text3: {
    marginLeft: -15,
    marginTop: -25,
    fontSize: 16,
    marginBottom: 2,
  },
  button: {
    marginTop: 40,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 20,
  },
  button1: {
    backgroundColor: "#37C1FB",
    height: 50,
    borderRadius: 25,
  },
  button2: {
    marginTop: 0,
    alignSelf: 'flex-end',
    marginRight: '10%'
  },
  icons: {
    marginTop: 25,
    marginLeft: 60,
  },
  marginTop: {
    marginTop: 20,
  },
  icons1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    marginTop: 20,
    marginLeft: 110,
    alignItems: "center",
    padding: 10,
  },
  icons2: {
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    marginLeft: 210,
    alignItems: "center",
    padding: 8,
    marginTop: -50,
  },
  icons3: {
    fontSize: 24,
    color: "#37C1FB",
    marginLeft: 10,
  },
  image2: {
    height: 220,
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },
  scrollView: {
    marginHorizontal: 5,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Login);
