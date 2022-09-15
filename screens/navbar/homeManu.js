import React, { Component } from "react";
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Button } from "react-native-web";
import { connect } from "react-redux";
import img1 from "../../assets/images/A-6.png";
import { logoutStore } from "../logout";


class homeManu extends Component {

    setUrl = () => {
        this.props.dispatch({
          type: 'ADD_URL',
          payload: "https://th-projet.com/api-database/images/"
        })
      }

    componentDidMount() {
        this.setUrl()
    }
    home() {
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.box}>
                            <View style={styles.box6}>
                                <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />
                            </View>
                        </View>

                        <View style={styles.top}>
                            <View style={styles.box3}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                    <MaterialIcons name="home-repair-service" style={styles.icons3} />
                                    <Text style={styles.text2}>{"บริการงานช่าง"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("homeShop")}>
                                    <Entypo name="shop" style={styles.icons3} />
                                    <Text style={styles.text2}>{"ร้านค้า"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("add_shopping")}>
                                    <MaterialIcons name="add-shopping-cart" style={styles.icons3} />
                                    <Text style={styles.text2}>{"เพิ่มสินร้านค้า"}
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
                    this.home()
                }
            </>
        );
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
        height: 190,
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
        height: "auto",
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
        marginBottom: 5,
        paddingBottom: 20,
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
    text2: {
        marginLeft: 55,
        fontSize: 20,
        marginTop: -35,
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
export default connect(mapStateToProps, null)(homeManu);


