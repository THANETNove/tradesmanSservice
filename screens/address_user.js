import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import technician_type from "./service/getService";
import * as Location from "expo-location";
import { setDisabled } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import img1 from "../assets/images/AA1.png";
import login from "./login";

// You can import from local files

let apiKey = "AIzaSyBdjxXSNpAnyW0lzE_uliQ121U4mkmSgPk";

const Address_user = ({ navigation: { popToTop, navigate } }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [name, setName] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [email, setEmail] = useState(null);
  const [addressUser, setAddressUser] = useState(null);
  const [subdistrict, setSubdistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [technicianType, setTechnicianType] = useState(null);
  const [idPhone, setIdPhone] = useState(
    useSelector((state) => state.login.id)
  );
  const [statusAddress, setStatusAddress] = useState(null);
  const [statusEdit, setStatusEdit] = useState(false);
  const [id, setId] = useState(null);
  const [seveEdit, setSeveEdit] = useState(true);
  const dispatch = useDispatch();

  const mapRef = React.createRef();



  //componentDidMount เปิดมาครั้งเเลกเเล้วทำงาน 1 ครั้ง
  useEffect(() => {

    if (id == null) {
      getAddress_user(idPhone);
    }


  }, [])



  const serve = async () => {

    const data = [
      idPhone,
      name,
      phone_number,
      email,
      addressUser,
      subdistrict,
      district,
      province,
      zipcode,
      location,
    ];
    setSeveEdit(false)

    const result = await technician_type.createAddress_user(data);

    if (result === "success") {

      await getAddress_user(idPhone);
      Alert.alert("บันทึกสำเร็จ");

      await popToTop();
    } else {
      Alert.alert("บันทึกไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const getAddress_user = async (e) => {
    const result1 = await technician_type.getAddress_user(e);

    if (result1) {
      setStatusAddress(result1)
      setId(result1.id)
      var data3 = {
        id: result1.id,
        name: result1.name,
        phone_number: result1.phone_number,
        email: result1.email,
        addressUser: result1.address,
        subdistrict: result1.subdistrict,
        district: result1.district,
        province: result1.province,
        zipcode: result1.zipcode,
        location: JSON.parse(result1.location),
      };

      dispatch({
        type: "ADD_ADDRESS_USER",
        payload: data3,
      });
      dispatch({
        type: 'ADD_STATUSUPDATE',
        payload: true
      });

    }
  };

  const edit = async () => {

    setStatusEdit(true);
    setSeveEdit(true)
    setId(statusAddress.id);
    setName(statusAddress.name);
    setPhone_number(statusAddress.phone_number);
    setEmail(statusAddress.email);
    setAddressUser(statusAddress.addressUser);
    setSubdistrict(statusAddress.subdistrict);
    setDistrict(statusAddress.district);
    setProvince(statusAddress.province);
    setZipcode(statusAddress.zipcode);
    setLocation({
      latitude: statusAddress.location.latitude,
      longitude: statusAddress.location.longitude,
    });
  };


  const update = async () => {
    const data = [
      id,
      name,
      phone_number,
      email,
      addressUser,
      subdistrict,
      district,
      province,
      zipcode,
      location,
    ];


    setSeveEdit(false)
    const result = await technician_type.updateAddress_user(data);
    if (result === "success") {
      await getAddress_user(idPhone);

      Alert.alert("เเก้ไขสำเร็จ");
      setStatusEdit(false);
      /*  await popToTop(); */
    } else {
      Alert.alert("เเก้ไขไม่สำเร็จ กรุณาลองใหม่");
    }
  };


  // componentDidUpdate ถ้าข้อมูลใน start มีการเปลี่ยนเเปลง ถึงจะอัพเดต
  /*   useEffect(() => {
        // loginA = ture เปิด 
      if (loginA === false) {
        getLocation();
      }
     
    } ,[loginA]) */

  /*   componentDidUpdate(prevProps, prevState) {
      const {technician} = this.state;
      if(prevProps.loginA  !== loginA){
       
      }
    } */
  /* 
    const url = useSelector(state => ({ ...state }));
    console.log("url", url); */
  const image = {
    uri: "https://www.roojai.com/wp-content/uploads/2018/07/how-to-choose-garage-car-mechanic-cover.jpg",
  };

  const addAddress = () => {
    console.log("11");
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <ImageBackground
                source={img1}
                resizeMode="cover"
                style={styles.image2}
              >
                {/*                 <View style={styles.container}>
                  <View style={styles.box5}>
                  <Image
                    style={styles.image}
                    source={require('../assets/images/AA1.png')}
                  />
                  </View>
                </View> */}
              </ImageBackground>
            </View>

            <View style={styles.box3}>
              <View>
                <Text style={styles.text1}>รายละเอียดติดต่อ</Text>
              </View>
              <View style={styles.boxhead}>
                <View>
                  <Text style={styles.text2}>{"ชื่อ"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setName(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"เบอร์ติดต่อ"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setPhone_number(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"อีเมล"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setEmail(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"ที่อยู่"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setAddressUser(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"แขวง/ตำบล"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setSubdistrict(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"เขต/อำเภอ"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setDistrict(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"จังหวัด"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setProvince(e.nativeEvent.text);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.text2}>{"รหัสไปรษณีย์"}</Text>
                  <TextInput
                    style={styles.box4}
                    onChange={(e) => {
                      setZipcode(e.nativeEvent.text);
                    }}
                  />
                </View>

              </View>
              {
                seveEdit === true ?
                  <>
                    <TouchableOpacity style={styles.button} onPress={() => serve()}>
                      <Text style={styles.text}>บันทึก</Text>
                    </TouchableOpacity>
                  </>

                  : null
              }

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };

  const showAddress = () => {

    return (
      <>
        <ScrollView>
          <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/AA1.png")}
            />
          </View>
          <View style={styles.box}>
            <View>
              <Text style={styles.text1}>รายละเอียดติดต่อ </Text>
            </View>
            <TouchableOpacity style={styles.button1} onPress={() => edit()}>
              <Text style={styles.text5}>แก้ไขข้อมูล</Text>
            </TouchableOpacity>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"ชื่อ"}</Text>
              <Text style={styles.text7}>{statusAddress.name}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"เบอร์ติดต่อ"}</Text>
              <Text style={styles.text7}>{statusAddress.phone_number}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"อีเมล"}</Text>
              <Text style={styles.text7}>{statusAddress.email}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"ที่อยู่"}</Text>
              <Text style={styles.text7}>{statusAddress.addressUser}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"แขวง/ตำบล"}</Text>
              <Text style={styles.text7}>{statusAddress.subdistrict}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"เขต/อำเภอ"}</Text>
              <Text style={styles.text7}>{statusAddress.district}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"จังหวัด"}</Text>
              <Text style={styles.text7}>{statusAddress.province}</Text>
            </View>

            <View style={styles.box7}>
              <Text style={styles.text6}>{"รหัสไปรษณีย์"}</Text>
              <Text style={styles.text7}>{statusAddress.zipcode}</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const editAddress = () => {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <ImageBackground
                source={img1}
                resizeMode="cover"
                style={styles.image2}
              >
              </ImageBackground>
            </View>

            <View style={styles.box3}>
              <View>
                <Text style={styles.text1}>แก้ไขข้อมูล</Text>
              </View>
              <View style={styles.boxhead}>
                <View>
                  <Text style={styles.text2}>{"ชื่อ"}</Text>
                  <TextInput
                    value={name}
                    style={styles.box4}
                    onChange={(e) => {
                      setName(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"เบอร์ติดต่อ"}</Text>
                  <TextInput
                    value={phone_number}
                    style={styles.box4}
                    onChange={(e) => {
                      setPhone_number(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"อีเมล"}</Text>
                  <TextInput
                    value={email}
                    style={styles.box4}
                    onChange={(e) => {
                      setEmail(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"ที่อยู่"}</Text>
                  <TextInput
                    value={addressUser}
                    style={styles.box4}
                    onChange={(e) => {
                      setAddressUser(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"แขวง/ตำบล"}</Text>
                  <TextInput
                    value={subdistrict}
                    style={styles.box4}
                    onChange={(e) => {
                      setSubdistrict(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"เขต/อำเภอ"}</Text>
                  <TextInput
                    value={district}
                    style={styles.box4}
                    onChange={(e) => {
                      setDistrict(e.nativeEvent.text);
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.text2}>{"จังหวัด"}</Text>
                  <TextInput
                    value={province}
                    style={styles.box4}
                    onChange={(e) => {
                      setProvince(e.nativeEvent.text);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.text2}>{"รหัสไปรษณีย์"}</Text>
                  <TextInput
                    value={zipcode}
                    style={styles.box4}
                    onChange={(e) => {
                      setZipcode(e.nativeEvent.text);
                    }}
                  />
                </View>

              </View>
              {
                seveEdit === true ?
                  <TouchableOpacity style={styles.button} onPress={() => update()}>
                    <Text style={styles.text}>บันทึก</Text>
                  </TouchableOpacity>
                  : null
              }

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };

  /* console.log(useSelector((state) => ({ ...state }))); */

  return (
    <>
      {statusAddress === null
        ? addAddress()
        : statusEdit === true
          ? editAddress()
          : showAddress()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  containerMap: {
    padding: 20,
  },
  map: {
    width: "auto",
    height: 300,
  },
  icons: {
    fontSize: 25,
    marginTop: 13,
    marginLeft: 75,
  },
  backgroun: {
    width: 360,
    height: 250,
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -8,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 100,
    marginLeft: -5,
    marginTop: -5

  },
  image1: {
    width: 128,
    height: 145,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image2: {
    height: 220,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },
  box: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -30,
    marginBottom: 30,
    borderRadius: 15,
  },
  box1: {
    height: 300,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 6,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    marginTop: 5,
  },
  box3: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -45,
    marginBottom: 10,
  },
  box4: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 6,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 5,
  },
  box4_1: {
    height: "auto",
    width: 300,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },
  box5: {
    height: 140,
    width: 140,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 4,
    borderColor: "#fff",
  },
  box6: {
    height: 150,
    width: 280,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 5,
    marginTop: 5,
    fontSize: 16,
  },
  box7: {
    height: 40,
    width: "90%",
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 6,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 15,
  },

  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 30,
    padding: 6,
  },
  text1: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  text2: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
  text3: {
    marginLeft: 5,
    fontSize: 18,
    padding: 10,
  },
  text4: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 30,
    fontWeight: "bold",
  },
  text5: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 15,
    padding: 6,
    color: '#fff',
  },
  text6: {
    marginLeft: 0,
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "bold",
  },
  text7: {
    fontSize: 18,
    marginTop: -20,
    textAlign: 'right',
    marginRight: 20,
  },
  input: {
    height: 50,
    width: 150,
    fontSize: 25,
    marginLeft: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 2,
  },
  forme: {
    marginLeft: 150,
    marginTop: -58,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
  },
  button1: {
    height: 30,
    width: 90,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: 250,
    marginTop: -25,
    marginBottom: 5,
    borderRadius: 10,
  },
});

export default connect()(Address_user);
