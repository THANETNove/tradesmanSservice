import React, { Component } from 'react';
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
    TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import shopImg from "./service/getService";

class Add_shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.posts.login,
        };
      }
    componentDidMount() {
        this.getShop()
    }

    newProduct() {
        this.props.navigation.navigate("add_product")
    }
    getShop = async(e) => {
        const {login} =  this.state;
        const result1 = await shopImg.getShop(login.id);
        const result2 = await shopImg.getImageShop(login.id);
       
      if (result1) {
        this.props.dispatch({
            type: 'ADD_SHOP',
            payload: result1
          })
        this.props.dispatch({
            type: 'ADD_IMAGESHOP',
            payload: result2
          })
      }
      
        
    }

    add_shopping() {
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.box}>
                            <View style={styles.box6}>
                                <Image style={styles.image3} source={require('../assets/images/AAA.png')} />
                                <Text style={styles.text}>ร้านค้าช่าง</Text>
                            </View>
                        </View>

                        <View style={styles.top}>
                            <View style={styles.box3}>
                                <TouchableOpacity onPress={() => this.newProduct()}>
                                   {/*  <MaterialIcons name="home-repair-service" style={styles.icons3} /> */}
                                    <Text style={styles.text2}>{"เพิ่มสินค้าร้าน"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>

            </>
        )
    }
  render() {
    return (
      <>
      {
          this.add_shopping()
      }
      </>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#fff",
    },
    image3: {
        width: 145,
        height: 145,
        marginTop: -5,
        marginLeft: -5,
    },
    top: {
        marginTop: 15,
    },
    box: {
        height: 220,
        width: "100%",
        backgroundColor: "#37C1FB",
        shadowColor: "#000",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,

    },
    box3: {
        height: 90,
      
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
        borderRadius: 10,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 10,
        marginBottom: 5,
        paddingBottom: 20,
        borderTopLeftRadius: 90,
      /*   borderTopRightRadius:30,
        borderBottomLeftRadius: 10, */
        borderBottomRightRadius: 90,
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
        borderWidth: 4,
        borderColor: '#fff',
    },
    text: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 10,
        color: "#fff",
      },
    text2: {
        paddingLeft: "25%",
        paddingTop: 25,
        fontSize: 30,
    },
    icons3: {
        width: 50,
        height: 48,
        marginLeft: 6,
        marginTop: 5,
        fontSize: 26,
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
export default connect(mapStateToProps, null)(Add_shopping);