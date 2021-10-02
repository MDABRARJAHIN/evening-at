import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";

import images from "../../constant/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button/Button";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
const { height, width } = Dimensions.get("window");
const PaymentWithCard = (props) => {
  const [cardDetail, setCardDetail] = useState();
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");

  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };

  const makePayment = async () => {
    console.log("obj ", cardDetail);
    if (!cardDetail.valid) {
      alert("Please Enter Valid Card Details");
    } else {
      setIslaoding(true);
      const card = {
        "card[number]": cardDetail.values.number.replace(/ /g, ""),
        "card[exp_month]": cardDetail.values.expiry.split("/")[0],
        "card[exp_year]": cardDetail.values.expiry.split("/")[1],
        "card[cvc]": cardDetail.values.cvc,
        "card[name]": cardDetail.values.name,
      };

      await fetch("https://api.stripe.com/v1/tokens", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer pk_test_51IRCfrAFLrhgbiHPDKQwMPAVPdDQMpG4VUjBNxWWAklVwAdeyKzomq2uLMAN9EXqj0a2ZCDFYtTLZgTdrnj7ZoRj00l0aeVt7i",
        },
        method: "post",
        body: Object.keys(card)
          .map((key) => key + "=" + card[key])
          .join("&"),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("API response ", res);
          chargeAccount(res, 100);
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }
  };

  const chargeAccount = async (token, price) => {

    const { bookingObject } = props.route.params;
    let description = "Charge";
    let properties = {
      amount: Math.round(bookingObject.resPricePerHead * 100),
      currency: "usd",
      source: token.id,
      description: description,
    };
    return await fetch(`https://api.stripe.com/v1/charges`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer sk_test_51IRCfrAFLrhgbiHPd43r2W2ieNDWkoWaGu4JxSjWRQKm0JZKUJbxP99T8wHLyd2bpfP9ArEZL7PnfTtBUi7ZpOSN00YQrF7345`,
      },
      method: "post",
      body: Object.entries(properties)
        .map(([key, value]) => `${key}=${value}`)
        .reduce((previous, current) => `${previous}&${current}`, ""),
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log("response in charge ", res.status);
        if (res.status == "succeeded") {
          database()
            .ref("Bookings")
            .child(auth().currentUser.uid)
            .push(bookingObject)
            .then((res) => {
              setIslaoding(false);
              Alert("Booking Successful");
              // Toasts.show("Reset password link is sent on given email", 2000);
             ;
            })
            .catch((error) => {
              setIslaoding(false);
              console.log("error in booking");
              alert("Something Went Wrong");
              // Alert("Something went wrong!");
            });
        } else alert("Something Went Wrong");
      })
      .catch((error) => {
        console.log("error in charge account ", error);
      });
  };

  return (
    <SafeAreaView style={styles.cardContainer}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.checkIcon}
        text={errorMsg}
        onHide={() => {
          setIsError(false)
          props.navigation.replace("BottomNavigator");
        }}
      ></CustomAlert>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
        {/* <Feather
          name="settings"
          size={24}
          onPress={() => props.navigation.navigate('Setting')}></Feather> */}
      </View>
      <CreditCardInput onChange={(obj) => setCardDetail(obj)} />
      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={() => makePayment()} />
      </View>
    </SafeAreaView>
  );
};
export default PaymentWithCard;

const styles = StyleSheet.create({
  cardContainer: {},
  header: {
    width: width - 60,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: height / 15,
  },
  buttonContainer: {
    width: width - 60,
    alignSelf: "center",
  },
});
