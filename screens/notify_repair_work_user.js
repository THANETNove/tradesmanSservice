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
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import repairWork from "./service/getService";
import { connect } from "react-redux";

class Notify_repair_work_user extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repair_work: null,
      id: null
    };
  }
  componentDidMount = async () => {
    const { login } = this.props.posts;
    if (this.props.posts.login === null) {
      this.props.navigation.navigate("Login")
    } else {
      const result = await repairWork.getRepairWork(login.id);
      this.setState({
        repair_work: result,
        id: login.id,
      })
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { id } = this.state;
    const { jobDescription, statusUpdate } = this.props.posts;
    if (statusUpdate === true) {
      const result = await repairWork.getRepairWork(id);
      this.setState({
        repair_work: result
      })
      this.props.dispatch({
        type: 'ADD_STATUSUPDATE',
        payload: false
      })

    }


  }

  clickJob(e) {

    this.props.dispatch({
      type: 'ADD_JOB',
      payload: e
    })
    this.props.navigation.navigate("JobDescription")
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
                        <Text>ชื่อ: {index.name}   ลักษณะงาน  {index.nameRepairWork} </Text>
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

              } else {
                return (
                  <TouchableWithoutFeedback onPress={() => this.clickJob(index)}>
                    <View style={styles.repairWorkApprove}>
                      <Text>ชื่อ: {index.name}   ลักษณะงาน Null  {index.nameRepairWork} </Text>
                      <View>
                        <AntDesign name="edit" style={styles.iconEdit} />
                        {/*                         <AntDesign name="exclamationcircle" style={styles.iconExclamationcircle} /> */}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
              /* console.log("index", index); */
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
  iconCheckcircleRed: {
    color: "red",
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
export default connect(mapStateToProps, null)(Notify_repair_work_user);
