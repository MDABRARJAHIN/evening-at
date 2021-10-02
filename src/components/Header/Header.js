import React ,{useEffect}from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import propTypes from "prop-types";
import Images from "../../constant/images";
const { height, width } = Dimensions.get("window");

const Header = (props) => {
  useEffect(()=>{})
  return (
    <View style={styles.header}>
    {!props.isNoIcon&&
      <Icon
        name={props.icon}
        size={24}
        color={props.iconColor}
        onPress={() => props.iconPress()}
      ></Icon>
    }
      <Text style={styles.content}>{props.content}</Text>
      <TouchableOpacity onPress={props.profileImagePress}>
        {auth().currentUser.photoURL == null ? (
          <Image
            source={Images.noUserIcon}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        ) : (
          <Image
            source={{ uri: props.image }}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width - 60,
    marginTop: 10,
    paddingBottom: 20,
  },
  content: {
    fontWeight: "bold",
    fontSize: 22,
  },
  image: { height: 40, width: 40, borderRadius: 20 },
});

Header.propTypes = {
  icon: propTypes.string,
  image: propTypes.string,
  content: propTypes.string,
  iconColor: propTypes.string,
  isNoIcon:propTypes.bool
};
Header.defaultProps = {
  icon: "arrow-left",
  content: "",
  image: null,
  iconColor: "#000",
  isNoIcon:false
};
