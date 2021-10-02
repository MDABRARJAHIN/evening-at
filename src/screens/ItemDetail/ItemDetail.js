import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import styles from "./Styles";
import Header from "../../components/Header/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Images from "../../constant/images";
import Button from "../../components/Button/Button";
import auth from "@react-native-firebase/auth";
import images from "../../constant/images";
const { height, width } = Dimensions.get("window");
const ItemDetail = (props, { route }) => {
  

  const { resturantDetail, ratingCount, totalUsersForFeedback } =
    props.route.params;
  const [selectedOption, setSelectedOption] = useState(
    "Offers" in resturantDetail ? "Offerings" : "Details"
  );
  useEffect(() => {
    console.log(resturantDetail);
  }, []);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const renderOffers = ({ item }) => {
    return <Text style={styles.offerTxt}>{item}</Text>;
  };

  const Offers = () => {
    let resOffers = Object.values(resturantDetail.Offers);

    return (
      <FlatList
        data={resOffers}
        renderItem={renderOffers}
        keyExtractor={(item, index) => index}
      ></FlatList>
    );
  };

  const Detail = () => {
    const details = resturantDetail.resDetail;
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Image style={styles.icon} source={Images.timeIcon}></Image>
          <Text style={styles.detailtxt}>
            evening starts at {details.startTime}{" "}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Image style={styles.icon} source={Images.seatIcon}></Image>
          <Text style={styles.detailtxt}>{details.seats} seats</Text>
        </View>
      </View>
    );
  };

  const Contact = () => {
    const contact = resturantDetail.resContact;
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Image style={styles.icon} source={Images.locationIcon}></Image>
          <Text style={styles.detailtxt}>{contact.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Image style={styles.icon} source={Images.seatIcon}></Image>
          <Text style={styles.detailtxt}>{contact.call}</Text>
        </View>
        <View style={styles.detailRow}>
          <Image style={styles.icon} source={Images.mailIcon}></Image>
          <Text style={styles.detailtxt}>{contact.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height / 7 }}
      >
        <Header
          image={auth().currentUser.photoURL}
          content="Evening at"
          iconPress={() => props.navigation.goBack()}
        ></Header>
        <Image
          source={{
            uri: resturantDetail.resImage,
          }}
          style={styles.contentImage}
        ></Image>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{resturantDetail.resName}</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("BookingOnMap", { resturantDetail })
              }
            >
              <Text style={styles.mapTxt}>see on the map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.decriptionContainer}>
            <Text style={styles.descriptionTxt}>
              {resturantDetail.resDescription}
            </Text>
            <Text style={styles.priceTxt}>
              ${resturantDetail.resPricePerHead}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="star" color="#FFB83A" size={24}></Icon>
              <Text>
                {"  "}
                {ratingCount} ({totalUsersForFeedback})
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("BookNow", {
                  resturantDetail,
                  ratingCount,
                  totalUsersForFeedback,
                })
              }
            >
              <Image
                source={Images.calenderIcon}
                style={styles.calenderIcon}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.options}>
            {"Offers" in resturantDetail && (
              <View
                style={selectedOption == "Offerings" && styles.optionBorder}
              >
                <TouchableOpacity
                  onPress={() => setSelectedOption("Offerings")}
                  style={[
                    styles.option,
                    selectedOption == "Offerings" && styles.activeOption,
                  ]}
                >
                  <Text style={styles.optionTxt}>Offerings</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={selectedOption == "Details" && styles.optionBorder}>
              <TouchableOpacity
                onPress={() => setSelectedOption("Details")}
                style={[
                  styles.option,
                  selectedOption == "Details" && styles.activeOption,
                ]}
              >
                <Text style={styles.optionTxt}>Details</Text>
              </TouchableOpacity>
            </View>
            <View style={selectedOption == "Contact" && styles.optionBorder}>
              <TouchableOpacity
                onPress={() => setSelectedOption("Contact")}
                style={[
                  styles.option,
                  selectedOption == "Contact" && styles.activeOption,
                ]}
              >
                <Text style={styles.optionTxt}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedOption === "Offerings" && <Offers />}
          {selectedOption === "Details" && <Detail />}
          {selectedOption === "Contact" && <Contact />}

          <Button
            title="Book Now"
            customStyle={{ marginBottom: 30 }}
            onPress={() =>
              props.navigation.navigate("BookNow", {
                resturantDetail,
                ratingCount,
                totalUsersForFeedback,
              })
            }
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ItemDetail;
