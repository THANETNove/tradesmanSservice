import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native';

class Shop extends Component {
  render() {

    return (

      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Text>shop</Text>
         {/*  <View style={styles.boxhead}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-1.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-2.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-3.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-4.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-5.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-6.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-7.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-8.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-9.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-10.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-11.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-12.png')}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Tradesman")}>
              <View style={styles.box3}>
                <Text style={styles.text1}>ประเภทงาน</Text>
                <Image
                  style={styles.image1}
                  source={require('../../assets/images/B-13.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',

  },
  boxhead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: '#78a0e3',
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 5,
    borderColor: '#fff',
  },
  box1: {
    width: 360,
    height: 220,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 4,
    padding: -10,
  },
  box3: {
    width: 160,
    height: 100,
    padding: 5,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 4,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image1: {
    width: 120,
    height: 70,
    marginTop: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image2: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',

  },

});

export default Shop; 