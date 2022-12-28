import React, { useState, useEffect } from 'react';
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
  TouchableHighlight,
  ActivityIndicator,
  TextInput
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import img1 from "../assets/images/AA1.png";
import shopImg from "./service/getService";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";




const Add_product = ({ navigation: { popToTop, navigate } }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [idImage1, setIdImage1] = useState(null);
  const [idImage2, setIdImage2] = useState(null);
  const [idImage3, setIdImage3] = useState(null);
  const [idImage4, setIdImage4] = useState(null);
  const [heading, setHeading] = useState(null);
  const [detail, setDetail] = useState(null);
  const [seveEdit, setSeveEdit] = useState(true);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [id_user, setId_user] = useState(
    useSelector((state) => state.login.id)
  );
  const [id_shop, setId_shop] = useState(null);
  const [url, setUrl] = useState(useSelector((state) => state.urlImage));

  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    getShop()
  }, [])

  const getShop = async () => {
    const result2 = await shopImg.getHomeImages();
    if (result2) {
      result2.map((index) => {
        if (index.nameImage === "image1") {
            console.log("img1",index.id);
          setIdImage1({
            id: index.id,
            name: index.url_shop
          })
          setImage1({
            uri: `${url}/home/${index.url_shop}`
          })
        }
        if (index.nameImage === "image2") {
            console.log("img2",index.id);
          setIdImage2({
            id: index.id,
            name: index.url_shop
          })
          setImage2({
            uri: `${url}/home/${index.url_shop}`
          })
        }
        if (index.nameImage === "image3") {
            console.log("img3",index.id);
          setIdImage3({
            id: index.id,
            name: index.url_shop
          })
          setImage3({
            uri: `${url}/home/${index.url_shop}`
          })
        }
        if (index.nameImage === "image4") {
            console.log("img4",index.id);
          setIdImage4({
            id: index.id,
            name: index.url_shop
          })
          setImage4({
            uri: `${url}/home/${index.url_shop}`
          })
        }
      })
    }
  }


  const pickImage = async (e) => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      /*  aspect: [5, 5],
       quality: 1, */
    });

    if (!result.cancelled) {
      if (e === "image1") {
        setImage1(result);
      } else if (e === "image2") {
        setImage2(result);
      } else if (e === "image3") {
        setImage3(result);
      } else {
        setImage4(result);
      } 
    }
  };
  const serve = async (e) => {
    setActivityIndicator(true)
    setSeveEdit(false)

    let result = null;
    let data = [id_user, heading, detail]
    if (image1 !== null) {
      if (idImage1 === null) {
        let userId = "image1";
        const result1 = await shopImg.uplodeImagesHome(image1, userId);
        result = result1;
      } else {
        if (image1.type) {
          const result1 = await shopImg.uplodeUpdateImagesHome(image1, idImage1.id,  idImage1.name);
          result = result1;
        }
      }
    }

    if (image2 !== null) {
      if (idImage2 === null) {
        let userId = "image2";
        const result2 = await shopImg.uplodeImagesHome(image2, userId);
        result = result2;
      } else {
        if (image2.type) {
          const result1 = await shopImg.uplodeUpdateImagesHome(image2, idImage2.id, idImage2.name);
          result = result1;
        }
      }
    }

    if (image3 !== null) {
      if (idImage3 === null) {
        let userId = "image3";
        const result2 = await shopImg.uplodeImagesHome(image3, userId);
        result = result2;
      } else {
        if (image3.type) {
          const result1 = await shopImg.uplodeUpdateImagesHome(image3,idImage3.id,  idImage3.name);
          result = result1;
        }
      }
    }

    if (image4 !== null) {
      if (idImage4 === null) {
        let userId = "image4";
        const result2 = await shopImg.uplodeImagesHome(image4, userId);
        result = result2;
      } else {
        if (image4.type) {
          const result1 = await shopImg.uplodeUpdateImagesHome(image4, idImage4.id, idImage4.name);
          result = result1;
        }
      }
    }




    if (id_shop === null) {
      const result2 = await shopImg.createShop(data);
      result = result2;
    } else {
      let data = [id_shop, heading, detail]
      const result2 = await shopImg.updateShop(data);
      result = result2;
    }
    if (result === "success") {
      setActivityIndicator(false)
      await Alert.alert("บันทึกภาพ สำเร็จ");
      await popToTop();
    } else {
      await Alert.alert("บันทึกภาพ ไม่สำเร็จ");
    }
  }

  const deleteImage = async (e, j, k) => {
    Alert.alert(
      "Delete Image",
      "คุณเเน่จะลบภาพ ที่ " + k,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {

            const result2 = shopImg.deleteImagsShop(e, j);
            Alert.alert("ลบภาพ ที่ " + k + "สำเร็จ");
            popToTop();

          }
        }
      ]
    );
  }

  const addImage = () => {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <ImageBackground
                source={img1}
                resizeMode="cover"
                style={styles.backgroun}
              >
              </ImageBackground>
            </View>
            <View style={styles.box6}>
              <View style={styles.box2}>
                <Text style={styles.text1}>รูปสินค้า</Text>
              </View>
              <View style={styles.box3}>
                <Text style={styles.text1}>ภาพที่ 1 จะเป็นภาพหลัก</Text>
                <Text style={styles.text}>ขนาดภาพเเนะนำ 720*720</Text>
              </View>
              <View style={styles.boxhead}>
                <View style={styles.box1}>
                  {image1 && (
                    <>
                      <Image
                        source={{ uri: image1.uri }}
                        style={styles.image3}
                        onPress={() => pickImage()}
                      />
                    </>

                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image1")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image2 && (
                    <>
                      <Image source={{ uri: image2.uri }} style={styles.image3} />
                    </>
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image2")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image3 && (
                    <>
                      <Image source={{ uri: image3.uri }} style={styles.image3} />
                    </>

                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image3")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.boxhead}>
                <View style={styles.box1}>
                  {image4 && (
                    <>
                      <Image source={{ uri: image4.uri }} style={styles.image3} />
                    </>

                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image4")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {
                seveEdit === true ?
                  <View>
                    <TouchableOpacity style={styles.button} onPress={() => serve()}>
                      <Text style={styles.text3}>บันทึกข้อมูล</Text>
                    </TouchableOpacity>
                  </View>
                  : null
              }
              {
                activityIndicator === true ?
                  <View style={styles.box8}>
                    {/* <TouchableHighlight style={styles.button}> */}
                    <View style={styles.horizontal}>
                      <Text>กำลังบันทึกภาพ</Text>
                      <ActivityIndicator size={60} color="#37C1FB" />
                    </View>
                    {/* </TouchableHighlight> */}
                  </View>
                  :
                  null
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };



  return (
    <>
      {
        addImage()
      }
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    container: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
  },
  horizontal: {
    position: "absolute",
    top: "40%",
    left: "50%",
    marginTop: -30,
    marginLeft: -40,
    zIndex: 1,
    fontSize: 16,
    marginBottom: 20,
    /*     color: "#37C1FB", */
  },
  backgroun: {
    width: "100%",
    height: 220,
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
    width: "100%"
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 40,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image2: {
    width: 145,
    height: 145,
    marginTop: -6,
    marginLeft: -5.5,

  },
  image3: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    position: "absolute",
  },
  image4: {
    width: 320,
    height: 200,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b1b1b1',

  },
  image5: {
    height: 220,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },
  box1: {
    width: "30%",
    height: 150,
    marginTop: 5,
    marginLeft: 7,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 4,

  },
  box: {
    width: 160,
    height: 180,
    padding: 2,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginLeft: "auto",
    marginRight: "auto",

  },
  box2: {
    height: 25,
    width: 120,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 20,
  },
  box3: {
    height: 30,
    width: "auto",
    marginTop: 20,
    marginBottom: 20

    /*     backgroundColor: "#FFF", */
    /*     shadowColor: "#000",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
        borderRadius: 10,
        marginLeft: 15,
        marginTop: 20, */
  },
  box5: {
    height: 25,
    width: 120,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: -5,
  },

  box6: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -44,
    marginBottom: 10,
  },
  box8: {
    marginBottom: 40,
    paddingBottom: 40
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 2,
  },
  text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  text3: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
  },
  icons: {
    fontSize: 35,
    color: "#e2e2e2",
    textAlign: "center",
    marginTop: 55,
  },
  button: {
    height: 50,
    width: 280,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 30,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  box_text: {
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textarea: {
    minHeight: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  icons5: {
    position: "absolute",
    color: "red",
    backgroundColor: "#fff",
    zIndex: 2,
    fontSize: 30,
    borderRadius: 30,
  },
  comment: {
    color: "red",
    fontSize: 16,

  },
  commentBox: {
    backgroundColor: "#ced4da",
    minHeight: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

});

export default connect()(Add_product);