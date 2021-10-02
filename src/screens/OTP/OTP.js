import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import images from "../../constant/images";
import TextInput from "../../components/TextInputField/TextInputField";
import Button from "../../components/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constant/theme";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import OTPTextInput from "react-native-otp-textinput";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import Toast, { DURATION } from "react-native-easy-toast";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { CommonActions, NavigationAction } from "@react-navigation/native";
import styles from "./Styles";
const { height, width } = Dimensions.get("window");
const OTP = (props) => {
  const [OTP, setOTP] = useState("");
  const [isLoading, setIslaoding] = useState(false);

  const { userData, confirmation } = props.route.params;
  const [OTPConfirmation, setOTPConfirmation] = useState(confirmation);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  const [isResent, setIsResent] = useState(false);
  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };
  let Toasts = useRef("");

  useEffect(() => {
    console.log("data ", userData);
  }, []);
  const handleOTPConfirm = async () => {
    console.log(OTP);
    try {
      setIslaoding(true);
      await OTPConfirmation.confirm(OTP);
      const { name, email, phoneNo, password } = userData;
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // res.user.updatePhoneNumber(phoneNo);
          res.user.updateProfile({ displayName: name });

          database()
            .ref("Users")
            .child(res.user.uid)
            .set({
              userName: name,
              userPhoneno: phoneNo,
              userEmail: email,
              userId: res.user.uid,
            })
            .then((response) => {
              setIslaoding(false);
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "BottomNavigator" }],
                })
              );
            })
            .catch((error) => {
              console.log("error ", error);
            });
        })
        .catch((error) => {
          alert(error);
          setIslaoding(false);
        });
    } catch (error) {
      alert(error);
      setIslaoding(false);
    }
  };

  const resendOTP = () => {
    auth()
      .signInWithPhoneNumber(userData.phoneNo)
      .then((res) => {
        setOTPConfirmation(res);
        // Toasts.show("Reset password link is sent on given email", 2000);
        setIsResent(true);
      })
      .catch((error) => {
        Alert(error.message);
      });
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={setIsError}
      ></CustomAlert>
      <SafeAreaView style={styles.container}>
        <HeaderContent
          content="Varify your number"
          customStyle={{ marginTop: height / 6 }}
        ></HeaderContent>
        <View style={styles.InputContainer}>
          <Text style={{ lineHeight: 20 }}>
            We have sent you a code on your mobile number, {"\n"}please enter
            here to continue.
          </Text>
          <View style={styles.OTPContainer}>
            <OTPTextInput
              inputCount={6}
              textInputStyle={{
                borderWidth: 1,
                height: 80,
                borderRadius: 20,
                width: 45,
                fontWeight: "bold",
                fontSize: 30,
              }}
              tintColor={COLORS.primary}
              handleTextChange={(txt) => setOTP(txt)}
            />
          </View>

          <View style={styles.resendOption}>
            {isResent ? (
              <Text>Didn't recieved any code? </Text>
            ) : (
              <>
                <Text>Didn't recieved any code? </Text>
                <TouchableOpacity onPress={() => resendOTP()}>
                  <Text style={styles.resendTxt}>resend</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <Button
            title="Confirm"
            customStyle={{ marginTop: height / 5 }}
            onPress={() => handleOTPConfirm()}
          ></Button>
        </View>
      </SafeAreaView>
      <Toast ref={(toast) => (Toasts = toast)} />
    </KeyboardAwareScrollView>
  );
};
export default OTP;
