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
            id:null,
            showImg:null,
            login:null
        };
    }


    componentDidMount() {

        const { idShop, urlImage, login} = this.props.posts;
        if (login !== null) {
            this.setState({
                login:login.id
            })
        }
        
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

    clickShop(e,j) {

        this.setState({
            showImg:j,
            show: e,
           
        })
    }
    clickChat(e) {
        if (this.state.login !== null) {
            this.props.dispatch({
                type: 'ADD_IDTECHNICAN',
                payload: this.state.id
              })
             this.props.navigation.navigate("Profile_tras_user")
        }else{
            this.props.navigation.navigate("Login")
        }

      
    }

    render() {
        const { show, dataSource, detail, heading,img,url,id ,showImg,login} = this.state;
       
       console.log('id',id); 
       return (
            <>
                {
                    show === false ?
                        <ScrollView>
                             <View>
                                {/* */}
                        
                                <Text style={styles.heading}>{heading !== null ? heading : null}</Text>
                                <Text style={styles.detail}>{
                                    detail !== null ? detail : null}</Text>
                           {
                               id == login ?  
                               <Text style={styles.shopyou}>ร้านค้าของคุณ</Text>
                               : 
                                <TouchableOpacity onPress={(e) => this.clickChat(id)}>
                                    <Ionicons name="chatbox-ellipses-sharp" style={styles.icons5}/>
                                </TouchableOpacity>
                           }
                          
                            </View>
                          
                            <View>
                                {img !== null ?
                                <View style={styles.row}>
                                {
                                     img.map((index) => {
                                        const image = (
                                            <TouchableOpacity onPress={(e) => this.clickShop(true,index.url_shop)}>
                                                <View style={styles.box}>
                                                    <View style={styles.img}>
                                                        <Image source={{ uri: `${url}shop/${index.url_shop}` }}
                                                                style={styles.image}
                                                            />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        );
                    
                                        return image;
                                      })
                                }
                                </View>
                                    : null}

                            </View>
                           
                        </ScrollView>
                        : null
                }
                {
                    show === true ?
                        <View style={styles.box8}>
                            <Text style={styles.close} onPress={(e) => this.clickShop(false,null)}>X</Text>
                            <ScrollView>
                            <Image
                                    source={{ uri: `${url}shop/${showImg}` }}
                                    style={styles.image4}
                                />
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
    row: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
      },
    box: {
        width: 160,
        height: "auto",
       /*  marginTop: 10,
        marginLeft: 5, */
        /* borderRadius: 2, */
        shadowColor: "#000",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        backgroundColor: "#4BC7FB",
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
        width: "100%",
        height: 300,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#b1b1b1',
      },
      image: {
        width: "100%",
        height: 150,
        marginLeft: "auto",
        marginRight: "auto",
       /*  borderRadius: 5, */
        borderWidth: 1,
        borderColor: '#FFF',
    
      },
      icons5: {
        fontSize: 35,
        marginTop: 20,
        paddingRight: 20,
        color: "#37C1FB",
        zIndex:2,
        paddingLeft:10,
        marginBottom: 20
      },
      shopyou: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 25,
        marginBottom:20,
        color: "#00000"
      }
});


const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps, null)(Shop_user);

