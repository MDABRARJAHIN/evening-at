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
  Dimensions,
} from "react-native";
import { COLORS } from "../../constant/theme";
import Header from "../../components/Header/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LocationIcon from "react-native-vector-icons/EvilIcons";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import Rating from "../../components/Rating/Rating";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import moment from "moment";
const { height, width } = Dimensions.get("window");
import styles from "./Styles";
const Review = (props) => {
  const databaseRef = database().ref("Resturants");
  const [allResturants, setAllResturants] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const [index, setIndex] = React.useState(0);
  const [count, setCount] = useState(0);
  const [routes] = React.useState([
    { key: "AllReviews", title: "All Reviews" },
    { key: "MyReviews", title: "My Reviews" },
  ]);

  useEffect(() => {
    loadAllResturants();
  }, []);

  const loadAllResturants = () => {
    try {
      databaseRef.on("value", (snapshot) => {
        console.log("all resturents", Object.values(snapshot.val()));
        if (snapshot.exists()) setAllResturants(Object.values(snapshot.val()));
        setIsLoadingData(false);
      });
    } catch (error) {
      console.log("error in fetching from resturants ", error);
      setIsLoadingData(false);
    }
  };

  const myReviews = () => {
    let tempData = [];
    let FeedbackedData = allResturants.filter((data) => "Feedback" in data);
    for (let i = 0; i < FeedbackedData.length; i++) {
      if (
        Object.values(FeedbackedData[i].Feedback).some(
          (data) => data.userId == auth().currentUser.uid
        )
      )
        tempData.push(FeedbackedData[i]);
    }

    console.log("resturent  ", tempData.length);

    return tempData;
  };

  const calculateRating = (value) => {
    let rating = 0;
    Object.values(value).map((data) => {
      rating += data.rating;
    });
    return rating / Object.values(value).length;
  };
  const renderItemAllReivew = ({ item }) => {
    // {moment(ratings[0].createdAt).format("dddd") +
    // "," +
    // moment(ratings[0].createdAt).format("MMM") +
    // " " +
    // moment(ratings[0].createdAt).format("D")}

    

    const ratingCount = "Feedback" in item ? calculateRating(item.Feedback) : 0; //apply mathematical operation to count all the ratings and get single value
    const totalUsersForFeedback =
      "Feedback" in item ? Object.values(item.Feedback).length : 0;

    const isfavorite =
      "Favourites" in item
        ? Object.values(item.Favourites).includes(auth().currentUser.uid)
        : false;

    const ratings =
      "Feedback" in item
        ? Object.values(item.Feedback).filter(
            (data) => data.userId == auth().currentUser.uid
          )
        : [];
    return (
      <View style={styles.itemMainContainer}>
        {/* {console.log("last  ", ratings[0])} */}
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.resImage }}
            style={styles.itemImage}
          ></Image>
          <View style={styles.itemContent}>
            <View style={styles.row}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.resName}
              </Text>
              <View>
                <Icon
                  name="heart"
                  size={24}
                  color={isfavorite ? "#F44336" : "#000"}
                ></Icon>
              </View>
            </View>

            <Text style={styles.itemDescription}>
              {item.resDescription.substring(0, 30)}...
            </Text>
            <View style={styles.location}>
              <LocationIcon
                name="location"
                color="#486D87"
                size={18}
              ></LocationIcon>
              <Text style={styles.locationTxt}>{item.resCity}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.feedback}>
                <Icon name="star" color="#FFB83A" size={20}></Icon>
                <Text style={styles.feedbackcount}>
                  {ratingCount.toFixed(1)} ({totalUsersForFeedback})
                </Text>
              </View>
              <Text style={styles.price}>${item.resPricePerHead}</Text>
            </View>
          </View>
        </View>
        {"Feedback" in item &&
          Object.values(item.Feedback).map((data) => (
            <View style={styles.feedbackContainer}>
              {console.log("yes  ", data)}
              <Rating
                // rating={ratings[0].rating}
                rating={data.rating}
                size={30}
                isDisable={true}
                onPress={(e) => console.log("rating ", e)}
              ></Rating>
              <Text style={styles.feedbackTxt}>{data.content}</Text>
              <Text style={styles.feedbackDate}>
                {moment(data.createdAt).format("dddd") +
                  "," +
                  moment(data.createdAt).format("MMM") +
                  " " +
                  moment(data.createdAt).format("D")}
              </Text>
            </View>
          ))}
        
      </View>
    );
  };



  const renderItemMyReivew = ({ item }) => {
   const ratingCount = "Feedback" in item ? calculateRating(item.Feedback) : 0; //apply mathematical operation to count all the ratings and get single value
    const totalUsersForFeedback =
      "Feedback" in item ? Object.values(item.Feedback).length : 0;

    const isfavorite =
      "Favourites" in item
        ? Object.values(item.Favourites).includes(auth().currentUser.uid)
        : false;

    const ratings =
      "Feedback" in item
        ? Object.values(item.Feedback).filter(
            (data) => data.userId == auth().currentUser.uid
          )
        : [];
    return (
      <View style={styles.itemMainContainer}>
        {console.log("last  ", ratings)}
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.resImage }}
            style={styles.itemImage}
          ></Image>
          <View style={styles.itemContent}>
            <View style={styles.row}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.resName}
              </Text>
              <View>
                <Icon
                  name="heart"
                  size={24}
                  color={isfavorite ? "#F44336" : "#000"}
                ></Icon>
              </View>
            </View>

            <Text style={styles.itemDescription}>
              {item.resDescription.substring(0, 30)}...
            </Text>
            <View style={styles.location}>
              <LocationIcon
                name="location"
                color="#486D87"
                size={18}
              ></LocationIcon>
              <Text style={styles.locationTxt}>{item.resCity}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.feedback}>
                <Icon name="star" color="#FFB83A" size={20}></Icon>
                <Text style={styles.feedbackcount}>
                  {ratingCount.toFixed(1)} ({totalUsersForFeedback})
                </Text>
              </View>
              <Text style={styles.price}>${item.resPricePerHead}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.feedbackContainer}>
          <Rating
             rating={ratings[0].rating}
            // rating={2}
            size={30}
            isDisable={true}
            onPress={(e) => console.log("rating ", e)}
          ></Rating>
          <Text style={styles.feedbackTxt}>{ratings[0].content}</Text>
          <Text style={styles.feedbackDate}>
          {moment(ratings[0].createdAt).format("dddd") +
              "," +
              moment(ratings[0].createdAt).format("MMM") +
              " " +
              moment(ratings[0].createdAt).format("D")}
          </Text>
        </View>
      </View>
    );
  };

  const MyReviews = () => (
    <FlatList
      data={myReviews()}
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom: 50,
      }}
      renderItem={renderItemMyReivew}
      ListEmptyComponent={() => (
        <Text style={styles.emptyMessage}> You have not rated yet!</Text>
      )}
      keyExtractor={(item, index) => index}
    ></FlatList>
  );

  const AllReviews = () => (
    <FlatList
      data={allResturants}
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom: 50,
      }}
      renderItem={renderItemAllReivew}
      ListEmptyComponent={() => (
        <Text style={styles.emptyMessage}>
          {" "}
       No Resturant Available.
        </Text>
      )}
      keyExtractor={(item, index) => index}
    ></FlatList>
  );

  const renderScene = SceneMap({
    MyReviews,
    AllReviews,
  });

  return isLoadingData ? (
    <SkeletonPlaceholder></SkeletonPlaceholder>
  ) : (
    <>
      <View style={styles.HeaderContainer}>
        <Header
          icon={"sort-variant"}
          isNoIcon={true}
          image={auth().currentUser.photoURL}
          iconPress={() => console.log()}
          profileImagePress={() => props.navigation.navigate("Profile")}
        ></Header>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            width: width - 60,
          }}
        >
          {/* <HeaderContent
          content="Your Reviews"
          customStyle={{ marginTop: 10 }}
        ></HeaderContent> */}

          <Text style={{ fontSize: 30, fontWeight: "bold", width: "70%" }}>
            Reviews
          </Text>
          <TouchableOpacity
            // style={{ width: "20%" }}
            onPress={() => props.navigation.navigate("Feedback")}
          >
            <Text style={{ fontWeight: "700" }}>Give a review</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:50}}
          data={myReviews()}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMsg}>
              You have not made any Review on any resturant!
            </Text>
          )}
        ></FlatList>
      </View> */}

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        pressOpacity={0}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
        renderTabBar={(props) => {
          return (
            <TabBar
              pressOpacity={0}
              TouchableOpacity={0}
              pressColor="transparent"
              {...props}
              indicatorStyle={{ backgroundColor: COLORS.primary, height: 3 }}
              style={{ backgroundColor: "transparent", elevation: 0 }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? COLORS.primary : "#000",
                    margin: 8,
                    fontWeight: "bold",
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          );
        }}
      />
    </>
  );
};
export default Review;
