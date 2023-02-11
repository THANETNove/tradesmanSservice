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

class JobDescription extends Component {

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
        if (jobDescription.statusAdmin == null) {
            this.setState({
                editStatus: true,

            })
        }
        this.setState({
            id: jobDescription.id,
            name: jobDescription.name,
            phone: jobDescription.name,
            nameRepairWork: jobDescription.nameRepairWork,
            repair_work: jobDescription.repair_work,
            address: jobDescription.address,
        })
        this.props.dispatch({
            type: 'DELETE_JOB',
            payload: null
        })
        const result = repairWork.getRepairWorkUser(login.id);
        result.then((values) => {

            if (values.length > 0) {
                this.props.dispatch({
                    type: 'ADD_NOTIFICATIONSREPAIRWORK',
                    payload: values.length
                })
            }
        }).catch((error) => {

            this.props.dispatch({
                type: 'DELETE_NOTIFICATIONSREPAIRWORK',
                payload: null
            })

        });
        this.props.dispatch({
            type: 'ADD_STATUSUPDATE',
            payload: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { jobDescription, login } = this.props.posts;

        if (prevProps.jobDescription !== jobDescription && (jobDescription === null)) {
            const result = repairWork.getRepairWorkUser(login.id);
            result.then((values) => {
                this.props.dispatch({
                    type: 'ADD_NOTIFICATIONSREPAIRWORK',
                    payload: values.length
                })
            }).catch((error) => {

                this.props.dispatch({
                    type: 'DELETE_NOTIFICATIONSREPAIRWORK',
                    payload: null
                })
            });
        }
        this.props.dispatch({
            type: 'DELETE_JOB',
            payload: null
        })
    }


    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    serve = async () => {

        const { id, name, phone, nameRepairWork, repair_work, address } = this.state;

        this.setState({
            statusSave: false
        })
        const result = await repairWork.updateRepairWork(id, name, phone, nameRepairWork, repair_work, address);
        if (result === "success") {
            this.props.dispatch({
                type: 'DELETE_JOB',
                payload: null
            })
            Alert.alert("บันทึกสำเร็จ");
            await this.props.navigation.goBack();
        } else {
            Alert.alert("บันทึกไม่สำเร็จ");
        }
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
                </ScrollView>
            </SafeAreaView>
        )
    }

    editDataJob() {
        const { statusSave, name, phone, nameRepairWork, repair_work, address } = this.state;
        return (
            <SafeAreaView>
                <ScrollView style={styles.areaView}>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ชื่อลูกค้า</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("name", text)}
                            placeholder="กรุณาระบุ"
                            value={name}
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>เบอร์โทร</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("phone", text)}
                            placeholder="กรุณาระบุ"
                            value={phone}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ประเภทงาน</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("nameRepairWork", text)}
                            placeholder="กรุณาระบุ"
                            value={nameRepairWork}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ลักษณะงาน</Text>
                        <TextInput
                            editable
                            multiline

                            value={repair_work}
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
                            value={address}
                            style={styles.inputTextarea}
                            onChangeText={(text) => this.handleChange("address", text)}
                            placeholder="กรุณาระบุ"
                        />
                    </View>
                    <View>
                        {
                            statusSave === true ?
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

    render() {
        const { editStatus } = this.state;
        return (
            <>
                {
                    editStatus === true ?
                        this.editDataJob()
                        :
                        this.dataJob()
                }
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
export default connect(mapStateToProps, null)(JobDescription);
