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
import { connect } from "react-redux";
import repairWork from "./service/getService";

class Notify_repair_work extends Component {
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
        };
    }
    componentDidMount() {
        const { login } = this.props.posts;
        if (this.props.posts.login === null) {
            this.props.navigation.navigate("Login")
        } else {
            this.setState({
                id: login.id
            });
        }
    }



    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    getRepairWork = async () => {
        const result = await repairWork.getRepairWorkAdmin();
        if (result != null) {
            this.props.dispatch({
                type: 'ADD_REPAIR_WORK_NUMBER',
                payload: result.length
            })
        } else {
            this.props.dispatch({
                type: 'ADD_REPAIR_WORK_NUMBER',
                payload: null
            })
        }
    }


    serve = async () => {

        const { id, name, phone, nameRepairWork, repair_work, address } = this.state;

        this.setState({
            statusSave: false
        })

        this.props.dispatch({
            type: 'ADD_STATUSUPDATE',
            payload: "trus1"
        })
        const result = await repairWork.createRepairWork(id, name, phone, nameRepairWork, repair_work, address);
        if (result === "success") {

            Alert.alert("บันทึกสำเร็จ");//ADD_REPAIR_WORK_NUMBER
            this.getRepairWork()
            await this.props.navigation.goBack();
        } else {
            Alert.alert("บันทึกไม่สำเร็จ");
        }
    }

    render() {
        const { id, name, phone, nameRepairWork, repair_work, address, statusSave } = this.state;
        return (
            <SafeAreaView>
                <ScrollView style={styles.areaView}>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ชื่อลูกค้า</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("name", text)}
                            placeholder="กรุณาระบุ"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>เบอร์โทร</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("phone", text)}
                            placeholder="กรุณาระบุ"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ประเภทงาน</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("nameRepairWork", text)}
                            placeholder="กรุณาระบุ"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ลักษณะงาน</Text>
                        <TextInput
                            editable
                            multiline


                            style={styles.inputTextarea}
                            onChangeText={(text) => this.handleChange("repair_work", text)}
                            placeholder="กรุณาระบุ"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ที่อยู่</Text>
                        <TextInput
                            editable
                            multiline


                            style={styles.inputTextarea}
                            onChangeText={(text) => this.handleChange("address", text)}
                            placeholder="กรุณาระบุ"
                        />
                    </View>
                    <View>
                        {statusSave === true ?
                            <TouchableOpacity style={styles.button} onPress={() => this.serve()}>
                                <Text style={styles.text3}>บันทึกข้อมูล</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.text3}>กำลังบันทึกข้อมูล</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
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
        marginTop: 30,
        marginBottom: 60,
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
export default connect(mapStateToProps, null)(Notify_repair_work);

