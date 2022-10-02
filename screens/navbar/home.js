import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { connect } from "react-redux";
import technician_type from "../service/getService";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: null,
      technician: null,
      urlImg: null,
/*       login: null, */
      startApp: null,
    };
  }



  componentDidMount() {

    /* this.setUrl(); */
    this.getTechnician_type();
    this.deleteSarte();


  }
  componentDidUpdate(prevProps, prevState) {
    const { login,startApp } = this.props.posts;
    if (prevProps.login !== login && this.state.login  !== null) {
      setTimeout(() => {
        this.getTechnician_type();
      }, 6000);
    }


    if (startApp !== this.state.startApp) {
      this.setState({
        startApp: startApp
      })
    }
  }

  getTechnician_type = async () => {
    const result = await technician_type.technician_type();
    this.setState({
      technician: result,
      address: this.props.posts.address,
      urlImg: this.props.posts.urlImage,
/*       login: this.props.posts.login, */
    });
  }


/*   setUrl = () => {
    this.props.dispatch({
      type: 'ADD_URL',
      payload: "https://th-projet.com/api-database/images/"
    })
  } */

  deleteSarte() {

    this.props.dispatch({
      type: 'DELETE_TECHNICAN',
      payload: null
    })
    this.props.dispatch({
      type: 'DELETE_IDTECHNICAN',
      payload: null
    })
  }

  setLogin(e) {

    if (this.props.posts.login !== null) {
      this.props.navigation.navigate("Tradesman");
      this.props.dispatch({
        type: 'ADD_TECHNICAN',
        payload: e
      })
    } else {
      this.props.navigation.navigate("Login")
    }
  }

  /* ลูกค้า */
  customer = () => {
    const { technician, urlImg } = this.state;

    return (

      <>
        <SafeAreaView style={styles.container}>


          <ScrollView>
            <View style={styles.box1}>
              <View style={styles.box}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/images/AAA.png')}
                />
              </View>
              <Text style={styles.text}>รายละเอียดงาน</Text>
            </View>
            <View style={styles.boxhead}>
              {technician && technician.map((index) => {

                const nameImage = index.image_name;
                const name = index.technician_type;
                const image = (
                  <TouchableWithoutFeedback onPress={() => this.setLogin(name)}>
                    <View style={styles.box3}>
                      <Image style={styles.image3} source={require('../../assets/images/A-9.jpg')} />
                      <Text style={styles.text1}>{name}</Text>
                      {
                        nameImage !== null ?
                          <Image style={styles.image1} source={{ uri: `${urlImg}image_tradesman/${nameImage}` }} />
                          :
                          <Image style={styles.image1} source={require('../../assets/images/B-1.png')} />
                      }
                    </View>
                  </TouchableWithoutFeedback>
                )
                return image;
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }

  /* ช่าง */
  tradesman = () => {
    const { technician, urlImg, address } = this.state;

    if (address !== null) {
      var technician_1 = [address.technician_1, address.technician_2];
    }

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.box1}>
              <View style={styles.box}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/images/AAA.png')}
                />
              </View>
              <Text style={styles.text}>ประเภทงานของคุณ</Text>
            </View>

            <View style={styles.boxhead}>
              {

                technician_1 && technician_1.map((va) => {
                  const image_type = technician && technician.filter((index, id) => {
                    if (va === index.technician_type) {
                      const name = index;

                      return name;
                    }
                  })

                  if (image_type[0]) {
                    const nameImage = image_type[0].image_name;
                    const name = image_type[0].technician_type;
                    const image = (
                      <TouchableWithoutFeedback>
                        <View style={styles.box3}>
                          <Image style={styles.image3} source={require('../../assets/images/A-9.jpg')} />
                          <Text style={styles.text1}>{name}</Text>
                          {
                            nameImage !== null ?
                              <Image style={styles.image1} source={{ uri: `${urlImg}image_tradesman/${nameImage}` }} />
                              :
                              <Image style={styles.image1} source={require('../../assets/images/B-1.png')} />
                          }
                        </View>
                      </TouchableWithoutFeedback>
                    )
                    return image;
                  }
                })
              }


            </View>
          </ScrollView>
        </SafeAreaView>

      </>
    )
  }



  /* ช่าง */
  tradesman = () => {
    const { technician, urlImg, address } = this.state;

    if (address !== null) {
      var technician_1 = [address.technician_1, address.technician_2];
    }

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.box1}>
              <View style={styles.box}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/images/AAA.png')}
                />
              </View>
              <Text style={styles.text}>ประเภทงานของคุณ</Text>
            </View>

            <View style={styles.boxhead}>
              {

                technician_1 && technician_1.map((va) => {
                  const image_type = technician && technician.filter((index, id) => {
                    if (va === index.technician_type) {
                      const name = index;

                      return name;
                    }
                  })

                  if (image_type[0]) {
                    const nameImage = image_type[0].image_name;
                    const name = image_type[0].technician_type;
                    const image = (
                      <TouchableWithoutFeedback>
                        <View style={styles.box3}>
                          <Image style={styles.image3} source={require('../../assets/images/A-9.jpg')} />
                          <Text style={styles.text1}>{name}</Text>
                          {
                            nameImage !== null ?
                              <Image style={styles.image1} source={{ uri: `${urlImg}image_tradesman/${nameImage}` }} />
                              :
                              <Image style={styles.image1} source={require('../../assets/images/B-1.png')} />
                          }
                        </View>
                      </TouchableWithoutFeedback>
                    )
                    return image;
                  }
                })
              }


            </View>
          </ScrollView>
        </SafeAreaView>

      </>
    )
  }

  getStarted = () => {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.box2}>
              <View style={styles.box}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/images/AAA.png')}
                />
              </View>
              <Text style={styles.text2}>App มีการเก็บข้อมูลการเป็นส่วนตัว</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => this.clickStartApp()}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      textAlign: "center",
                      color: "white",
                      marginTop: 4,
                    }}
                  >
                    เริ่มใช้งาน
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }


  clickStartApp() {
    this.props.dispatch({
      type: 'ADD_STARTAPP',
      payload: true
    })
  }



  render() {

    const login_props = this.props.posts.login;
    const {startApp} = this.state;
    return (
      <>
        {
          
            startApp !== null ? 
              login_props !== null ?
              login_props.status_user === "ช่าง" ?
                this.customer()
                :
                this.customer()
                :
              this.customer()
            :
            this.getStarted()
          

        
        }
        
      </>
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
    
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  box: {
    height: 140,
    width: 140,
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 4,
    borderColor: '#fff',
  },
  box1: {
    width: "auto",
    height: 220,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 4,
    padding: -10,
  },
  box2: {
    width: "auto",
    height: "100%",
    shadowColor: "#000",
    marginBottom: 4,
    padding: -10,
    paddingBottom: 50
  },
  box3: {
    width: 160,
    height: 100,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
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
    marginTop: 20,
    marginLeft: 20,
    position: "absolute"
  },
  image2: {
    width: 145,
    height: 145,
    marginTop: -5,
    marginLeft: -4,
  },
  image3: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginTop: -5,
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
    position: "absolute",
    marginLeft: 10,
  },
  text2: {
    marginTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    marginTop: "50%",
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 20,
  },
  button1: {
    backgroundColor: "#37C1FB",
    height: 50,
    borderRadius: 25,
  },



});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(Home);







