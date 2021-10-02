import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  View,
} from "react-native";
const { height, width } = Dimensions.get("window");
import images from "../../constant/images";

import Button from "../../components/Button/Button";
import { COLORS } from "../../constant/theme";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import auth from "@react-native-firebase/auth";

const SplashScreen = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("BottomNavigator");
        setIsLoading(false);
        setIsAuth(true);
      } else {
        setIsLoading(false);
        setIsAuth(false);
      }
    });
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <ImageBackground
        style={styles.bg}
        source={images.splashBackgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={images.logo}
            resizeMode="contain"
          ></Image>

          {!isAuth && !isLoading && (
            <View style={styles.btnContainer}>
              <Button
                title="Sign In"
                customStyle={styles.signInBtn}
                customTitleStyle={styles.signInTitle}
                onPress={() => props.navigation.navigate("Login")}
              ></Button>

              <Button
                title="Sign Up"
                onPress={() => props.navigation.navigate("SignUp")}
              ></Button>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  bg: {
    height,
    width,

    // flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: width / 3,
    height: width / 3,
    marginTop: height / 3,
  },
  btnContainer: {
    width: width - 60,

    marginTop: height / 6,
  },
  signInBtn: {
    backgroundColor: COLORS.secondary,
  },
  signInTitle: {
    color: "#000",
  },
  signUpBtn: {},
  signUpTitle: {},
});
