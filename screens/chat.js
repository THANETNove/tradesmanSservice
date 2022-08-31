import { React, Component } from "react";
import * as Notifications from 'expo-notifications';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import getMessage from './service/getService';


class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      urlImg: null,
      id_click: this.props.posts.id,
      starusLogin: this.props.posts.login,
      id_maessage: null
    };
  }

  componentDidMount() {
    this.set_State()
  }

  componentDidUpdate(prevProps, prevState) {
    /*     if (prevProps.starusLogin === this.state.starusLogin && this.state.starusLogin !==  null) {
          this.set_State();
         } */
    if (this.state.message === null || prevProps.message !== this.state.message) {
      this.set_State();
    }
  }


  set_State = async () => {
    var { starusLogin, id_click } = this.state;
    if (starusLogin.status_user === "ลูกค้าทั่วไป") {

      const result1 = await getMessage.getMessage_technician_id(starusLogin.id, id_click);
      if (result1) {
        this.setState({
          message: result1,
          urlImg: this.props.posts.urlImage,
        })
      }
      result1 && result1.map((value)=>{
        if ((value.status_read === "0") && (id_click === value.status_user)) {
        /*   console.log(value.id); */
          const id = value.id;
          const status_read = "1";
          const result_status =  getMessage.updateMessage(id,status_read);
        }
      })

    } else {
      const result1 = await getMessage.getMessage_user_id(id_click, starusLogin.id);
      if (result1.status_read === "0") {
         const dataId = [];
        dataId.push(result1[0].id);
        this.setState({
          id_maessage: dataId
        }) 
      }
      if (result1) {
        this.setState({
          message: result1,
          urlImg: this.props.posts.urlImage,
        })
      }


      result1 && result1.map((value)=>{
        if ((value.status_read === "0") && (id_click === value.status_user)) {
          const id = value.id;
          const status_read = "1";
          const result_status =  getMessage.updateMessage(id,status_read);
        }
      })
    }
  }

  click_Message = async () => {
    const { messageUser, starusLogin } = this.state;

    const status_read = 0;
    const status_user = starusLogin.id;
    if (messageUser) {
      const { starusLogin, id_click } = this.state;

      if (starusLogin.status_user === "ลูกค้าทั่วไป") {
        const data = [starusLogin.id, id_click, messageUser, status_read, status_user];
        if (starusLogin.id !== null && id_click !== null) {
          const result1 = await getMessage.addMessage(data);
          if (result1 === "success") {
            this.setState({
              messageUser: null,
            })
          }
        }
        this.notificatio (id_click,"ลูกค้า",messageUser)
      } else {
        const data = [id_click, starusLogin.id, messageUser, status_read, status_user];
        if (starusLogin.id !== null && id_click !== null) {
          const result1 = await getMessage.addMessage(data);
          if (result1 === "success") {
            this.setState({
              messageUser: null,
            })
          }
        }
        this.notificatio (id_click,"ช่าง",messageUser)
      }
    }
  }

  notificatio = async (e,ty,messageUser) => {
    const getNotificatio = await getMessage.getUser(e);
    const expoPushToken = getNotificatio[0].notificationsId;
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: `Message   ${ty}  📬`,
      body: `${messageUser}`,
      data: { someData: 'goes here' },
    };

 
   const userId = e;
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),

    });
  }


  message_user(e) {
    this.setState({
      messageUser: e
    })
  }

  ClickU(e) {
        console.log(e);
    this.props.dispatch({
      type: 'ADD_IDTECHNICAN',
      payload: e
    })
   this.props.navigation.navigate("Profile_tras_user")
  }

  render() {
    const { messageUser, message, starusLogin ,urlImg,id_click} = this.state;

    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.footer}>
            <ScrollView ref={ref => { this.scrollView = ref }} style={styles.screenView}
              onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>

              {
                message && message.map((index) => {

                  if (index.status_user === starusLogin.id) {
                    const name = (
                      <View style={styles.chat}>
                        <View style={styles.box2_1}>
                          <Text style={styles.chat1}>{index.created_at}</Text>
                        </View>
                        <View style={styles.box4}>
                          <Text style={styles.text2}>{index.message}</Text>
                        </View>
                      </View>
                    )
                    return name;
                  } else {
                    const name = (
                      <View  style={styles.row}>
                        <View style={styles.touchable}>
                        <TouchableWithoutFeedback onPress={() => this.ClickU(id_click)}>
                            {
                                index.file_src != null ?
                                <Image style={styles.image} source={{ uri: `${urlImg}profile/${index.file_src}` }} />
                                :
                                <Image style={styles.image} source={require('../assets/images/AAA.png')}/>
                              }
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                        <View style={styles.box2}>
                          <Text style={styles.text1}>{index.created_at}</Text>
                        </View>
                        <View style={styles.box3}>
                          <Text style={styles.text3}>{index.message}</Text>
                        </View>
                        </View>
                      
                       </View>
                    )
                    return name;
                  }
                })
              }

            </ScrollView>

            <View style={styles.box1} >
              <View style={styles.boxhead}>
                <TextInput
                  style={styles.text}
                  placeholder="Type a message"
                  underlineColorAndroid="transparent"
                  value={messageUser}
                  multiline

                  onChange={(e) => this.message_user(e.nativeEvent.text)}
                />
              </View>
            </View>
              <View>
              <TouchableOpacity >
                    <Octicons name="paper-airplane" style={styles.icons} onPress={() => this.click_Message()} />
              </TouchableOpacity>
              </View>
          </View>
        </SafeAreaView>
      </>
    )
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
    justifyContent: "space-between",
  },
  scrollButton: {
    textAlign: "end",
  },
  footer: {
    marginTop:10,
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    width:"80%",  
    paddingTop:10,
    paddingBottom:10,
  },
  text1: {
    fontSize: 13,
    marginLeft: 20,

  },
  text2: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    marginTop: 10,
    marginBottom:10,
    alignSelf:"flex-end",
  },
  text3: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    marginTop: 5,
    marginBottom:10,
    textAlign: "left"
  },
  box1: {
    marginTop:0,
    height: "auto",
    minHeight:50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 10,
    zIndex:0,
    
  },
  box2: {
    marginBottom:10,
    marginLeft:50,
    marginTop:10
  },
  box2_1: {
    marginTop:10,
    marginBottom:5
  },
  touchable: {
    width: 10,
    marginTop:10,
  },
  box3: {
    height: "auto",
    backgroundColor: "#fff",
    padding: -10,
    marginLeft: 70,
    marginRight: 10,
    borderRadius: 5,
    marginRight:50,
    alignSelf:"flex-start"
  },
  box4: {
    height: "auto",
    width:"auto",
    marginBottom:5,
    marginLeft:10,
    marginRight:10,
    borderRadius: 5,
    marginLeft:60,
    backgroundColor: "#33CCFF",
    borderRadius: 5,
    alignSelf:"flex-end"
  },

  icons: {
    fontSize: 30,
    marginTop: 10,
    marginRight: 20,
    alignSelf:"flex-end",
    marginTop:-48,
    zIndex:2,
  },
  image: {
    marginLeft: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  chat: {
    marginTop: 0,
  },
  row: {
    textAlign: "left",
    flexDirection: "row",
  },
  chat1: {
    marginLeft: "auto",
    marginRight: 30,
 
  },
  screenView:{
    bottom:10
  }
});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Chat);


