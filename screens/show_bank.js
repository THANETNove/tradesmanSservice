import React, { Component } from 'react';
import { SafeAreaView,StyleSheet,TextInput,Text,TouchableOpacity, View, Image, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import bookBank from './service/getService';

 
class Ahow_bank extends Component {


  constructor(props) {
    super(props);
    this.state = {
      technician: null,
    };
  }



  componentDidMount() {
    const id = this.props.posts.id;
    
    this.technicianAndUser(id);
  }

  technicianAndUser = async (e) => {
    const result1 = await bookBank.getBookBank(e);
    this.setState({
      technician: result1,
    })
    
  }


  render() {
    const { technician } = this.state;
    console.log(technician);

    return (

      <SafeAreaView style={styles.container}> 
        <ScrollView>

        <View>
            <Image
              style={styles.image2}
              source={require("../assets/images/BB-2.png")}
            />
          </View>
     
               <View style={styles.box}>
              <View>
                <Text style={styles.text1}>บัญชีธนาคาร</Text>
              </View>
              <View>

              {technician !== null ?
              <>
                  <View style={styles.box1}>
                      <Text style={styles.text3}>ชื่อบัญชี</Text>
                      <Text style={styles.text4}>{technician[0].name}</Text>
                      <Text style={styles.text5}>ธนาคาร</Text>
                      <Text style={styles.text6}>{technician[0].bank}</Text>
                      <Text style={styles.text7}>เลขบัญชี</Text>
                      <Text style={styles.text8}>{technician[0].number_bank}</Text>
                  </View>
              </>
              : 
                null }

            
              </View>
            </View>
           
        
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
  box: {
    height: 300,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -45,
    marginBottom: 10,
  },
  box1: {
    height: 165,
    width: 290,
    backgroundColor: '#e8e9e9',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 35,

  },
  box3: {
    height: 350,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    paddingLeft: 110,
    fontSize: 20,
    marginTop: -25,
    color: '#fff'
  },
  text1: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  text2: {
    marginLeft: 20,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center'
  },
  text3: {
    fontSize: 16,
    paddingTop: 15,
    fontWeight: 'bold',
  },
  text4: {
    fontSize: 16,
    marginTop: 5,

  },
  text5: {
    fontSize: 16,
    marginTop: -40,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 15,
    
  },
  text6: {
    fontSize: 16,
    paddingTop: 5,
    textAlign: 'right',
    paddingRight: 15,
  },
  text7: {
    fontSize: 16,
    paddingTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text8: {
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center',
  },
  text9: {
    flex: 1,
    paddingLeft: 100,
    fontSize: 20,
    marginTop: -25,
    color: '#fff'
  },
  icons: {
    fontSize: 25,
    marginTop: 13,
    marginLeft: 75,
    color: '#fff'
  },
  icons1: {
    fontSize: 25,
    marginTop: 13,
    marginLeft: 65,
    color: '#fff'
  },
  button: {
    height: 50,
    width: 280,
    backgroundColor: '#37C1FB',
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
  },
  image2: {
    height: 220,
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },

});



const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps,null)(Ahow_bank);
