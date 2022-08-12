import React, { Component , useState,useEffect} from 'react';
import { SafeAreaView,StyleSheet,TextInput,Text,TouchableOpacity , View, Image, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import bookBank from './service/getService';
import {useSelector,useDispatch} from 'react-redux';
import { connect } from "react-redux";

 
const FromBank = ({ navigation: { popToTop } }) => {

    const [name, setName] = useState(null);
    const [number_bank, setNumber_bank] = useState(null);
    const [bank, setBank] = useState(null);
    const [id_user, setId_user] = useState(useSelector((state) => state.login.id));
    const [statusBookBank ,setBookBank] = useState(useSelector((state) => state.bookbank));
    const dispatch = useDispatch();

    const serve = async () => {
      const data = [id_user,name, number_bank, bank];
             const result = await bookBank.createBookBank(data);
             if (result === "success") {
              getBookBank(id_user)
              await  alert('บันทึกสำเร็จ');
              await popToTop();
            }else{
              await  alert('บันทึกไม่สำเร็จ กรุณาลองใหม่');
            } 
      };

     const update  = async () =>  {
       let id =  statusBookBank[0].id;
       console.log(id);
          const data = [id,name, number_bank, bank];
          const result = await bookBank.updateBookBank(data);
          if (result === "success") {
          getBookBank(id_user)
          await  alert('บันทึกสำเร็จ');
          await popToTop();
        }else{
          await  alert('บันทึกไม่สำเร็จ กรุณาลองใหม่');
      } 
     }
      
    const  getBookBank = async (e) => {
      const result1 = await bookBank.getBookBank(e);
          if (result1 !== null) {
            await dispatch({
              type: "ADD_BOOKBANK",
              payload: result1,
            });
        } 
      }
  const setbank = async () => {
        setName(statusBookBank[0].name)
        setNumber_bank(statusBookBank[0].number_bank)
        setBank(statusBookBank[0].bank)
      
    }


  useEffect(() => {
    if (statusBookBank === null ) {
        getBookBank(id_user);
    }else {
      setbank();
    }
  }, []);

  const addBookBank = () => {
    return (
      <>
      <SafeAreaView style={styles.container}> 
        <ScrollView>
        <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/BB-2.png")}
            />
          </View>
            <View style={styles.box}>
              <View>
                <Text style={styles.text1}>บัญชีธนาคาร</Text>
              </View>
              <View style={styles.boxhead}>
                <View>
                    <Text style={styles.text2}>{'ชื่อบัญชีธนาคาร'}</Text>
                    <TextInput style={styles.box2} 
                     onChange={(e) => {
                        setName(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View>
                    <Text style={styles.text2}>{'เลขบัญชีธนาคาร'}</Text>
                    <TextInput style={styles.box2}
                     onChange={(e) => {
                        setNumber_bank(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View>
                    <Text style={styles.text2}>{'ธนาคาร'}</Text>
                    <TextInput style={styles.box2} 
                    id="backname"
                    onChange={(e) => {
                        setBank(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View >
                    <TouchableOpacity  style={styles.button} onPress={() => serve()}>
                      <Text style={styles.text}>บันทึกข้อมูล</Text>
                    </TouchableOpacity>
                </View>
            
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
      </>
    )
  }

   const editBookBank = () => {
    return (
      <>
      <SafeAreaView style={styles.container}> 
        <ScrollView>
        <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/BB-2.png")}
            />
          </View>
            <View style={styles.box}>
              <View>
                <Text style={styles.text1}>เเก้บัญชีธนาคาร</Text>
              </View>
              <View style={styles.boxhead}>
                <View>
                    <Text style={styles.text2}>{'ชื่อบัญชีธนาคาร'}</Text>
                    <TextInput style={styles.box2} 
                    value={name}
                     onChange={(e) => {
                        setName(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View>
                    <Text style={styles.text2}>{'เลขบัญชีธนาคาร'}</Text>
                    <TextInput style={styles.box2} 
                      value={number_bank}
                     onChange={(e) => {
                        setNumber_bank(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View>
                    <Text style={styles.text2}>{'ธนาคาร'}</Text>
                    <TextInput style={styles.box2} 
                     value={bank}
                    id="backname"
                    onChange={(e) => {
                        setBank(e.nativeEvent.text);
                      }}
                    />
                </View>

                <View >
                    <TouchableOpacity  style={styles.button} onPress={() => update()}>
                      <Text style={styles.text}>บันทึกข้อมูล</Text>
                    </TouchableOpacity>
                </View>
            
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
      </>
    )
  } 
 

    return (

     <>
      {
        statusBookBank === null ? 
        addBookBank()
        : 
        editBookBank()
      }
     </>
    );
  }




const styles = StyleSheet.create({
container: {
    width: '100%',
    height: '100%',
    position: 'relative',

  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -45,
    marginBottom: 20,
    borderRadius: 15,
  },
  box2: {
    height: 45 ,
    width: 300,
    backgroundColor: '#e8e9e9',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 10,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
    color: '#fff'
  },
  text1: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  },
    text2: {
      marginLeft: 35,
      fontSize: 16,
      marginTop: 15,
      fontWeight: 'bold',
    },
  icons: {
    fontSize: 25,
    marginTop: 13,
    marginLeft: 75
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: '#37C1FB',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 30,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 30,
  },
  image2: {
    height: 220,
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },

});



export default connect()(FromBank); 