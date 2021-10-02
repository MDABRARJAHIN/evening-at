import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Images from "../../constant/images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import ImagePicker from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import styles from "./Styles";

const Profile = (props) => {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [userImage, setUserImage] = useState(auth().currentUser.photoURL);
  const [isLoading, setIslaoding] = useState(false);
  const [userDetail, setuserDetail] = useState(null);
  useEffect(() => {
    console.log(auth().currentUser.providerData[0].providerId);
  }, []);

  const UploadImage = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };
        const localUri =
          Platform.OS === "ios"
            ? response.uri.replace("file://", "")
            : response.uri;
        setUserImage(response.uri);
        updateProfile(response.uri, auth().currentUser.uid);
      }
    });
  };

  const updateProfile = async (uri, userId) => {
    setIslaoding(true);
    let photoURL = await uploadImageAndGetUrl(uri, userId);

    auth()
      .currentUser.updateProfile({
        photoURL: photoURL,
      })
      .then((res) => {
        database()
          .ref("Users")
          .child(userId)
          .update({ photoUrl: photoURL })
          .then((res) => {
            setIslaoding(false);
            console.log("photo updated");
          })
          .catch((error) => {
            setIslaoding(false);
            console.log("photo update error ", error);
          });
      })
      .catch((error) => {
        setIslaoding(false);
        console.log("photo update error ", error);
      });
  };

  const uploadImageAndGetUrl = async (localUri, firebasePath) => {
    let paths = "";

    try {
      const response = await fetch(localUri);
      const blob = await response.blob();
      var ref = storage().ref("profilePic/" + firebasePath);

      paths = ref
        .put(blob)
        .then(async () => {
          var ref = storage().ref("profilePic/" + firebasePath);
        })
        .then(async () => {
          let urls = await storage()
            .ref("profilePic/" + firebasePath)
            .getDownloadURL();
          return urls;
        });

      return await paths;
    } catch (error) {
      console.log("error in firebase image upload=>", error);
      return;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
        <Feather
          name="settings"
          size={24}
          onPress={() => props.navigation.navigate("Setting")}
        ></Feather>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.uploadContainer}>
            {userImage == null ? (
              <Image source={Images.noUserIcon} style={styles.image}></Image>
            ) : (
              <Image
                source={{
                  uri: userImage,
                }}
                style={styles.image}
              ></Image>
            )}

            {auth().currentUser.providerData[0].providerId == "password" && (
              <TouchableOpacity onPress={() => UploadImage()}>
                <Image
                  source={Images.uploadIcon}
                  style={[styles.image, styles.uploadIcon]}
                ></Image>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.userDetailContainer}>
            <View style={styles.contentRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.data}>{auth().currentUser.displayName}</Text>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.label}>Email</Text>

              {auth().currentUser.providerData.providerId !== "password" ? (
                <Text style={styles.data}>
                  {auth().currentUser.providerData[0].email}
                </Text>
              ) : (
                <Text style={styles.data}>{auth().currentUser.email}</Text>
              )}
            </View>

            {/* <View style={styles.contentRow}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.data}>Male</Text>
            </View> */}
            {/* <View style={styles.contentRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.data}>+97875467457</Text>
            </View> */}
            {/* <View style={[styles.contentRow, styles.passwordRow]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Password</Text>
                {isShownPassword ? (
                  <Text style={styles.data}>1234567</Text>
                ) : (
                  <Text style={styles.data}>********</Text>
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="eye-outline"
                  color="#FFB83A"
                  size={24}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => setIsShownPassword(!isShownPassword)}
                ></Icon>

                <Icon
                  name="chevron-right"
                  size={28}
                  style={{ marginLeft: 5 }}
                  onPress={() => props.navigation.navigate("ResetPassword")}
                ></Icon>
              </View>
            </View> */}
            {/* <View style={styles.contentRow}>
              <Text style={styles.label}>Date of birth</Text>
              <Text style={styles.data}>20 jan 1996</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
