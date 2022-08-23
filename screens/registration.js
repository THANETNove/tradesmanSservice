import React, { Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import bookBank from "./service/getService";
import { connect } from "react-redux";
import getUrlReducer from "../redux/logInReducer"
import {useSelector,useDispatch} from 'react-redux';
import Notifications from './navbar/notifications';



var md5 = require("md5");

const Registration = ({ navigation: { popToTop } }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState("first");
  const [statusUser, setStatusUser] = useState("ลูกค้าทั่วไป");
  const [statusCkeck, setStatusCkeck] = useState(false);
  const [modalVisible, setModalVisible] = useState("false");
  const [notifi, setNotifi] = useState(useSelector(state => state.notifications));
  const dispatch = useDispatch();



  const serve = async () => {
    const  data = await [phone, md5(password), statusUser, statusCkeck,notifi];



   const seaUser = await bookBank.searchUser(data);


    if (statusCkeck === true) {
      if (seaUser === null) {
        const result = await bookBank.createUser(data);
        if (result === "success") {
          let data2 = [phone, md5(password)];
          const getLogin = await bookBank.getLogin(data2);
          let data3 = {
            id: getLogin[0].id,
            phone: getLogin[0].phone,
            password:  getLogin[0].password,
            status_user: getLogin[0].status_user,
            status_check: getLogin[0].status_check,
          } 
          dispatch({
            type: 'ADD_LOGIN',
            payload: data3
          })
          await Alert.alert('บันทึกสำเร็จ');
         await popToTop();
        } else {
          await Alert.alert('บันทึกไม่สำเร็จ กรุณาลองใหม่');
        }
      } else {
        await Alert.alert(`เบอร์โทร ${phone} นี้มีในระบบอยู่เเล้ว`);
      }
    } else {
      alert(`กรุณายอมรับเงื่อนไงการใช้งาน`);
    }  
  };

  const accept = () => {
    setModalVisible(false);
    setStatusCkeck(true);
  }

  const url = useSelector(state => state.notifications);
  console.log("url",url);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

          <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/BB-2.png")}
            />
          </View>
      <View style={styles.box1}>
      <View style={styles.marginTop}>
          <View style={styles.input}>
            <FontAwesome name="phone-square" size={24} color="#00c2fe" />
            <TextInput keyboardType='numeric'
              style={{ flex: 1, paddingLeft: 12, fontSize: 18 }}
              onChange={(e) => {
                setPhone(e.nativeEvent.text);
              }}
              placeholder="PhoneNumber"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name="unlock-alt" size={24} color="#00c2fe" />
            <TextInput
              secureTextEntry={true}
              style={{ flex: 1, paddingLeft: 12, fontSize: 18 }}
              onChange={(e) => {
                setPassword(e.nativeEvent.text);
              }}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View style={styles.boxhead}>
          {statusUser === "ลูกค้าทั่วไป" ? (
            <AntDesign name="checkcircleo" style={styles.icons3}  /* onPress={(e) => {setStatusUser("ช่าง")}} */ />
          ) : (
            <Entypo name="circle" style={styles.icons3} onPress={(e) => { setStatusUser("ลูกค้าทั่วไป") }} />
          )}
          <Text style={styles.text2}>ลูกค้าทั่วไป</Text>

          {statusUser === "ช่าง" ? (
            <AntDesign name="checkcircleo" style={styles.icons4} />
          ) : (
            <Entypo name="circle" style={styles.icons4} onPress={(e) => { setStatusUser("ช่าง") }} />
          )}
          <Text style={styles.text3}>สำหรับช่าง</Text>
        </View>

        <View>
          {statusCkeck === true ? (
            <Pressable
              onPress={() => setModalVisible(true)}>
              <AntDesign name="checkcircleo" style={styles.icons5} />
              <Text style={styles.text5}>เงื่อนไขในการใช้งาน</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setModalVisible(true)}>
              <Entypo name="circle" style={styles.icons5} />
              <Text style={styles.text5}>เงื่อนไขในการใช้งาน</Text>
            </Pressable>

          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.modalView}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                >
                  <AntDesign name="close" style={styles.icons6} />
                </Pressable>
                <>
                  <Text style={styles.modalTextHead}>ข้อกำหนดและเงื่อนไขในการใช้งาน</Text>
                  <ScrollView>

                    <Text>
                      1. การสมัครสมาชิก
                      {"\n"}
                    </Text>
                    <Text style={styles.textLeft}>
                      1.1{')'} การสมัครสมาชิกของลูกค้าหรือผู้ใช้บริการ และผู้ให้บริการหรือช่าง ท่านสามารถสมาชิกได้ทุกช่องทางตามที่ระบบมีให้  โดยสมัครและใช้บริการฟรี ตลอด24ชั่วโมง
                      {"\n"}
                      1.2{')'} ผู้สมัครสมาชิกสำเร็จแล้วเท่านั้นถึงจะเข้าระบบบริการต่างๆของแอพพลิเคชั่นได้
                      {"\n"}
                    </Text>
                    <Text>
                      2. การใช้บริการสำหรับลูกค้า
                      {"\n"}
                    </Text>
                    <Text style={styles.textLeft}>
                      2.1{')'} ท่านสามารถเลือกใช้บริการจากช่างในแอพพลิเคชั่นได้ทุกประเภท ทุกรายการ  ตามระบบบริการของแอพพลิเคชั่น
                      {"\n"}
                      2.2{')'} ท่านสามารถ ติดต่อสอบถามหรือพูดคุยกับช่างได้ ตลอด 24 ชั่วโมง โดยจะขึ้นอยู่กับช่างที่จะให้บริการชั่วเวลานั้นๆ หรือสะดวกต่อการให้บริการ
                      {"\n"}
                      2.3{')'} ท่านสามารถตกลงค่าบริการต่างๆได้กับช่างที่ให้บริการโดยตรง ขึ้นอยูกับผู้ใช้บริการและผู้ให้บริการตามประเภทงานนั้นๆ
                      {"\n"}
                      2.4{')'} ท่านสามารถเรียกใช้บริการจากผู้ให้บริการรายเดิมหรือรายใหม่ก็ได้ ขึ้นอยู่กับความพอใจของผู้ใช้บริการ
                      {"\n"}
                      2.5{')'} การตกลงค่าบริการต่างๆ ท่านผู้ใช้บริการยินดีชำระค่าบริการและคิดไตร่ตรองดีแล้วจึงยินยอมชำระค่าบริการ  และในกรณีเกิดความผิดพลาดในการชำระเงินท่านผู้ชำระเงินนั้นจะตามเงินหรือเรียกค่าเสียหายด้วยตัวเองจากบริการช่างประเภทงานนั้นๆ
                      {"\n"}
                    </Text>
                    <Text>
                      3.การใช้บริการสำหรับช่าง
                      {"\n"}
                    </Text>
                    <Text style={styles.textLeft}>
                      3.1{')'} ท่านสามารถรับงานได้ ตามที่ท่านระบุเอาไว้ในแอพพลิเคชั่น ได้ตลอด 24ชั่วโมง ขึ้นอยู่กับการให้บริการจากตัวช่างเอง วันและเวลาขึ้นอยู่กับการตกลงกันระหว่างผู้ให้บริการและผู้ใช้บริการ
                      {"\n"}
                      3.2{')'} ท่านจะต้องลงข้อมูลให้ครบถ้วน เพื่อให้เป็นข้อมูลสำหรับลูกค้าหรือผู้ใช้บริการประเถทงานนั้นๆ ได้ตัดสินใจในการเรียกใช้บริการของผู้ใช้บริการ
                      {"\n"}
                      3.3{')'} ท่านยินดีรับผิดชอบงานที่ได้ตกลงและบริการงานนั้นๆ เพื่อเป็นหลักประกันว่างานที่ให้บริการนั้นเสร็จตามที่ตกลงกับผู้ใช้บริการ
                      {"\n"}
                      3.4{')'} ท่านยินดีชำระเงินจากผู้ใช้บริการตามที่ช่องทางได้ระบุบเอาไว้ในแอพพลิเคชั่น ถ้าหากเกิดข้อผิดพลาดท่านและผู้ใช้บริการนั้นรับผิดชอบกันเองและตรวจสอบค่าบริการต่างๆนั้นดีแล้ว
                      {"\n"}
                    </Text>
                    <Text>
                      4.ข้อห้าม
                      {"\n"}
                    </Text>
                    <Text style={styles.textLeft}>
                      4.1{')'} ห้ามลงข้อมูลเท็จโดยเด็ดขาด เพราะอาจจะถูกตัดสินในการใช้บริการ
                      4.2{')'} ห้ามลงข้อมูลและโฆษณา ที่ทำให้เกิดอันเสื่อมเสียหายต่อตนเองและผู้อื่น
                      4.3{')'} ห้ามลงสื่อลามก,การพนันต่างๆ หรือสิ่งผิดกฎหมายใดๆทั้งสิ้น  เพราะอาจจะถูกดำเนินคดีได้
                    </Text>
                    <TouchableOpacity style={styles.button2}>
                      <Pressable
                        onPress={() => accept()}
                      >
                        <Text
                          style={{
                            fontSize: 32,
                            textAlign: "center",
                            color: "white",
                            marginTop: 4,
                          }}
                        >
                          ยอมรับข้อตกลง
                        </Text>
                      </Pressable>
                    </TouchableOpacity>

                  </ScrollView>
                </>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.button1} onPress={() => serve()}>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: "white",
                padding: 5,
              }}
            >
              สมัครสมาชิก
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{display: 'none'}}>
      <Notifications />
      </View>

      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: '#fff',
  },
  boxIcon: {
    height: 100,
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#37C1FB",
    backgroundColor: "#444",
    marginLeft: 55,
    marginTop: 20,
  },
  box1: {
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
    paddingLeft: 15,
    marginTop: 30,
    borderRadius: 30,
    fontSize: 23,
    backgroundColor: '#e8e9e9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 50,
    color: "#37C1FB",
  },
  button: {
    marginTop: 30,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 70,
  },
  button1: {
    backgroundColor: "#37C1FB",
    height: 50,
    borderRadius: 25,
  },
  button2: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#37C1FB",
    height: 50,
    borderRadius: 25,
    marginBottom: 150
  },
  text1: {
    marginTop: -18,
    fontSize: 16,
  },
  text2: {
    marginLeft: 10,
    marginTop: 18,
    fontSize: 18,
  },
  text3: {
    marginLeft: 2,
    marginTop: 18,
    fontSize: 18,
  },
  text4: {
    marginLeft: 85,
    marginTop: -21,
    fontSize: 18,
    marginBottom: 2,
  },
  text5: {
    marginLeft: 85,
    marginTop: -22,
    fontSize: 18,
    marginBottom: 2,
  },
  textLeft: {
    marginTop: -10,
    marginLeft: 25,
    marginRight: 20
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
    marginTop: -30,
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
  scrollView: {
    marginHorizontal: 5,
    height: "100%",
  },
  icons3: {
    marginTop: 20,
    marginLeft: 55,
    fontSize: 20,
    color: "#37C1FB",
  },
  icons4: {
    marginTop: 20,
    marginLeft: 40,
    fontSize: 20,
    color: "#37C1FB",
    marginRight: 10,
  },
  icons5: {
    marginTop: 15,
    marginLeft: 55,
    fontSize: 20,
    color: "#37C1FB",
    marginRight: 10,
  },
  icons6: {
    textAlign: "right",
    fontSize: 23,
    color: "#000",
    marginRight: 10,
  },
  modalView: {
    marginTop: 60,
    width: "auto",
    height: "auto",
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: "white",
    /*    borderRadius: 20, */
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalTextHead: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 10
  },
  image2: {
    height: 220,
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },

});

export default connect()(Registration);

