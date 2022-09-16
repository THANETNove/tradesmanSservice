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
import { AntDesign } from "@expo/vector-icons";
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
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [idImage1, setIdImage1] = useState(null);
  const [idImage2, setIdImage2] = useState(null);
  const [idImage3, setIdImage3] = useState(null);
  const [idImage4, setIdImage4] = useState(null);
  const [idImage5, setIdImage5] = useState(null);
  const [idImage6, setIdImage6] = useState(null);
  const [heading, setHeading] = useState(null);
  const [detail, setDetail] = useState(null);
  const [seveEdit, setSeveEdit] = useState(true);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [id_user, setId_user] = useState(
    useSelector((state) => state.login.id)
  );
  const [id_shop, setId_shop] = useState(null);
  const [url, setUrl] = useState(useSelector((state) => state.urlImage));
  const dispatch = useDispatch();


  useEffect(() => {
    getShop()
  }, [])

  const getShop = async () => {
    const result1 = await shopImg.getShop(id_user);
    const result2 = await shopImg.getImageShop(id_user);
    /* const url =  useSelector((state) => state.urlImage); */
    /* console.log("result2",result2); */
    if (result1) {
      const data = result1[0];
      setId_shop(data.id)
      setHeading(data.heading)
      setDetail(data.detail)
  }
  if (result2) {
    result2.map((index) => {
      if (index.nameImage === "image1") {
        setIdImage1({
          id: index.id,
          name: index.url_shop
        })
        setImage1({
          uri: `${url}/shop/${index.url_shop}`
        })
      }
      if (index.nameImage === "image2") {
        setIdImage2({
          id: index.id,
          name: index.url_shop
        })
        setImage2({
          uri: `${url}/shop/${index.url_shop}`
        })
      }
      if (index.nameImage === "image3") {
        setIdImage3({
          id: index.id,
          name: index.url_shop
        })
        setImage3({
          uri: `${url}/shop/${index.url_shop}`
        })
      }
      if (index.nameImage === "image4") {
        setIdImage4({
          id: index.id,
          name: index.url_shop
        })
        setImage4({
          uri: `${url}/shop/${index.url_shop}`
        })
      }
      if (index.nameImage === "image5") {
        setIdImage5({
          id: index.id,
          name: index.url_shop
        })
        setImage5({
          uri: `${url}/shop/${index.url_shop}`
        })
      }
      if (index.nameImage === "image6") {
        setIdImage6({
          id: index.id,
          name: index.url_shop
        })
        setImage6({
          uri: `${url}/shop/${index.url_shop}`
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (e === "image1") {
        setImage1(result);
      } else if (e === "image2") {
        setImage2(result);
      } else if (e === "image3") {
        setImage3(result);
      } else if (e === "image4") {
        setImage4(result);
      } else if (e === "image5") {
        setImage5(result);
      } else {
        setImage6(result);
      }
    }
  };
  const serve = async (e) => {
/* console.log("idImage1",idImage1); */
    setActivityIndicator(true)
    setSeveEdit(false)
    
    let result = null;
    let data = [id_user, heading, detail]
    if (image1 !== null) {
      if (idImage1 === null) {
        let userId = [id_user, "image1"]
        const result1 = await shopImg.uplodeImagesShop(image1, userId);
        result = result1;
      }else{
        if (image1.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image1, idImage1.id,idImage1.name);
          result = result1;
        }
      }
    }

    if (image2 !== null) {
      if (idImage2 === null) {
        let userId = [id_user, "image2"]
        const result2 = await shopImg.uplodeImagesShop(image2, userId);
        result = result2;
      }else{
        if (image2.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image2, idImage2.id,idImage2.name);
          result = result1;
        }
      }
    }

    if (image3 !== null) {
      if (idImage3 === null) {
        let userId = [id_user, "image3"]
        const result2 = await shopImg.uplodeImagesShop(image3, userId);
        result = result2;
      }else{
        if (image3.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image3, idImage3.id,idImage3.name);
          result = result1;
        }
      }
    }

    if (image4 !== null) {
      if (idImage4 === null) {
        let userId = [id_user, "image4"]
      const result2 = await shopImg.uplodeImagesShop(image4, userId);
      result = result2;
      }else{
        if (image4.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image4, idImage4.id,idImage4.name);
          result = result1;
        }
      }
    }

    if (image5 !== null) {
      if (idImage5 === null) {
        let userId = [id_user, "image5"]
        const result2 = await shopImg.uplodeImagesShop(image5, userId);
        result = result2;
      }else{
        if (image5.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image5, idImage5.id,idImage5.name);
          result = result1;
        }
      }
    }

    if (image6 !== null) {
      if (idImage6 === null) {
        let userId = [id_user, "image6"]
        const result2 = await shopImg.uplodeImagesShop(image6, userId);
        result = result2;
      }else{
        if (image6.type) {
          const result1 = await shopImg.uplodeUpdateImagesShop(image6, idImage6.id,idImage6.name);
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

  const addImage = () => {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>

            {
              activityIndicator === true ?
                <View style={styles.box8}>
                  <View style={styles.horizontal}>
                    <Text>กำลังบันทึกภาพ</Text>
                    <ActivityIndicator size={80} color="#fff" />
                  </View>
                </View>
                :
                null
            }

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
              <View style={styles.boxhead}>
                <View style={styles.box1}>
                  {image1 && (
                    <Image
                      source={{ uri: image1.uri }}
                      style={styles.image3}
                      onPress={() => pickImage2()}
                    />
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
                    <Image source={{ uri: image2.uri }} style={styles.image3} />
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
                    <Image source={{ uri: image3.uri }} style={styles.image3} />
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
                    <Image source={{ uri: image4.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image4")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image5 && (
                    <Image source={{ uri: image5.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image5")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.box1}>
                  {image6 && (
                    <Image source={{ uri: image6.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image6")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.box_text}>
                  <Text>ชื่อสินค้า</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ชื่อสินค้า"
                    onChange={(e) => {
                      setHeading(e.nativeEvent.text);
                    }}
                    value={heading}
                  /* onChangeText={onChangeText}
                  value={text} */
                  />
                  <Text>รายละเอียดสิค้า</Text>
                  <TextInput
                    style={styles.textarea}
                    onChange={(e) => {
                      setDetail(e.nativeEvent.text);
                    }}
                    multiline={true}
                    numberOfLines={5}
                    value={detail}
                    placeholder="รายละเอียดสิค้า"
                  />
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
/*   console.log("img1",image1);
  console.log("img6",image6); */
  
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
    top: "50%",
    left: "50%",
    marginTop: -50,
    marginLeft: -40,
    zIndex: 1,
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
    width: 110,
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
    height: 280,
    width: 320,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    marginTop: "110%",
    marginLeft: 20,
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
});

export default connect()(Add_product);