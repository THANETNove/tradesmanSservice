import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import get_technician from './service/getService';

 class workings_tras_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      urlImg: null,
    };
  }

  componentDidMount() {
    const id = this.props.posts.id;
    this.technicianAndUser(id);
  }

  technicianAndUser = async (e) => {
    const result1 = await get_technician.getImage(e);
    this.setState({
      image: result1,
      urlImg: this.props.posts.urlImage,
    })

  }
  
  render() {
      const { image,urlImg } = this.state;
    
    return (
     <>
       {image !== null ? (
          <>
            <ScrollView>
              <View>
                <Image
                  style={styles.image5}
                  source={require("../assets/images/AA1.png")}
                />
              </View>
              <View style={styles.box6}>
                <View style={styles.top}>
                  <View>
              <Text style={styles.text4}>รูปภาพเกี่ยวกับงาน </Text>
            </View>
                  {image.map((index) => {
                    const image = (
                      <Image
                        source={{ uri: `${urlImg}${index.file_src}` }}
                        style={styles.image4}
                      />
                    );

                    return image;
                  })}
                </View>
              </View>
            </ScrollView>
          </>
        ) : 
        <>
        <Image style={styles.image5} source={require("../assets/images/AA1.png")}/>
        <Text style={styles.text1}>ไม่มีรูปภาพ ที่เกี่ยวข้อง </Text>
        </>
        }
     </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    container: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
  },
  backgroun: {
    width: 360,
    height: 220,
  },
  boxhead: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 40,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image2: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image3: {
    width: 110,
    height: 150,
    borderRadius: 15,
    position: "absolute",
  },
  image4: {
    width: 320,
    height: 200,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    
  },
  image5: {
    height: 220,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -10,
  },
  box1: {
    width: 110,
    height: 150,
    marginTop: 5,
    marginLeft: 7,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginBottom: 4,
  },
  box: {
    width: 160,
    height: 180,
    padding: 2,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  box2: {
    height: 25,
    width: 120,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 20,
  },
  box5: {
    height: 25,
    width: 120,
    backgroundColor: "#e8e9e9",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: -5,
  },
  box3: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    marginLeft: 30,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 5,
  },
  box4: {
    height: 140,
    width: 140,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 5,
    borderColor: "#fff",
  },
  box6: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -44,
    marginBottom: 10,
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 30,
    color: "#37C1FB",
    marginTop: 5,
  },
  text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  text2: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
  text3: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginTop: 12,
  },
  text4: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: -20,
  },
  text5: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 15,
    padding: 6,
    color: '#fff',
  },
  icons: {
    fontSize: 35,
    color: "#000",
    textAlign: "center",
    marginTop: 55,
  },
  button: {
    height: 50,
    width: 280,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 30,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  button1: {
    height: 30,
    width: 90,
    backgroundColor: "#37C1FB",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginLeft: 250,
    marginTop: -25,
    marginBottom: 5,
    borderRadius: 10,
  },
  top: {
    marginTop: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps, null)(workings_tras_user);


