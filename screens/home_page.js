import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native';



class Home_page extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
              <View>
                <Image
                  style={styles.image2}
                  source={require('../assets/images/A-2.jpeg')}
                />
              </View>
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
  image2: {
    width: '100%',
    height: 750,
  },
});

export default Home_page;




