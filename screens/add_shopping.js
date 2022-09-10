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
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";

class Add_shopping extends Component {
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                   {/*  <MaterialIcons name="home-repair-service" style={styles.icons3} /> */}
                                    <Text style={styles.text2}>{"เพิ่มสินค้า"}
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
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        paddingLeft: "32%",
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

export default Add_shopping;