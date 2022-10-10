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
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import annonce from "./service/getService";

class Announce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "show",
            data: null,
            id: null,
            showButton: true,
            annonceText: null

        };
    }
    componentDidMount() {
        this.getAnnonceText()
    }
    componentDidUpdate(prevProps, prevState) {
        const { status } = this.state;
        if (prevState.status !== status) {
            this.getAnnonceText()
        }
    }

    getAnnonceText = async () => {
        const result2 = await annonce.getAnnonceText();
        console.log("55");
        if (result2) {
            this.setState({
                data: result2
            })
        }
    }

    announce_Starus(e, id, announce) {
        if (e === "add") {
            this.setState({
                status: "add"
            })
        } else if (e === "edit") {
            this.setState({
                status: "edit",
                annonceText: announce,
                id: id
            })
        } /* else {
            this.setState({
                status: "show",
                showButton: true,
            })
        } */
    }
    serve = async (e) => {
        if (e === "add") {
            const result2 = await annonce.createAnnonceText(this.state.annonceText);
            if (result2 === "success") {
                Alert.alert("ประกาศ สำเร็จ");
                this.setState({
                    /*  showButton: false, */
                    status: "show"
                })
            }

        } else {
            /* console.log("id", this.state.id,this.state.annonceText); */
            let data = [this.state.id, this.state.annonceText]
            console.log("data", data);
            const result2 = await annonce.updataAnnonceText(data);
            if (result2 === "success") {
                Alert.alert("เเก้ไข ประกาศ สำเร็จ");
                this.setState({

                    status: "show"
                })
            }
        }

    }
    annonce_text(e) {
        this.setState({
            annonceText: e
        })
    }

    announced_delete = async (e) => {
        Alert.alert(
            "ลบ ประกาศ",
            "คุณเเน่ใจหรือ จะลบประกาศนี้",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () =>
                        this.delete(e)
                }
            ]
        )
    }
    delete = async (e) => {

        const response = await annonce.delete_Announced(e);

        console.log("result2", response);
        if (response === "success") {
            this.getAnnonceText()
        }
    }

    add_Announce() {
        const { showButton } = this.state;
        return (
            <View style={styles.box}>
                {
                    <>
                        <View>
                            <TouchableOpacity onPress={(e) => this.announce_Starus("show")}>
                                <Ionicons name="md-arrow-back-circle-sharp" style={styles.icons4} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.box_text} >
                                <Text style={styles.text1}>* ประกาศ</Text>
                                <TextInput style={styles.textarea}
                                    onChange={(e) => this.annonce_text(e.nativeEvent.text)}
                                    multiline={true}/*  value={comment} */
                                />
                                {
                                    showButton == true ?
                                        <View>
                                            <TouchableOpacity style={styles.button} onPress={(e) => this.serve("add")}>
                                                <Text style={styles.text3}>บันทึกข้อมูล</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : null
                                }
                            </View>
                        </View>
                    </>
                }
            </View>
        )
    }
    edit_Announce() {
        const { annonceText, id, showButton } = this.state;
        /* console.log(annonceText, id); */
        return (
            <>
                <View>
                    <TouchableOpacity onPress={(e) => this.announce_Starus("show")}>
                        <Ionicons name="md-arrow-back-circle-sharp" style={styles.icons4} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.box_text} >
                        <Text style={styles.text1}>* เเกไขประกาศ</Text>
                        <TextInput style={styles.textarea}
                            onChange={(e) => this.annonce_text(e.nativeEvent.text)}
                            multiline={true} value={annonceText}
                        />
                        {
                            showButton == true ?
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={(e) => this.serve("edit")}>
                                        <Text style={styles.text3}>บันทึกข้อมูล</Text>
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </View>
                </View>
            </>
        )
    }

    show_Announce() {
        const { data } = this.state;
        /*         console.log("data",data); */
        return (
            <View style={styles.box}>
                {
                    <>
                        <View>
                            <TouchableOpacity onPress={(e) => this.announce_Starus("add")}>
                                <MaterialIcons name="add-box" style={styles.icons3} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {
                                data && data.map((index) => (

                                    <TouchableOpacity onPress={(e) => this.announce_Starus("edit", index.id, index.announce)}>
                                        <MaterialIcons name="delete" style={styles.icons5} onPress={(e) => this.announced_delete(index.id)} />
                                        <View style={styles.row}>
                                            <View>
                                                <Text style={styles.text1}>ประกาศ</Text>
                                                <Text style={styles.text}>{index.announce}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </>
                    /*  data && data.map((index) => {
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
                     }) */
                }
            </View>
        )
    }
    render() {
        const { status, annonceText } = this.state;

        return (
            <>
                {
                    status === "show" ?
                        this.show_Announce()
                        :
                        status === "add" ?
                            this.add_Announce()
                            :
                            status === "edit" ?
                                this.edit_Announce()
                                : this.show_Announce()

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
    row: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: "auto",
        marginBottom: 20,
        padding: 10
    },
    between: {
        justifyContent: "space-between",
    },
    text1: {
        fontSize: 18,
        color: "#049cdb"
    },
    text: {
        fontSize: 16,
        marginTop: 5,
    },
    icons3: {
        marginTop: -30,
        marginBottom: 20,
        alignSelf: "flex-end",
        fontSize: 40,
        color: "#03a833",
    },
    icons4: {
        marginTop: -30,
        marginBottom: 20,
        alignSelf: "flex-end",
        fontSize: 40,
        color: "#37C1FB",
    },
    icons5: {
        marginTop: 10,
        position: "absolute",
        marginBottom: 20,
        alignSelf: "flex-end",
        fontSize: 40,
        color: "red",
        zIndex: 2
    },
    textarea: {
        minHeight: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    box_text: {
        width: "100%",
        backgroundColor: "#FFF",
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20
    },
    button: {
        height: 50,
        width: 280,
        backgroundColor: "#37C1FB",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 18,
        paddingLeft: 15,
        marginTop: 5,
        marginBottom: 10,
    },
    text3: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        marginTop: 12,
        color: "#fff"
    },
})
export default Announce;