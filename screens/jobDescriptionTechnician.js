import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    ImageBackground,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Pressable,
    Linking,
    Dimensions
} from "react-native";
import repairWork from "./service/getService";
import { connect } from "react-redux";

class jobDescriptionTechnician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null,
            phone: null,
            nameRepairWork: null,
            repair_work: null,
            address: null,
            statusSave: true,
            editStatus: false,
        };
    }

    componentDidMount() {
        const { jobDescription, login } = this.props.posts;
        this.setState({
            id: jobDescription.id,
            name: jobDescription.name,
            phone: jobDescription.name,
            nameRepairWork: jobDescription.nameRepairWork,
            repair_work: jobDescription.repair_work,
            address: jobDescription.address,
        })
        this.props.dispatch({
            type: 'ADD_STATUSUPDATE',
            payload: true
        })
        this.getUpdateRepairWork()

    }

    getUpdateRepairWork = async () => {
        var re = await repairWork.getUpdateRepairWorkTime();
        console.log(re);
    }
    receiveJob = async () => {
        const { id } = this.state;
        const { login } = this.props.posts;


        const result1 = await repairWork.gettechnicianAddressid(login.id);
        if (result1) {
            var re = await repairWork.updatenRepairWorkIdTechnician(id, login.id, result1.name, result1.phone_number)
        } else {
            var re = await repairWork.updatenRepairWorkIdTechnician(id, login.id, null, null)
        }

        if (re === "success") {
            Alert.alert("รับงานเรียบร้อย");
            this.props.dispatch({
                type: 'ADD_STATUSUPDATE',
                payload: true
            })

            await this.props.navigation.navigate("Notify_repair_work_Technician")
        }

    }




    dataJob() {
        const { name, phone, nameRepairWork, repair_work, address } = this.state;

        return (
            <SafeAreaView>
                <View style={styles.areaView}>
                    <ScrollView>
                        <View style={styles.viewRightTnput}>
                            <Text style={styles.textRightTnput}>ชื่อลูกค้า</Text>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                        <View style={styles.viewRightTnput}>
                            <Text style={styles.textRightTnput}>เบอร์โทร</Text>
                            <Pressable style={{ backgroundColor: "#99CCFF", paddingTop: 4, paddingBottom: 10, borderRadius: 16 }} onPress={() => Linking.openURL(`tel:${phone}`)}>
                                <Text style={[styles.text]}>{phone}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.viewRightTnput}>
                            <Text style={styles.textRightTnput}>ประเภทงาน</Text>
                            <Text style={styles.text}>{nameRepairWork}</Text>
                        </View>
                        <View style={styles.viewRightTnput}>
                            <Text style={styles.textRightTnput}>ลักษณะงาน</Text>
                            <Text style={styles.text}>{repair_work}</Text>
                        </View>
                        <View style={styles.viewRightTnput}>
                            <Text style={styles.textRightTnput}>ที่อยู่</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={() => this.receiveJob()}>
                        <Text style={styles.textButton}>
                            รับงาน
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }


    render() {
        const { editStatus } = this.state;
        return (
            <>
                {this.dataJob()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        marginBottom: 50
    },
    areaView: {
        paddingTop: 20,
        backgroundColor: "#FFFFFF",
        height: "100%",
        justifyContent: "space-between",

    },
    viewRightTnput: {
        position: "relative",
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    textRightTnput: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#2A323C",
    },
    input: {
        height: 56,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        position: "relative",

    },
    inputTextarea: {
        minHeight: 100,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        position: "relative",

    },
    button: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
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
        marginTop: 30,
        marginBottom: 60,
    },
    text: {
        paddingLeft: 10,
        fontSize: 16,
        marginTop: 5,
        /* backgroundColor: "#F8F8F8",
        borderRadius: 8, */
    },
    text3: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        marginTop: 12,
    },
    textButton: {
        color: "#FFFFFF",
        fontSize: 20
    },
});

const mapStateToProps = (state) => {

    return {
        posts: state
    }
}
export default connect(mapStateToProps, null)(jobDescriptionTechnician);
