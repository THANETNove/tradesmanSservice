import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import get_technician from '../service/getService';

class Profile_tras_user extends Component {

  constructor(props) {
    super(props);
    this.state = {
      technician: null,
      urlImg: null,
      login: null
    };
  }



  componentDidMount() {
    
    var id = this.props.posts.id;
    console.log("technician",this.state.technician);
    this.setState({
      login: this.props.posts.login,
    })
    if (this.props.posts.login.status_user === "ช่าง") {
      this.andUsers(id);
    }else{
      this.technicianAndUser(id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {id} = this.props.posts;


    if(prevProps.id !== this.state.id){
      if (this.props.posts.login.status_user === "ช่าง") {
        this.andUsers(id);
      }else{
        this.technicianAndUser(id);
      }
    }
  
  }
  componentDidUpdate(prevProps, prevState) {
    const {technician} = this.state;
    if(prevProps.technician != technician || technician === null){
      const {id} = this.props.posts;
      if (this.props.posts.login.status_user === "ช่าง") {
        this.andUsers(id);
      }else{
        this.technicianAndUser(id);
      }
    }
  }

  technicianAndUser = async (e) => {
    const result1 = await get_technician.gettechnicianAddressid(e);
    this.setState({
      technician: result1,
      urlImg: this.props.posts.urlImage,
    })

  }
  andUsers = async (e) => {
    const result2 = await get_technician.getUserAddressid(e);
    this.setState({
      technician:  result2[0],
      urlImg: this.props.posts.urlImage,
    })

  }

  render() {


    const { technician, urlImg, login } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.box}>
            <View style={styles.box1}>
              <View style={styles.box6}>
                {
                  technician != null ?
                    technician.file_src !== null ?
                      <Image style={styles.imgPro} source={{ uri: `${urlImg}profile/${technician.file_src}` }} />
                      :
                      <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />
                    :
                    <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />
                }

              </View>
              {
                technician != null ?

                  technician.name != null ?
                    <Text style={styles.text}>{technician.name}</Text>
                    :
                    <>
                    <Text style={styles.text}>TECHNICIAN ONLINE</Text>
                      <Text style={styles.text1}>ยังไม่มีขูมูล</Text>
                    </>
                  :
                <>
                    <Text style={styles.text}>TECHNICIAN ONLINE</Text>
                  <Text style={styles.text1}>ยังไม่มีขูมูล</Text>
                </>

              }


            </View>
          </View>

          <View style={styles.top}>
            {login === "ลูกค้าทั่วไป" ?
              <>
                <View style={styles.box3}>
                  <FontAwesome5 name="file-image" style={styles.icons5} />
                  <Text style={styles.text2}
                    onPress={() => this.props.navigation.navigate("workings_tras_user")}>{"ผลงาน"}
                  </Text>
                </View>
              </>
              :
              null
            }


            <View style={styles.box3}>
              <FontAwesome5 name="address-book" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("address")}>{"ข้อมูลการติดต่อ"}
              </Text>
            </View>

            <View style={styles.box3}>
              <Ionicons name="chatbox-ellipses-sharp" style={styles.icons5} />
              <Text
                style={styles.text2}
                onPress={() => this.props.navigation.navigate("Chat")}>{"แชท"}
              </Text>
            </View>

            {login === "ลูกค้าทั่วไป" ?
              <>
                   <View style={styles.box3}>
                  <Ionicons name="card" style={styles.icons5} />
                  <Text
                    style={styles.text2}
                    onPress={() => this.props.navigation.navigate("Ahow_bank")}>{"บัญชีธนาคาร"}
                  </Text>
                </View>
              </>
              :
              null
            }
         

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
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imgPro: {
    height: 130,
    width: 130,
    backgroundColor: '#37C1FB',
    shadowColor: "#000",
    borderRadius: 100,
    zIndex: 1,

  },
  image3: {
    width: 142,
    height: 142,
    marginTop: -5,
    marginLeft: -4,
    marginRight: 'auto',
  },
  top: {
    marginTop: 20,
  },
  box: {
    height: 260,
    width: "100%",
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,

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
    marginBottom: 4,
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
    borderWidth: 5,
    borderColor: '#fff',
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 15,
  },
  text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize:16,
  },

  text2: {
    marginLeft: 55,
    fontSize: 20,
    marginTop: -35,
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

});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Profile_tras_user);


