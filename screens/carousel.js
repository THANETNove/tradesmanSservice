import React, { Component, useState, useEffect } from 'react'
import { AppRegistry, StyleSheet, Image, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'
import shopImg from "./service/getService";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    height: "100%",
    width: "100%",
  }
})


export default class SwiperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      url: `https://th-projet.com/api-database/images/home/`,
    };
  }




  componentDidMount() {

    this.getImage()
  }

  getImage() {
    shopImg.getHomeImages()
      .then((value) => {
        /* console.log("value",value[0].url_shop); */

        this.setState({
          image1: value[0].url_shop,
          image2: value[1].url_shop,
          image3: value[2].url_shop,
          image4: value[3].url_shop,
        });
      })
      .catch((err) => {
        console.error(err);
      });;


  }
  /* componentDidUpdate() {

    if (this.state.image == null) {
      this.getImage()
    }
  } */

  /*   image() {
      const { image } = this.state;
  
      return (
        <>
          {
  
            image && image.map((index) => (
              <View style={styles.slide1}>
                 <Text style={styles.text}>{index.url_shop}</Text>
                <Image source={{ uri: `https://th-projet.com/api-database/image/home` + index.url_shop }} style={styles.image3} />
              </View>
            ))
          }
        </>
      )
    } */

  render() {


    const { image1, image2, image3, image4 } = this.state;
    return (
      <Swiper style={styles.wrapper} showsButtons={true}  >

        <View style={styles.slide1}>
          <Image source={{ uri: `https://th-projet.com/api-database/images/home/${image1}` }} style={styles.image} />
        </View>
        <View style={styles.slide1}>
          <Image source={{ uri: `https://th-projet.com/api-database/images/home/${image2}` }} style={styles.image} />
        </View>
        <View style={styles.slide1}>
          <Image source={{ uri: `https://th-projet.com/api-database/images/home/${image3}` }} style={styles.image} />
        </View>
        <View style={styles.slide1}>
          <Image source={{ uri: `https://th-projet.com/api-database/images/home/${image4}` }} style={styles.image} />
        </View>
      </Swiper>
    )
  }
}

AppRegistry.registerComponent('myproject', () => SwiperComponent)


