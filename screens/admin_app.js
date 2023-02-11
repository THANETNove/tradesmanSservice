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
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Button } from "react-native-web";
import { connect } from "react-redux";
import repairWork from "./service/getService";


class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repair_work: null,
        };
    }

    componentDidMount = async () => {
        const { login, } = this.props.posts;
        if (login === null) {
            this.props.navigation.navigate("Login")
        } else {
            this.getRepairWork()


        }

        /*  this.setState({
             repair_work: jobDescription,
         }) */
        //getRepairWorkUser
    }
    componentDidUpdate() {
        const { login, statusUpdate } = this.props.posts;
        if (statusUpdate == true) {
            console.log("222");
            /*       this.getRepairWork()
                  //ADD_STATUSUPDATE
                  this.props.dispatch({
                      type: 'ADD_STATUSUPDATE',
                      payload: false
                  }) */
        }
    }


    getRepairWork = async () => {
        const result = await repairWork.getRepairWorkAdmin();

        if (result != null) {
            this.setState({
                repair_work: result.length
            })
        } else {
            this.setState({
                repair_work: null
            })
        }

    }

    home() {
        const { repair_work } = this.state;
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.box}>
                            <View style={styles.box6}>
                                <Image style={styles.image3} source={require('../assets/images/AAA.png')} />
                            </View>

                        </View>

                        <View style={styles.top}>
                            <View style={styles.box3}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ShopAdmin")}>
                                    <AntDesign name="checkcircle" style={styles.icons3} />
                                    <Text style={styles.text2}>{"อนุมัติการขาย"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Announce")}>
                                    <AntDesign name="notification" style={styles.icons3} />
                                    <Text style={styles.text2}>{"ประกาศ"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("notify_repair_work_Admin")}>
                                    <AntDesign name="wordfile1" style={styles.icons3} />
                                    <Text style={styles.text2_3}>{"อนุมัติงาน"}  {
                                        repair_work && repair_work != null ?
                                            <View style={styles.view3}><Text style={styles.text3}> {repair_work}</Text></View>
                                            : null
                                    }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView >
                </SafeAreaView >

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

    text2_3: {
        marginLeft: 55,
        fontSize: 20,
        marginTop: -40,
    },
    text3: {
        color: "#FFFF",
        marginRight: 4
    },
    view3: {

        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "red",
        backgroundColor: "red",
        width: 30,
        height: 30,
        border: 5,
        borderRadius: 100,
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
export default connect(mapStateToProps, null)(AdminApp);


