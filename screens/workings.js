import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import bookBank from "./service/getService";
import { AntDesign } from "@expo/vector-icons";
import img1 from "../assets/images/BB-1.png";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

const ImagePickerExample = ({ navigation: { popToTop, navigate } }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  const [image8, setImage8] = useState(null);
  const [image9, setImage9] = useState(null);
  const [seveEdit, setSeveEdit] = useState(true);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [statusImage, setStatusImage] = useState(
    useSelector((state) => state.image)
  );
  const [statusEditImage, setStatusEditImage] = useState(false);
  const [id_user, setId_user] = useState(
    useSelector((state) => state.login.id)
  );
  const dispatch = useDispatch();
  const url = useSelector((state) => state).urlImage;
  
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
      } else if (e === "image6") {
        setImage6(result);
      } else if (e === "image7") {
        setImage7(result);
      } else if (e === "image8") {
        setImage8(result);
      } else {
        setImage9(result);
      }
    }
  };

  const pickImage2 = async () => {
    console.log("555");
  };


  const serve = async (e) => {
    setActivityIndicator(true)
    setSeveEdit(false)
    let result = null;
    if (image1 !== null) {
      const result1 = await bookBank.uplodeImages(image1, id_user);
      result = result1;
    }
    if (image2 !== null) {
      const result2 = await bookBank.uplodeImages(image2, id_user);
      result = result2;
    }
    if (image3 !== null) {
      const result2 = await bookBank.uplodeImages(image3, id_user);
      result = result2;
    }
    if (image4 !== null) {
      const result2 = await bookBank.uplodeImages(image4, id_user);
      result = result2;
    }
    if (image5 !== null) {
      const result2 = await bookBank.uplodeImages(image5, id_user);
      result = result2;
    }
    if (image6 !== null) {
      const result2 = await bookBank.uplodeImages(image6, id_user);
      result = result2;
    }
    if (image7 !== null) {
      const result2 = await bookBank.uplodeImages(image7, id_user);
      result = result2;
    }
    if (image8 !== null) {
      const result2 = await bookBank.uplodeImages(image8, id_user);
      result = result2;
    }
    if (image9 !== null) {
      const result2 = await bookBank.uplodeImages(image9, id_user);
      result = result2;
    }
 
   /*  console.log("result", result); */

    if (result === "success") {
      await getImags(id_user);
      setActivityIndicator(false)
      await Alert.alert("บันทึกภาพ สำเร็จ");
      await popToTop();
    } else {
      await Alert.alert("บันทึกภาพ ไม่สำเร็จ");
    }
  };
  const updateImage = async () => {
    setSeveEdit(false)
    setActivityIndicator(true)
    let nameImage = JSON.parse(statusImage);
    let index = JSON.parse(statusImage).length;
    var dataImage = [image1, image2, image3, image4, image5, image6, image7, image8, image9 ];
   
    
    
    let result;
    for (let i = 0; i < index; i++) {
      let id = nameImage[i].id;
      let name = nameImage[i].file_src;
      if (dataImage[i] !== null) {
        const result1 = await bookBank.uplodeUpdateImages(
          dataImage[i],
          id,
          name
        );
        result = result1;
      }
    }

    for (let i = index; i < 9; i++) {
      console.log("I", dataImage[i]);

      if (dataImage[i] !== null) {
        const result2 = await bookBank.uplodeImages(dataImage[i], id_user);
        result = result2;
      }
    }

    if (result === "success") {
      await getImags(id_user);
      setActivityIndicator(false)
      await Alert.alert("บันทึกภาพ สำเร็จ");
      
      await popToTop();
    } else {
      await Alert.alert("บันทึกภาพ ไม่สำเร็จ");
    }
  };

  const getImags = async (e) => {
    const result = await bookBank.getImage(e);
    const data = JSON.stringify(result);

    if (result !== null) {
      await dispatch({
        type: "ADD_IMAGE",
        payload: data,
      });
      await setStatusImage(data);
    }
  };

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
                <View style={styles.box4}>
                  <Image
                    style={styles.image2}
                    source={require("../assets/images/AAA.png")}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.box6}>
              <View style={styles.box2}>
                <Text style={styles.text1}>ประเภทงาน 1</Text>
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

              <View style={styles.box5}>
                <Text style={styles.text1}>ประเภทงาน 2</Text>
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
              </View>

              <View style={styles.box5}>
                <Text style={styles.text1}>ใบประกาศ</Text>
              </View>

              <View style={styles.boxhead}>
                <View style={styles.box1}>
                  {image7 && (
                    <Image source={{ uri: image7.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image7")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image8 && (
                    <Image source={{ uri: image8.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image8")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image9 && (
                    <Image source={{ uri: image9.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image9")}
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
  const showImage = () => {
    if (statusImage !== null) {
      var img = JSON.parse(statusImage);
    }
    /*     console.log(img[0].file_src); */
    return (
      <>
        {statusImage !== null ? (
          <>
            <ScrollView>
              <View>
                <Image
                  style={styles.image5}
                  source={require("../assets/images/BB-2.png")}
                />
              </View>
              <View style={styles.box6}>
                <View style={styles.top}>
                  <View>
              <Text style={styles.text4}>รูปภาพเกี่ยวกับงาน </Text>
            </View>
                  <TouchableOpacity style={styles.button1}>
                    <Text 
                    style={styles.text5}
                    onPress={() => edit()}>แก้ไขภาพ</Text>
                  </TouchableOpacity>
                  
                  {JSON.parse(statusImage).map((index) => {
                    const image = (
                      <Image
                        source={{ uri: `${url}${index.file_src}` }}
                        style={styles.image4}
                      />
                    );

                    return image;
                  })}
                </View>
              </View>
            </ScrollView>
          </>
        ) : null}
      </>
    );
  };
  const edit = () => {
    
    setStatusEditImage(true);
  };

  const editImage = () => {

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {
            activityIndicator === true ?   
           <View style={styles.box8}>
             <View style={styles.horizontal}>
              <Text>กำลังอัพเดทภาพ</Text>
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
                <View style={styles.box4}>
                  <Image
                    style={styles.image2}
                    source={require("../assets/images/AAA.png")}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.box6}>
              <View style={styles.box2}>
                <Text style={styles.text1}>เเก้ไขภาพงาน 1</Text>
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

              <View style={styles.box5}>
                <Text style={styles.text1}>แก้ไขภาพงาน 2</Text>
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

                <View style={styles.box7}>
                <Text style={styles.text1}>แก้ไขใบประกาศ</Text>
                </View>  

                 <View style={styles.boxhead}>
                 <View style={styles.box1}>
                  {image7 && (
                    <Image source={{ uri: image7.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image7")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image8 && (
                    <Image source={{ uri: image8.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image8")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                  {image9 && (
                    <Image source={{ uri: image9.uri }} style={styles.image3} />
                  )}
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.icons}
                      onPress={() => pickImage("image9")}
                    />
                  </TouchableOpacity>
                </View>
                  </View>   
                

              </View>
                
                {
                  seveEdit === true ?
                  <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => updateImage()}
                  >
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

  useEffect(() => {
    if (statusImage === null) {
      getImags(id_user);
    }
  }, []);


  return (
    <>
      {statusImage === null
        ? addImage()
        : statusEditImage === true
        ? editImage()
        : showImage()}
    </>
  );
};

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
  box3: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    marginLeft: 30,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 5,
  },
  box4: {
    height: 140,
    width: 140,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 5,
    borderColor: "#fff",
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
  box7: {
    height: 25,
    width: 120,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 15,
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
    marginTop: 330,
    marginLeft: 20,
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 30,
    color: "#37C1FB",
    marginTop: 5,
  },
  text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  text2: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
  text3: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
  },
  text4: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: -20,
  },
  text5: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 15,
    padding: 6,
    color: '#fff',
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
  top: {
    marginTop: 40,
  },
});

export default connect()(ImagePickerExample);
