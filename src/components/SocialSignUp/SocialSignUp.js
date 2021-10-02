import React, { useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
const { height, width } = Dimensions.get("window");
import images from "../../constant/images";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
 import { LoginManager, AccessToken } from "react-native-fbsdk";
import database from "@react-native-firebase/database";

const SocialSignup = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "664535516928-cem40cclom0e9mukmumfuglu8dbvvfbi.apps.googleusercontent.com",
    });
  }, []);

  const googleSignup = async () => {
    try {
      // setisLoadingGoogle(true)
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth()
        .signInWithCredential(googleCredential)
        .then((res) => {
          console.log("from google", res.user);

          database().ref("Users").child(res.user.uid).set({
            userName: res.user.displayName,
            userPhoneno: "",
            userEmail: res.additionalUserInfo.profile.email,
            userProfilePic: res.user.photoURL,
            userId: res.user.uid,
          });
        });
    } catch (error) {
      // setisLoadingGoogle(false)
      console.log(error);
    }
  };

  const FacebookLogin = async () => {
    try {
      // this.setState({ setLoadingFacebbok: true })
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        throw "User cancelled the login process";
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      await auth()
        .signInWithCredential(facebookCredential)
        .then((res) => {
          // this.setState({ setLoadingFacebbok: false })
          console.log("FacebookAuthenication done", res);
          // this.props.navigation.navigate('Home')

          database().ref("Users").child(res.user.uid).set({
            userName: res.user.displayName,
            userPhoneno: "",
            userEmail: res.additionalUserInfo.profile.email,
            userProfilePic: res.user.photoURL,
            userId: res.user.uid,
          });
        });
    } catch (error) {
      alert(error);
      console.log("Error of Authenication", error);
    }
  };
  return (
    <View style={styles.socialSignupOptions}>
      <TouchableOpacity onPress={() =>FacebookLogin()}>
        <Image source={images.facebookIcon} style={styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => googleSignup()}>
        <Image source={images.googleIcon} style={styles.icon}></Image>
      </TouchableOpacity>
      {Platform.OS === "ios" && (
        <TouchableOpacity>
          <Image source={images.appleIcon} style={styles.icon}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SocialSignup;
const styles = StyleSheet.create({
  socialSignupOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width - 60,
  },
  icon: {
    height: 50,
    width: 50,
  },
});
