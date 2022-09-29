import React, { Component } from 'react';
import { SafeAreaView,StyleSheet,Text,TextInput, View,TouchableOpacity, Alert} from 'react-native';
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import rest from "./service/getService";
var md5 = require("md5");
class Reset_paeeword extends Component {
  constructor() {
    super();
    this.state = {
      phone: null,
      password: null,
      show: false,
      restPass: "",
      newPass: false,
      id:null
    };
  }
  handleOnPress(e,j){
    if (j === "phone") {
      this.setState({
        phone: e,
      })
    }else{
      this.setState({
        password: e,
      })
    }
    
  }
  checkPhon = async()=> {
    const {phone,newPass} = this.state;
    this.setState({
      show: false,
      restPass: "" 
    })
    if (phone !== null && phone !== "" ) {
      const result = await rest.getRestPassword(phone);
      console.log(result[0].id);
      if (result === null) {
        this.setState({
          restPass: null
        })
      }else{
        this.setState({
          newPass: true,
          id:result[0].id
        })
      }
    }else{
      this.setState({
        show: true,
      })
    } 

  }

  savePassword = async()=> {
    const {id,password} = this.state;
    const data = [id,md5(password)]
    console.log("data",data);
    if (password !== null && password !== " " ) {
      const result = await rest.updatePasswors(data);
      await Alert.alert(
        "สร้าง Password ใหม่สำเร็จ",
        `Password ของคุณคือ ${password}`,
      );
      await this.props.navigation.goBack();
    }
   
  }

  reaetPhon() {
  const {show,restPass} = this.state;
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>
              Reset password
          </Text>
        </View>

        <View style={styles.marginTop}>
            <View >
                <Text style={styles.text1}>
                    กรุณากรอกเบอร์โทรศัพท์ ที่ใช้ในการสมัคร
                </Text>
            </View>

            <View style={styles.input}>
                <FontAwesome name="phone-square" size={24} color="#00c2fe" />
                <TextInput
                    keyboardType='numeric'
                    style={{flex: 1, paddingLeft: 12}}
                    placeholder="เบอร์โทรศัพท์ "
                   /*  underlineColorAndroid="phone" */
                    onChange={(e) =>
                      this.handleOnPress(e.nativeEvent.text, "phone")
                    }
                />
            </View>
            {show === true ?  <Text style={styles.text2}>กรุณากรอกเบอร์โทรศัพท์</Text> : 
              null
            }
            {
               restPass === null ?  <Text style={styles.text2}>หมายเลขโทรศัพท์ ไม่ถูกต้อง</Text>: null
            }
        </View>

          <View style={styles.button}>
            <TouchableOpacity   style={styles.button1} onPress={() => this.checkPhon()}>
              <Text  style={{ fontSize: 34 , textAlign: 'center' ,color: 'white', marginTop: 3,}}>reset</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    )
  }

  newPassword() {
    const {password} = this.state;
    console.log("password",password);
    return(
      <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
            New password
        </Text>
      </View>

      <View style={styles.marginTop}>
          <View >
              <Text style={styles.text3}>
                  กรุณากรอก Password ใหม่
              </Text>
          </View>

          <View>
            <View style={styles.input}>
            <MaterialCommunityIcons name="form-textbox-password" size={24} color="#00c2fe"/>
                <TextInput
                    style={{flex: 1, paddingLeft: 12}}
                    placeholder="password"
                    /* value={password} */
                   /*  underlineColorAndroid="transparent" */
                    secureTextEntry={true}
                    onChange={(e) =>
                      this.handleOnPress(e.nativeEvent.text, "password")
                    }
                /> 
            </View>
          </View>
      </View>

        <View style={styles.button}>
          <TouchableOpacity   style={styles.button1} onPress={() => this.savePassword()}>
            <Text  style={{ fontSize: 34 , textAlign: 'center' ,color: 'white', marginTop: 3,}}>Save</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
  }

  render() {
    const {newPass,password} = this.state;
    console.log("password",password);
    return (
      <>
      {
        newPass === false ?  this.reaetPhon() :  this.newPassword()
       
      }
      </>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
  },
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00c2fe',
    fontSize: 23,
  },
  input2: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: '30%',
    color: '#00c2fe',
  },
  button: {
    marginTop: 40,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 70
    },
  button1: {
  backgroundColor: '#01C1FF',
  height: 50,
  borderRadius: 25,
  },
  text1: {
    marginLeft: 30,
    marginTop: -18,
    fontSize: 18,
  },
  text2: {
    marginLeft: 60,
    marginTop: 10,
    fontSize: 18,
    color: "red"
  },
  text3: {
    marginLeft: 50,
    marginTop: -18,
    fontSize: 18,
  },
  marginTop: {
    marginTop: 50,
  },
});


export default Reset_paeeword; 