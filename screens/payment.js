import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { WebView } from 'react-native-webview';
import get_Api from './service/getService';
import img1 from "../assets/images/logo_technician.png";

class Payment extends Component {
    componentDidMount() {
      /*   console.log("ตอนเเรก"); */
    }

    componentDidUpdate() {
       /*  console.log("โหลดเร็จ"); */
    }


    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    /*  source={PolicyHTML} */
                    style={{ flex: 1 }}
                    source={{
                        html: `
        <html>
         <head>
             <title>EPAYLINK Testing</title>
             <style>
                .submit {
                    border: 3px solid #fff;
                    background-color: #37C1FB;
                    color: #fff;
                    font-size: 60px;
                    border-radius: 60px;
                    width: 500px;
                    height: 120px;
                    position: absolute;
                    top: 60%;
                    left: 50%;
                    margin-top: -100px;
                    margin-left: -240px;
                    
                }
                .text {
                    font-size: 55px;
                    text-align: center;
                    margin-top: 45%;
            </style>
         </head>
         <body>
         <div class="text">
         <p>TECHNICIAN ONLINE</p>
         <p>พิเศษ 250.-/ปี</p>
         </div>
             <form method="post" action="https://www.thaiepay.com/epaylink/payment.aspx">
                 <input type="hidden" name="refno" value="999999999999">
                 <input type="hidden" name="merchantid" value="86636884">
                 <input type="hidden" name="customeremail" value="lollipopwar-love@hotmail.co.th">
                 <input type="hidden" name="cc" value="00">
                 <input type="hidden" name="productdetail" value="Testing Product">
                 <input type="hidden" name="total" id="total" value="5"><br>
                 <input type="submit" class="submit" name="Submit" value="ชำระเงิน">
             </form>
         </body>
         </html> 
         `}}
                    onShouldStartLoadWithRequest={req => {
                        if (req.url.startsWith('about')) {
                            this.props.navigation.navigate("home")
                        }
                        return true;
                    }}
                />
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
});

export default Payment;