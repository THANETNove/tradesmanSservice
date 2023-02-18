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
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import repairWork from "../screens/service/getService";
import { connect } from "react-redux";

class Notifications_repair_work extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repair_work: null,
            id: null
        };
    }


    componentDidMount = async () => {
        const { login, } = this.props.posts;


        this._unsubscribe = this.props.navigation.addListener('focus', async () => {

            if (this.props.posts.login === null) {
                this.props.navigation.navigate("Login")
            } else {
                const result = await repairWork.getRepairWorkUser(login.id);
                this.setState({
                    repair_work: result,
                    id: login.id,
                })
                if (result != null) {
                    this.props.dispatch({
                        type: 'ADD_NOTIFICATIONSREPAIRWORK',
                        payload: result.length
                    })
                }
            }
        });

    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    componentDidUpdate = async (prevProps, prevState) => {
        const { id, repair_work } = this.state;
        const { jobDescription, login } = this.props.posts;

        if ((prevProps.jobDescription !== jobDescription) && (jobDescription === null)) {
            const result = await repairWork.getRepairWorkUser(login.id);
            this.setState({
                repair_work: result
            })
            /*    if (result != null) {
                   this.props.dispatch({
                       type: 'ADD_NOTIFICATIONSREPAIRWORK',
                       payload: result.length
                   })
               } */
        }
    }

    clickJob = async (e) => {
        const { id } = this.state;

        const result = await repairWork.updateRepairWorkUser(e.id, "null", "1");
        if (result === "success") {
            this.props.dispatch({
                type: 'ADD_JOB',
                payload: e
            })

            this.props.navigation.navigate("JobDescription")
        }
    }
    render() {
        const { repair_work } = this.state;

        return (
            <SafeAreaView>
                <ScrollView style={styles.areaView}>
                    {repair_work &&
                        repair_work.map((index) => {
                            if (index.statusAdmin != null) {


                                if (index.statusAdmin == 1) {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => this.clickJob(index)}>
                                            <View style={styles.repairWorkApprove}>
                                                <Text>ชื่อ: {index.name}   ลักษณะงาน {index.nameRepairWork} </Text>
                                                <AntDesign name="checkcircle" style={styles.iconCheckcircle} />
                                            </View>
                                        </TouchableWithoutFeedback>

                                    )
                                } else {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => this.clickJob(index)}>
                                            <View style={styles.repairWorkApprove}>
                                                <Text>ชื่อ: {index.name}   ลักษณะงาน  {index.nameRepairWork} </Text>
                                                <AntDesign name="closecircle" style={styles.iconCheckcircleRed} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }

                            }
                        })
                    }
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

        height: "100%",
    },
    repairWorkApprove: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFFF",
        height: 60,
        paddingHorizontal: 20,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderRadius: 5,
        elevation: 2,
    },
    iconCheckcircle: {
        color: "#33CC00",
        fontSize: 24,
    },
    iconExclamationcircle: {
        color: "#B0B0B0",
        fontSize: 24,
    },
    iconEdit: {
        color: "black",
        fontSize: 24,
    },
    iconCheckcircleRed: {
        color: "red",
        fontSize: 24,
    },
});


const mapStateToProps = (state) => {

    return {
        posts: state
    }
}
export default connect(mapStateToProps, null)(Notifications_repair_work);