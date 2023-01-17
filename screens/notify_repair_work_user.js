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

class Notify_repair_work_user extends Component {
    componentDidMount() {
        const { login } = this.props.posts;
        if (this.props.posts.login === null) {
            this.props.navigation.navigate("Login")
        }

    }
  render() {
    return (
      <Text>notify_repair_work_user</Text>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps, null)(Notify_repair_work_user);