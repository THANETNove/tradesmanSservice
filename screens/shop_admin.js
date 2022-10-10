import React, { Component } from 'react';
import shop from "./service/getService";
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
    Alert,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

class Shop_admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            url: null,
            showImg: null,
            dataContent: null,
            dataImages: null,
            status: false,
            show: false,
            comment_admin: null

        };
    }
    componentDidMount() {
        const { urlImage } = this.props.posts;
        this.setState({
            url: urlImage
        })
        this.getShop()
    }

    getShop = async () => {
        const result1 = await shop.getShopImagesAll_Admin();
        if (result1) {
            this.setState({
                data: result1
            })
        }else{
            this.setState({
                data: null
            })
        }

    }
    getImageShop = async (e, dataContent) => {
        /*        console.log(dataContent.id); */
        const result2 = await shop.getImageShop(dataContent.id_shop);

        if (result2) {
            this.setState({
                dataContent: dataContent,
                dataImages: result2,
                status: e
            })
        }
    }

    checkId(e, dataContent) {
        this.getImageShop(e, dataContent)

    }
    clickShop(e, j) {
        this.setState({
            showImg: j,
            show: e
        })
    }
    checkBack(e) {
        this.setState({
            status: e
        })
    }
    comment(e) {
        this.setState({
            comment_admin: e
        })
    }

    checkCircle = async (e, j) => {
        const { comment_admin } = this.state;
        const data = [j.id, e, comment_admin]
        if (e == true) {
            Alert.alert(
                "ยื่นยัน",
                "อนุมัติการขาย",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            const result2 = shop.UpDateStatusShop(data);
                            this.getShop()
                            this.setState({
                                status: false
                            })
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                "ยื่นยัน",
                "ไม่อนุมัติการขาย",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            const result2 = shop.UpDateStatusShop(data);
                            this.getShop()
                            this.setState({
                                status: false
                            })

                        }
                    }
                ]
            );
        }

    }




    showData() {
        const { data, url } = this.state;
        console.log("data", data);
        return (
            <View style={styles.box}>
                {
                    data && data.map((index) => {
                        const dataContent = {
                            id: index.id,
                            id_shop: index.id_shop,
                            heading: index.heading,
                            detail: index.detail
                        };
                        const dataImg = (
                            <TouchableOpacity onPress={(e) => this.checkId(true, dataContent)}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.text1}>รอการอนุมัติ</Text>
                                        <Text style={styles.text}>ชื่อสินค้า: {index.heading}</Text>
                                        <Text>{index.detail.substr(0, 50) + '...'}</Text>
                                    </View>

                                    <Image source={{ uri: `${url}shop/${index.url_shop}` }} style={styles.image} />
                                </View>
                            </TouchableOpacity>
                        )
                        return dataImg;
                    })
                }
            </View>
        )
    }
    contentData() {
        const { show, dataContent, dataImages, url, showImg } = this.state;
        return (
            <View style={styles.box2}>
                {
                    show === false ?
                        <ScrollView>
                            <View style={styles.hed}>
                                <Text style={styles.heading1}>รายละเอียดร้านค้า</Text>
                                <Text style={styles.heading2}>ชื่อสินค้า:</Text>
                                <Text style={styles.heading}>{dataContent.heading !== null ? dataContent.heading : null}</Text>
                                <Text style={styles.detail1}>รายละเอียดร้านค้า: </Text>
                                <Text style={styles.detail}>{
                                    dataContent.detail !== null ? dataContent.detail : null}</Text>
                            </View>
                            <View style={styles.hed2}>
                                <View style={styles.row2}>
                                    <TouchableOpacity onPress={(e) => this.checkCircle(true, dataContent)}>
                                        <View style={styles.approve}>
                                            <AntDesign name="checkcircle" style={styles.icons3} />
                                            <Text>อนุมัติการขาย</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={(e) => this.checkCircle(false, dataContent)}>
                                        <View style={styles.approve}>
                                            <AntDesign name="closecircle" style={styles.icons4} />
                                            <Text>ไม่อนุมัติการขาย</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.textarea}
                                    onChange={(e) => {
                                        this.comment(e.nativeEvent.text)
                                    }}
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder="เหตุผลการไม่อนุมัติ"
                                />
                                <View >
                                    <TouchableOpacity style={styles.back} onPress={(e) => this.checkBack(false)}>
                                        <Ionicons name="ios-arrow-back-circle-sharp" style={styles.icons5} />
                                        <Text style={styles.textBack}> กลับ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.img}>
                                {dataImages !== null ?
                                    <View style={styles.row1}>
                                        {
                                            dataImages.map((index) => {
                                                const image = (
                                                    <TouchableOpacity onPress={(e) => this.clickShop(true, index.url_shop)}>
                                                        <View style={styles.box1}>
                                                            <View>
                                                                <Image source={{ uri: `${url}shop/${index.url_shop}` }}
                                                                    style={styles.image1}
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
                        <View style={styles.box}>
                            <Text style={styles.close} onPress={(e) => this.clickShop(false, null)}>X</Text>
                            <ScrollView>
                                <Image
                                    source={{ uri: `${url}shop/${showImg}` }}
                                    style={styles.image4}
                                />
                            </ScrollView>
                        </View>
                        : null
                }
            </View>
        )
    }

    render() {
        const { status } = this.state;
        return (
            <>
                {
                    status === false ?
                        this.showData()
                        :
                        this.contentData()
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
    box: {
        height: "100%",
        width: "100%",
        /*  backgroundColor: "#FFFF", */
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        fontSize: 18,
        marginTop: -10,

    },
    box1: {

        width: 160,
        height: "auto",
        shadowColor: "#000",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        backgroundColor: "#fff",
    },
    box2: {
        height: "100%",
        width: "100%",
        /*  backgroundColor: "#FFFF", */
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        fontSize: 18,
        marginTop: -10,

    },
    hed: {
        backgroundColor: "#fff",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderRadius: 5,
    },
    hed2: {
        marginTop: 20,
        backgroundColor: "#fff",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderRadius: 5,
    },
    row: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 80,
        marginBottom: 20,
        padding: 10
    },
    row1: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    row2: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
    text1: {
        fontSize: 16,
        color: "#049cdb"
    },

    image: {

        width: 100,
        height: "100%",
        marginBottom: 40,
    },
    image1: {
        width: "100%",
        height: 150,
        marginLeft: "auto",
        marginRight: "auto",
        /*  borderRadius: 5, */
        borderWidth: 1,
        borderColor: '#FFF',

    },
    image4: {
        width: "100%",
        height: 250,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#30c0fb',
        backgroundColor: "#fff",

    },
    icons3: {
        width: 50,
        height: 48,
        marginLeft: 8,
        marginTop: 5,
        fontSize: 26,
        color: "#03a833",
        borderRadius: 10,
        paddingTop: 12,
        paddingLeft: 13,
    },
    icons4: {
        width: 50,
        height: 48,
        marginLeft: 20,
        marginTop: 5,
        fontSize: 26,
        color: "#c1032b",
        borderRadius: 10,
        paddingTop: 12,
        paddingLeft: 13,
    },
    icons5: {
        width: 50,
        height: 48,
        /*         marginTop: 50, */
        fontSize: 26,
        color: "#37C1FB",
        borderRadius: 10,

    },
    detail: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    detail1: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        color: "#049cdb"
    },
    heading: {
        /* paddingTop: 20, */
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16
    },
    heading1: {
        paddingTop: 20,
        textAlign: "center",
        /*  paddingTop: 20,
         paddingLeft: 10,
         paddingRight: 10, */
        fontSize: 20,
        color: "#049cdb"
    },
    heading2: {
        /* paddingTop: 20, */
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        color: "#049cdb"
    },
    img: {
        marginTop: 20
    },
    close: {
        paddingTop: 10,
        textAlign: "right",
        paddingRight: 20,
        fontSize: 20,
        paddingBottom: 10,
    },
    approve: {
        paddingTop: 20,
    },
    textarea: {
        minHeight: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#30c0fb',
    },
    back: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    textBack: {
        marginLeft: -20,
        fontSize: 20,
    },
});

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps, null)(Shop_admin);