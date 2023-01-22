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
import repairWork from "./service/getService";
import { connect } from "react-redux";

class notify_repair_work_Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repair_work: null,
            id: null
        };
    }


    componentDidMount = async () => {
        this.getRepairWork()


    }



    componentDidUpdate = async (prevProps, prevState) => {

        const { login, statusUpdate } = this.props.posts;
        if (statusUpdate === true) {
            this.getRepairWork()
            //ADD_STATUSUPDATE
            this.props.dispatch({
                type: 'ADD_STATUSUPDATE',
                payload: false
            })
        }
    }


    getRepairWork = async () => {
        const result = await repairWork.getRepairWorkAdmin();

        if (result != null) {
            this.setState({
                repair_work: result
            })
        } else {
            this.setState({
                repair_work: null
            })
        }
    }

    clickJob = async (e) => {


        this.props.dispatch({
            type: 'ADD_DATAJOB',
            payload: e
        })

        this.props.navigation.navigate("jobDescriptionAdmin")

    }
    render() {
        const { repair_work } = this.state;
        return (
            <SafeAreaView>
                <ScrollView style={styles.areaView}>
                    {repair_work &&
                        repair_work.map((index) => {

                            return (
                                <TouchableWithoutFeedback onPress={() => this.clickJob(index)}>
                                    <View style={styles.repairWorkApprove}>
                                        <Text>ชื่อ: {index.name}   ลักษณะงาน  {index.nameRepairWork} </Text>
                                        <AntDesign name="exclamationcircle" style={styles.iconCheckcircle} />
                                    </View>
                                </TouchableWithoutFeedback>

                            )

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

        /*  height: "100%", */
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
    }
});


const mapStateToProps = (state) => {

    return {
        posts: state
    }
}
export default connect(mapStateToProps, null)(notify_repair_work_Admin);