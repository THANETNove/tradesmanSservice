import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux";
import get_technician from './service/getService';
import img1 from "../assets/images/A-4.jpg";

class Home_tar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      technician: null,
      urlImg: null,
    };
  }



  componentDidMount() {
    const name = this.props.posts.technician;
    this.technicianAndUser(name);
  }
  
  

  technicianAndUser = async (e) => {
    const result1 = await get_technician.gettechnician(e);
    this.setState({
      technician: result1,
      urlImg: this.props.posts.urlImage,
    })

  }

  ClickU(e) {
    this.props.dispatch({
      type: 'ADD_IDTECHNICAN',
      payload: e
    })
   this.props.navigation.navigate("Profile_tras_user")
  }


  render() {
    const { technician,urlImg } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.boxhead}>

            {/*  <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Profile")}>
                <View style={styles.box}> 
                      <Image
                      style={styles.image}
                      source={{ uri: 'https://mythailiving.com/wp-content/uploads/2020/07/Be-a-mechanic-720x450.jpg' }}
                    />
                    <Image
                        style={styles.image1}
                        source={{uri: 'https://mythailiving.com/wp-content/uploads/2020/07/Be-a-mechanic-720x450.jpg'}}
                    />
                    <Text style={styles.text1}>
                        ช่าง : ยนต์
                    </Text>
                    <Text style={styles.text}>
                      รีวิว :
                    </Text>
                     <View style={styles.icons1}>
                      <View style={styles.boxhead}>
                        <FontAwesome name="star" style={styles.icons} />
                        <FontAwesome name="star" style={styles.icons} />
                        <FontAwesome name="star" style={styles.icons} />
                        <FontAwesome name="star" style={styles.icons} />
                        <FontAwesome name="star" style={styles.icons} />
                      </View>
                    </View> 
                </View>
            </TouchableWithoutFeedback> */}

            {
              technician !== null ?
                <>
                  {
                    technician && technician.map((va) => {
                      const name = (
                        <TouchableWithoutFeedback onPress={() => this.ClickU(va.idPhone)}>
                          <View style={styles.box}>
                          <Image style={styles.image2} source={require('../assets/images/A-4.jpg')}/>
                            { va.file_src !== null ? 
                            
                            <>
                              <Image style={styles.image} source={{ uri: `${urlImg}profile/${va.file_src}` }}/>
                              {/* <Image style={styles.image1}  source={{ uri: `${urlImg}profile/${va.file_src}` }}/> */}
                            </>
                            :
                            <>
                              <Image style={styles.image3} source={{ uri: `${urlImg}profile/logo_technician.png` }}/>
                           {/*    <Image style={styles.image1}  source={{ uri: `${urlImg}profile/logo_technician.png` }}/> */}
                            </>
                            }
                            <Text style={styles.text1}>ชื่อ : {va.name}</Text>
                            <Text style={styles.text2}>ประเภทงาน : {va.technician_1}</Text>
                            <Text style={styles.text5}>ประเภทงาน : {va.technician_2}</Text>
                            <Text style={styles.text8}>จังหวัด : {va.province}</Text>
                          </View>
                          
                        </TouchableWithoutFeedback>
                      )
                      return name;
                    })
                  }
                  {/*   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Profile")}>
                    <View style={styles.box}> 
                          <Image
                          style={styles.image}
                          source={{ uri: 'https://mythailiving.com/wp-content/uploads/2020/07/Be-a-mechanic-720x450.jpg' }}
                        />
                        <Image
                            style={styles.image1}
                            source={{uri: 'https://mythailiving.com/wp-content/uploads/2020/07/Be-a-mechanic-720x450.jpg'}}
                        />
                        <Text style={styles.text1}>
                            ช่าง : ยนต์ เเละช่างไฟ
                        </Text>
                        <Text style={styles.text1}>
            
                        </Text>
                    </View>
                </TouchableWithoutFeedback>  */}
                </>
                :
                <View style={styles.box1}>
                    <Text style={styles.text7}>ไม่มีข้อมูลมูลช่าง</Text>
                </View>
                
            }



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
  boxhead: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    width: '45%',
    height: 'auto',
    marginTop: 15,
    marginLeft: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    marginBottom: 5,
  },
  box1: {
    height: 40,
    width: 300,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 6,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 15,
  },
  image: {
    width: 95,
    height: 95,
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 35,
    position:"absolute"
  },
  image3: {
    width: 140,
    height: 140,
    marginTop: -7,
    borderRadius: 10,
    marginLeft: 12,
    position:"absolute"
  },
  image1: {
    width: 24,
    height: 24,
    marginTop: 120,
    marginLeft: 15,
    borderRadius: 50,
    position:"absolute"
  },
  image2: {
    width: '100%',
    height: 240,
    borderRadius: 10,
    marginTop: -5,
  },
  text: {
    marginTop: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 15,
    position:"absolute"
  },
  text1: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 125,
    position:"absolute"
  },
  text2: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 150,
    position:"absolute"
  },
  text3: {
    fontSize: 13,
    marginLeft: "25%",
    marginTop: 125,
    position:"absolute"
  },
  text4: {
    fontSize: 13,
    
    marginTop: 150,
    position:"absolute"
  },
  text5: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 170,
    position:"absolute"
  },
  text6: {
    fontSize: 13,
    marginLeft: 85,
    marginTop: 170,
    position:"absolute"
  },
  text7: {
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    marginTop: 8,
    color: "#fff",
  },
  text8: {
    fontSize: 13,
    marginLeft: 15,
    marginTop: 190,
    position:"absolute",
    fontWeight: "bold",
  },
  icons: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 15,
    color: '#bcbdbe'
  },
  icons1: {
    marginTop: -30,
    marginLeft: 40,
  },



});


const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Home_tar);




