import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Images from "../../constant/images";
const { height, width } = Dimensions.get("window");
const BookingItem = ({ image, name, rating, date, time, price, city }) => {
  return (
    <View style={styles.content}>
      <Image style={styles.itemImage} source={{ uri: image }}></Image>
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="star" color="#FFB83A" size={19}></Icon>
            <Text style={styles.ratingTxt}>{rating}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image source={Images.locationIcon} style={styles.icon}></Image>
            <Text style={styles.date}>{city}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image
              source={Images.calendarActiveIcon}
              style={styles.icon}
            ></Image>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image source={Images.timeActiveIcon} style={styles.icon}></Image>
            <Text style={styles.date}>{time}</Text>
          </View>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </View>
  );
};
export default BookingItem;

const styles = StyleSheet.create({
  content: {
    width: width - 60,
    backgroundColor: "#fff",
    borderRadius: 20,

    marginTop: 20,
    flexDirection: "row",
  },
  itemImage: {
    height: width / 4,
    width: width / 4,
    borderRadius: 20,
  },
  itemContent: {
    width: width - width / 5 - 30,
    paddingLeft: 10,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: width - width / 5 - 100,

    alignItems: "center",
  },
  nameContainer: {
    width: "70%",
  },
  ratingTxt: {
    fontSize: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  icon: {
    height: 15,
    width: 15,
  },
  date: {
    color: "#4CAF50",
    fontSize: 10,
    marginLeft: 5,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
