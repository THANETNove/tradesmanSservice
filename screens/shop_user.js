import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Slideshow from 'react-native-image-slider-show';
import shopImg from "./service/getService";
import { Ionicons } from "@expo/vector-icons";

class Shop_user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
            dataSource: [],
            detail: null,
            heading: null,
            show: false,
            img:null,
            url: null,
            id:null
        };
    }


    componentDidMount() {

        const { idShop, urlImage } = this.props.posts;
        this.getShop(idShop, urlImage)


    }
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 3000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }


    getShop = async (e, url) => {
        const result1 = await shopImg.getShop(e);
        const result2 = await shopImg.getImageShop(e);
        const fruits = [];

        result2.map((index) => {
            fruits.push({ url: `${url}shop/${index.url_shop}` });
        })

        this.setState({
            detail: result1[0].detail,
            heading: result1[0].heading,
            dataSource: fruits,
            img:result2,
            url:url,
            id:e
        });
    }

    clickShop(e) {
        this.setState({
            show: e
        })
    }
    clickChat(e) {
        console.log("e",e);
        this.props.dispatch({
            type: 'ADD_IDTECHNICAN',
            payload: this.state.id
          })
         this.props.navigation.navigate("Profile_tras_user")
    }

    render() {
        const { show, dataSource, detail, heading,img,url,id } = this.state;
        return (
            <>
                {
                    show === false ?
                        <ScrollView>
                            <View>
                                {dataSource !== null ?
                                    <TouchableOpacity onPress={(e) => this.clickShop(true)}>
                                        <Slideshow
                                            dataSource={dataSource}
                                            position={this.state.position}
                                            onPositionChanged={position => this.setState({ position })} />
                                    </TouchableOpacity>
                                    : null}

                            </View>
                            <View>
                                <TouchableOpacity onPress={(e) => this.clickChat(id)}>
                                   <Ionicons name="chatbox-ellipses-sharp" style={styles.icons5}/>
                                </TouchableOpacity>
                        
                                <Text style={styles.heading}>{heading !== null ? heading : null}</Text>
                                <Text style={styles.detail}>{
                                    detail !== null ? detail : null}</Text>
                            </View>
                        </ScrollView>
                        : null
                }
                {
                    show === true ?
                        <View style={styles.box8}>
                            <Text style={styles.close} onPress={(e) => this.clickShop(false)}>X</Text>
                            <ScrollView>
                              {(url!== null) && img !== null ? img.map((index) => {
                                const image = (
                               <Image
                                    source={{ uri: `${url}shop/${index.url_shop}` }}
                                    style={styles.image4}
                                />
                                )
                                return image;
                            }):
                            null
                            }
                            </ScrollView>
                        </View>
                        : null
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        container: {
            width: "100%",
            height: "100%",
            position: "relative",
        },
    },
    box8: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4,
        borderRadius: 5,
        position: "absolute",
        zIndex: 2,

    },
    horizontal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -50,
        marginLeft: -40,
        zIndex: 1,
    },
    detail: {
        padding: 10
    },
    heading: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20
    },
    close: {
        paddingTop: 10,
        textAlign: "right",
        paddingRight: 20,
        fontSize: 20,
        paddingBottom: 10,
    },
    img_z:{
        width: 100
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
      icons5: {
        fontSize: 35,
        marginTop: 20,
        paddingRight: 20,
        color: "#37C1FB",
        zIndex:2,
        paddingLeft:10,
        marginBottom: -10
      },
});


const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps, null)(Shop_user);

