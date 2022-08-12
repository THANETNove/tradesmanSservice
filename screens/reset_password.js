import React, { Component } from 'react';
import { SafeAreaView,StyleSheet,Text,TextInput, View,TouchableOpacity, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class Reset_paeeword extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>
              Reset password
          </Text>
        </View>
          

        <View style={styles.marginTop}>
            <View >
                <Text style={styles.text1}>
                    An email with the reset link will be
                    sent to you
                </Text>
            </View>

            <View style={styles.input}>
                <MaterialIcons name="email" size={24} color="#00c2fe" />
                <TextInput
                    style={{flex: 1, paddingLeft: 12}}
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>

          <View style={styles.button}>
            <TouchableOpacity   style={styles.button1}>
              <Text  style={{ fontSize: 34 , textAlign: 'center' ,color: 'white', marginTop: 3,}}>Reaet</Text>
            </TouchableOpacity>
          </View>

          
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
  },
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00c2fe',
    fontSize: 23,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: '60%',
    color: '#00c2fe',
  },
  button: {
    marginTop: 40,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 70
    },
  button1: {
  backgroundColor: '#01C1FF',
  height: 50,
  borderRadius: 25,
  },
  text1: {
    marginLeft: 60,
    marginTop: -18,
    fontSize: 20,
  },
  marginTop: {
    marginTop: 50,
  },
});


export default Reset_paeeword; 