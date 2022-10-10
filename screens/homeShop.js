import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import shop from './service/getService';
import { connect } from "react-redux";

class HomeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopImage: null,
      url: null
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'DELETE_SHOPALL',
      payload: null
    })
    this.setState({
      shopImage: this.props.posts.shopAll,
      url: this.props.posts.urlImage
    })
    this.getShop()
  }
  componentDidUpdate(prevProps, prevState) {

    const { shopAll } = this.props.posts;
    if (prevProps.shopAll !== shopAll && shopAll !== this.state.shopImage) {
      this.setState({
        shopImage: this.props.posts.shopAll
      })
    }
  }
  getShop = async () => {
    const result = await shop.getShopImagesAll();
    if (result) {
      this.props.dispatch({
        type: 'ADD_SHOPALL',
        payload: result
      })
      this.setState({
        shopImage: this.props.posts.shopAll
      })
    }
  }

 clikShop(e){

  this.props.dispatch({
    type: 'ADD_IDSHOP',
    payload: e
  })
  this.props.navigation.navigate("shop_user")
 }

  allShop() {
    const { shopImage, url } = this.state;
    console.log("shopImage",shopImage);
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.row}>
            {
            (shopImage && shopImage !== null) ?
              /* console.log("มีค่า") */
                <>
                  {
                  shopImage && shopImage.map((index) => {
                      const image = (
                        <TouchableWithoutFeedback onPress={(e) => this.clikShop(index.id_shop)}>
                          <View style={styles.box}>
                            <View style={styles.img}>
                              <Image source={{ uri: `${url}shop/${index.url_shop}` }}
                                style={styles.image}
                              />
                            </View>
                            <View>
                              <Text style={styles.heading}>{index.heading !== "null" ? index.heading : null}</Text>
                              <Text style={styles.detail}>{index.detail !== "null" ? index.detail.substr(0,100)+'...' : null}</Text>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      )
                      return image
                    })
                  }
                </>
                :  null

            }
          </View>
        </ScrollView>
      </>
    )
  }

  render() {
    return (
      this.allShop()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  row: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  box: {
    width: 160,
    height: "auto",
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    backgroundColor: "#4BC7FB",
  },
  image: {
    width: "100%",
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4BC7FB',

  },
  heading: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight:10,
    fontSize: 16,
    color: "#fff"
  },
  detail: {
    color: "##373737",
    fontSize:12,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10
  }
});
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps, null)(HomeShop);