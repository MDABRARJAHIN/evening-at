import React, { useState } from "react";
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
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import auth from "@react-native-firebase/auth";
import Validations from "../../Validations/Validation";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import SocialSignup from "../../components/SocialSignUp/SocialSignUp";
import styles from "./Styles";
const { height, width } = Dimensions.get("window");
const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIslaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };

  const handleSignUp = async () => {
    if (
      name == "" ||
      email == "" ||
      phoneNo == "" ||
      password == "" ||
      confirmPassword == ""
    )
      Alert("All fields are mendatory!");
    else if (
      Validations.isValidName(name) &&
      Validations.isEmail(email) &&
      Validations.isValidPassword(password) &&
      Validations.comparePassword(password, confirmPassword)
    ) {
      setIslaoding(true);
      auth()
        .signInWithPhoneNumber(phoneNo)
        .then((confirmation) => {
          let userData = { name, email, phoneNo, password };
          setIslaoding(false);
          props.navigation.replace("OTP", { userData, confirmation });
        })
        .catch((error) => {
          setIslaoding(false);
          Alert(error.message);
        });
    } else if (!Validations.isValidName(name)) {
      Alert("Invalid Name");
    } else if (!Validations.isEmail(email)) alert("Invalid Email");
    // else if (!Validations.isPhoneNo(phoneNo)) alert("Invalid Phone number");
    else if (!Validations.isValidPassword(password))
      Alert("Password should min 8 characters");
    else Alert("Password not matched");
  };
  return (
    <>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={setIsError}
      ></CustomAlert>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <HeaderContent
              content="Let's sign you up"
              customStyle={{ marginTop: height / 8 }}
            ></HeaderContent>
            <View style={styles.InputContainer}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#000"
                customStyle={{ borderColor: COLORS.borderColor }}
                onChangeText={(txt) => setName(txt)}
              ></TextInput>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000"
                customStyle={{ borderColor: COLORS.borderColor }}
                onChangeText={(txt) => setEmail(txt)}
              ></TextInput>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#000"
                customStyle={{ borderColor: COLORS.borderColor }}
                onChangeText={(txt) => setPhoneNo(txt)}
              ></TextInput>

              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#000"
                customStyle={{ borderColor: COLORS.borderColor }}
                onChangeText={(txt) => setPassword(txt)}
              ></TextInput>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor="#000"
                customStyle={{ borderColor: COLORS.borderColor }}
                onChangeText={(txt) => setConfirmPassword(txt)}
              ></TextInput>

              <Button title="Sign Up" onPress={() => handleSignUp()}></Button>
            </View>
            <Text style={styles.or}>or</Text>
            <SocialSignup />
            {/* <View style={styles.socialSignupOptions}>
          <TouchableOpacity>
            <Image source={images.facebookIcon} style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.googleIcon} style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.appleIcon} style={styles.icon}></Image>
          </TouchableOpacity>
        </View> */}
            <View style={styles.signUpOption}>
              <Text>Have an account? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={styles.signUpTxt}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default SignUp;
