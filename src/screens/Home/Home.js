import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import images from "../../constant/images";
import TextInput from "../../components/TextInputField/TextInputField";
import Button from "../../components/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constant/theme";
import Header from "../../components/Header/Header";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LocationIcon from "react-native-vector-icons/EvilIcons";
import Modal from "react-native-modal";
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import styles from "./Styles";
const {height,width} =Dimensions.get('window')
const Home = (props) => {
  const [allResturants, setAllResturants] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [isLoading, setIslaoding] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userDetail, setUserDetail] = useState([]);
  const [filter, setFilter] = useState("All");
  const databaseRef = database().ref("Resturants");
  useEffect(() => {
    setIsLoadingData(true);
    getUserDetails();
    loadAllResturants();
  }, []);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );
  const getUserDetails = async () => {
    setUserDetail(await auth().currentUser);
  };

  const loadAllResturants = () => {
    try {
      databaseRef.on("value", (snapshot) => {
        // console.log("all resturents", Object.values(snapshot.val()));
        if (snapshot.exists()) setAllResturants(Object.values(snapshot.val()));
        setIsLoadingData(false);
      });
    } catch (error) {
      console.log("error in fetching from resturants ", error);
      setIsLoadingData(false);
    }
  };
  const filterSelection = (type) => {
    setFilterType(type);
    setIsFilter(false);
  };

  const favouriteResturant = async (resId) => {
    //it also check wether already favourited or not
    databaseRef
      .child(resId.resId)
      .child("Favourites")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((d) => {
            d.val() !== userDetail.uid &&
              databaseRef
                .child(resId.resId)
                .child("Favourites")
                .push(userDetail.uid)
                .then((res) => console.log("favourit done"));
          });
        }
      });

    databaseRef
      .child(resId.resId)
      .child("Favourites")
      .push(userDetail.uid)
      .then((res) => console.log("favourit done"));
  };
  const unFavouriteResturant = async (resId) => {
    databaseRef
      .child(resId.resId)
      .child("Favourites")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((d) => {
            d.val() == userDetail.uid &&
              databaseRef
                .child(resId.resId)
                .child("Favourites")
                .child(d.key)
                .remove();
          });
        }
      });
  };

  const Filter = () => (
    <Modal isVisible={isFilter} onBackdropPress={() => setIsFilter(false)}>
      <View style={styles.modal}>
        <Icon
          name="close"
          size={24}
          color="#D3D3D3"
          style={styles.closeIcon}
          onPress={() => setIsFilter(false)}
        ></Icon>
        <TouchableOpacity
          onPress={() => filterSelection("All")}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.filterOptions}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterSelection("Favorites")}>
          <Text style={styles.filterOptions}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterSelection("Top Rated")}>
          <Text style={styles.filterOptions}>Top Rated</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => filterSelection("Most Visited")}>
          <Text style={styles.filterOptions}>Most Visited</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );

  const calculateRating = (value) => {
    let rating = 0;
    Object.values(value).map((data) => {
      rating += data.rating;
    });
    return rating / Object.values(value).length;
  };

  const renderItem = ({ item }) => {
    const ratingCount = "Feedback" in item ? calculateRating(item.Feedback) : 0; //apply mathematical operation to count all the ratings and get single value
    const totalUsersForFeedback =
      "Feedback" in item ? Object.values(item.Feedback).length : 0;
    const isfavorite =
      "Favourites" in item
        ? Object.values(item.Favourites).includes(userDetail.uid)
        : false;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          props.navigation.navigate("ItemDetail", {
            resturantDetail: item,
            ratingCount: ratingCount.toFixed(1),
            totalUsersForFeedback: totalUsersForFeedback,
          })
        }
      >
        <Image source={{ uri: item.resImage }} style={styles.itemImage}></Image>
        <View style={styles.itemContent}>
          <View style={styles.row}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.resName}
            </Text>
            <TouchableOpacity
              onPress={() =>
                isfavorite
                  ? unFavouriteResturant(item)
                  : favouriteResturant(item)
              }
            >
              <Icon
                name="heart"
                size={24}
                color={isfavorite ? "#F44336" : "#000"}
              ></Icon>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemDescription}>
            {item.resDescription.substring(0, 20)}...
          </Text>
          <View style={styles.location}>
            <LocationIcon
              name="location"
              color="#486D87"
              size={18}
            ></LocationIcon>
            <Text style={styles.locationTxt}>{item.resCity}</Text>
          </View>

          <View style={styles.feedbackContainer}>
            <View style={styles.feedback}>
              <Icon name="star" color="#FFB83A" size={20}></Icon>
              <Text style={styles.feedbackcount}>
                {ratingCount.toFixed(1)}({totalUsersForFeedback})
                {/* apply array count how have rated on this or show zero */}
              </Text>
            </View>
            <Text style={styles.price}>${item.resPricePerHead}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredData = () => {
    let tempValue = [];
    if (filterType == "All") {
      return allResturants;
    } else if (filterType == "Favorites") {
      let FavouriteResturents = allResturants.filter(
        (data) => "Favourites" in data
      );
      for (let i = 0; i < FavouriteResturents.length; i++) {
        if (
          Object.values(FavouriteResturents[i].Favourites).includes(
            auth().currentUser.uid
          )
        ) {
          tempValue.push(FavouriteResturents[i]);
        }
      }
      return tempValue;
    } else {
      let tempData = [];
      let FeedbackedData = allResturants.filter((data) => "Feedback" in data);
      for (i = 0; i < FeedbackedData.length; i++) {
        tempData.push({
          ...FeedbackedData[i],
          rating: calculateRating(FeedbackedData[i].Feedback),
        });
      }
      tempData.sort((a, b) => {
        return b.rating - a.rating;
      });
      return tempData;
    }
  };

  return isLoadingData ? (
    <SkeletonPlaceholder></SkeletonPlaceholder>
  ) : (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}

      <>
        <Header
          icon={
            filterType === "All"
              ? "filter-outline"
              : filterType === "Favorites"
              ? "heart"
              : "align-vertical-top"
          }
          iconColor={filterType === "Favorites" ? "#F44336" : "#000"}
          image={auth().currentUser.photoURL}
          iconPress={() => setIsFilter(true)}
          profileImagePress={() => props.navigation.navigate("Profile")}
        ></Header>
        {/* {console.log("=> ", filteredDatas())} */}
        <View style={styles.greetingContainer}>
          <Text>
            Hi {auth().currentUser.displayName}, Welcome to Evening At
          </Text>
        </View>
        <HeaderContent
          content="Book your evening"
          customStyle={{ marginTop: 10 }}
        ></HeaderContent>

        <Filter></Filter>
        {/* <View style={styles.contentContainer}> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:height/9}}
          data={filteredData()}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        ></FlatList>
      </>

      {/* </View> */}
    </SafeAreaView>
  );
};
export default Home;
