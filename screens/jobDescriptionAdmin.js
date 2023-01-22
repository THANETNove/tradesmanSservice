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
    Dimensions
} from "react-native";
import repairWork from "./service/getService";
import { connect } from "react-redux";

class jobDescriptionAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            id_user: null,
            name: null,
            phone: null,
            nameRepairWork: null,
            repair_work: null,
            address: null,
            statusSave: true,
            editStatus: false,
            scoreUser: null
        };
    }

    componentDidMount() {
        const { dataJob, login } = this.props.posts;
        this.getUser()
        this.setState({
            id: dataJob.id,
            id_user: dataJob.id_user,
            name: dataJob.name,
            phone: dataJob.name,
            nameRepairWork: dataJob.nameRepairWork,
            repair_work: dataJob.repair_work,
            address: dataJob.address,
        })
    }

    getUser = async () => {
        const { dataJob, login } = this.props.posts;
        const user = await repairWork.getUser(dataJob.id_user);
        this.setState({
            scoreUser: user[0].score

        })
    }

    clickJob = async (e) => {
        const { id, id_user, scoreUser } = this.state;
        console.log("user", scoreUser);

        if (e == "1") {
            if (scoreUser != null) {
                let score = Number(scoreUser) + 1;
                const result = await repairWork.updateScoreUser(id_user, score);
            } else {
                const result = await repairWork.updateScoreUser(id_user, "1");
            }
        }
        const result = await repairWork.updateRepairWorkUser(id, e, "null");
        console.log("e", e);
        if (result === "success") {
            Alert.alert("บันทึกสำเร็จ");
            await this.props.navigation.goBack();
        } else {
            Alert.alert("บันทึกไม่สำเร็จ");
        }
        this.props.dispatch({
            type: 'ADD_STATUSUPDATE',
            payload: true
        })
    }



    dataJob() {
        const { name, phone, nameRepairWork, repair_work, address } = this.state;

        return (
            <SafeAreaView>
                <ScrollView style={styles.areaView}>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ชื่อลูกค้า</Text>
                        <Text style={styles.text}>{name}</Text>
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>เบอร์โทร</Text>
                        <Text style={styles.text}>{phone}</Text>
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
                    <View style={styles.touchable}>
                        <TouchableOpacity style={styles.button} onPress={() => this.clickJob("1")}>
                            <Text style={styles.textButton}>อนุมัติ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => this.clickJob("2")}>
                            <Text style={styles.textButton}>ไม่อนุมัติ</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        width: 100,
        backgroundColor: "#33CC00",
        borderRadius: 8,
    },
    button2: {
        marginLeft: 10,
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        width: 100,
        backgroundColor: "#FF0000",
        borderRadius: 8,
    },
    textButton: {
        color: "#FFFFFF",
    },
    touchable: {
        marginTop: 40,
        marginBottom: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row"
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
});

const mapStateToProps = (state) => {

    return {
        posts: state
    }
}
export default connect(mapStateToProps, null)(jobDescriptionAdmin);
