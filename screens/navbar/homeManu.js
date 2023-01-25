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
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, Entypo, Octicons, Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Button } from "react-native-web";
import { connect } from "react-redux";
import Carousel from "../carousel";
import img1 from "../../assets/images/A-6.png";
import { logoutStore } from "../logout";
import shopImg from "../service/getService";
import MarqueeView from 'react-native-marquee-view';
import Share from "../share";




class homeManu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            interval: null,
            annonce: null
        };
    }
    setUrl = async () => {
        this.props.dispatch({
            type: 'ADD_URL',
            payload: "https://th-projet.com/api-database/images/"
        })
        const shopAll = await shopImg.getShopImagesAll();
        if (shopAll) {
            this.props.dispatch({
                type: 'ADD_SHOPALL',
                payload: shopAll
            })
        }
    }

    componentDidMount() {
        this.setUrl()
        this.getAnnonce()

    }
    /* componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.getAnnonce()
            }, 9000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    } */
    //  const result1 = await technician_type.getAddress_user(e);


    getAnnonce = async () => {
        const annonce = await shopImg.getAnnonceText();
        if (annonce) {
            this.setState({
                annonce: annonce
            })
        }

    }


    add_shopping() {
        if (this.props.posts.login !== null) {
            this.props.navigation.navigate("add_shopping")
        } else {
            this.props.navigation.navigate("Login")
        }
    }

    shareLink = async () => {
        console.log("5555");
    }

    home() {
        const { annonce, timeMs, interval } = this.state;
        console.log("999", interval);
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.box}>
                            {/*      <View style={styles.box6}>
                                <Image style={styles.image3} source={require('../../assets/images/AAA.png')} />
                            </View> */}
                            <Carousel />

                        </View>
                        <MarqueeView>
                            <View style={styles.marquee}>
                                <Text style={styles.marqueeText} >

                                    {

                                        annonce && annonce.map((index, j) => {
                                            /*  console.log("index",index); */
                                            const text = (
                                                <Text style={styles.marqueeText2}>    <AntDesign name="notification" style={styles.icons4} />  ประกาศ: <Text style={styles.marqueeText}> {index.announce}</Text> </Text>

                                            )
                                            return text
                                        }
                                        )
                                    }
                                </Text>
                            </View>
                        </MarqueeView>
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
                                <TouchableOpacity onPress={() => this.add_shopping()}>
                                    <MaterialIcons name="add-shopping-cart" style={styles.icons3} />
                                    <Text style={styles.text2}>{"เพิ่มสินร้านค้า"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Notify_repair_work")}>
                                    <Octicons name="report" style={styles.icons3} />
                                    <Text style={styles.text2}>{"เเจ้งงานซ่อม"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Notify_repair_work_user")}>
                                    <Fontisto name="file-1" style={styles.icons3} />
                                    <Text style={styles.text2}>{"รายการ เเจ้งงานซ่อม"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }}>
                                    <Share />
                                </TouchableOpacity>

                            </View>
                            <View style={styles.viewImage} >
                                <Image style={styles.image4} source={require('../../assets/images/1674388625511.jpeg')} />
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
        /*  width: 145,
         height: 145,
         marginTop: -5,
         marginLeft: -5,
         924 - 1460 */
    },
    image4: {
        width: "90%",
        height: "60%",
        zIndex: 4,
        paddingBottom: 160
    },
    viewImage: {
        alignItems: "center",
        marginTop: 20,
        width: "100%",
        paddingBottom: 160
    },
    top: {
        marginTop: 15,
    },
    box: {
        height: 190,
        width: "100%",
        shadowColor: "#000",
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
        paddingTop: 15,
        paddingLeft: 13,
    },
    icons4: {
        width: 50,
        height: 48,
        marginLeft: 6,
        marginTop: 5,
        fontSize: 26,
        color: "red",
        borderRadius: 10,
        paddingTop: 12,
        paddingLeft: 13,
    },
    marquee: {
        marginTop: 20,
        backgroundColor: '#37C1FB',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        borderRadius: 5,
    },
    marqueeText: {
        color: "#fff",
        fontSize: 18
    },
    marqueeText2: {
        color: "red",
        fontSize: 18
    }
});

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps, null)(homeManu);


