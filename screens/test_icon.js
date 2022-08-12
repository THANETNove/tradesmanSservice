import * as React from 'react';
import { StyleSheet, Text, View ,SafeAreaView,TextInput,TouchableOpacity,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  return (
    
    <View style={styles.container}>
   {/*    <LinearGradient
       start={{ x: 0, y: 0.5 }}
       end={{ x: 1, y: 0.5 }}
        // Background Linear Gradient
        colors={['#0538D9','#00C2FE']}
        style={styles.background}
      /> */}
     {/*  <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', 'red']}
        style={styles.button}>
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient> */}
 

      <View style={styles.sectionStyle}>
            <AntDesign name="checkcircleo"  size={20} />    
          <TextInput
            style={{flex: 1}}
            placeholder="Enter Your Name "
            underlineColorAndroid="transparent"
          />
      </View>
     {/*  <View style={styles.container}>
                <LinearGradient
                    colors={['#0538D9','#00C2FE']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.grediant}
                >
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            LOGIN
                         </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
  },
  button: {
    marginTop: 150,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
 /*    color: '#fff', */
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
    borderColor: '#00c2fe',
    borderWidth: 5,
    marginTop: 500,
  },
  grediant: {
    height: 44,
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center'
},
buttonContainer: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: 2
},
buttonText: {
    textAlign: 'center',
    color: '#4C64FF',
    alignSelf: 'center',
}
});
