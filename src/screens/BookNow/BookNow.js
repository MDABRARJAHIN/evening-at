import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {
  DateSelectionCalendar,
  DefaultTheme,
  Theme,
} from "react-native-easy-calendar";
import images from "../../constant/images";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CalendarPicker from "react-native-calendar-picker";
import SkeletonPlaceholder from "../../components/skeletonPlaceholder/SkeletonPlaceholder";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import moment from 'moment'

import styles from "./Styles";
import { COLORS } from "../../constant/theme";
const {height,width}=Dimensions.get('window')
const BookNow = (props) => {
  const databaseRef = database().ref("Resturants");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { resturantDetail, ratingCount, totalUsersForFeedback } =
    props.route.params;

  const [bookingDetail, setBookingDetail] = useState({
    timeSlots: ["09:00 pm", "10:30 pm ", "08:00 pm", "10:00 pm", "11:00 pm"],
    seatsAvailable: ["1 - 3", "4 - 7", "8 - 12", "13 - 20"],
  });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");
  const [selectTimeSlot, setSelectTimeSlot] = useState("");
  const [selectseat, setSelectedSeats] = useState("");
  const [availableSeatsByDate, setAvailaSeatsByDate] = useState([]);
  const [availableTimeSlotsByDate, setAvailablTimeSlotsByDate] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [customDatesStyle, setCustomDatesStyle] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [hasEvents, setHasEvents] = useState(false);
  const [disableDates, setDisableDates] = useState([
    "2021-09-01T07:00:00.000Z",
    "2021-09-22T07:00:00.000Z",
    "2021-09-26T07:00:00.000Z",
    "2021-09-05T07:00:00.000Z",
    "2021-09-10T07:00:00.000Z",
  ]);
  const [timeSlotsWithSeats,setTimeSlotsWithSeats]=useState([])
  const [availableSeatsByTime,setAvailableSeatsBtTime]=useState([])

  useEffect(() => {
    setIsLoadingData(true);
    //customDateStyles();
    loadEvents();
    onDateSelection(new Date())
  }, []);
  const Alert = (msg) => {
    setErroMsg(msg);
    setIsError(true);
  };
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const loadEvents = () => {
    databaseRef
      .child(resturantDetail.resId)
      .child("Events")
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log(Object.values(snapshot.val()).length);
          setAvailableDays(Object.values(snapshot.val()));

          console.log(" available dates ",snapshot.val())
          customDateStyles(snapshot.val());
          setHasEvents(false);
        } else {
          setHasEvents(false);
        }
      });
  };

  const customDateStyles = (data) => {
    let customDatesStyles = [];
    let availabledays = Object.values(data);
    for (let i = 0; i < availabledays.length; i++) {
      console.log("Days ", availabledays[i].day);
      customDatesStyles.push({
        date: availabledays[i].day,
        style: {
          backgroundColor: COLORS.primary,
          // Object.values(availabledays[i].TimeSlots).filter(
          //   (data) => data.isSelected === false
          // ).length == 0
          //   ? "red"
          //   : COLORS.primary,
        },
      });
    }
    // data.isSelected === false
    //     ).length

    setCustomDatesStyle([...customDatesStyles]);
  };

  const onDateSelection = (date, type) => {
    setAvailableSeatsBtTime([])
    setSelectTimeSlot("");
    setSelectedSeats("");
    setSelectedDate(date.toISOString());
    for (let i = 0; i < availableDays.length; i++) {

      let date1=moment(availableDays[i].day).format('YYYY-MM-DD')
      let date2=moment(date.toISOString()).format('YYYY-MM-DD')
  
   console.log(availableDays[i].day,"/",date.toISOString())
      if (date1 == date2) {
        // console.log("yes  "+i,Object.values( availableDays[i].TimeSlots).length);
setTimeSlotsWithSeats(Object.values( availableDays[i].TimeSlots))

// setAvailablTimeSlotsByDate(Object.values())
       for(let j=0;j<Object.values( availableDays[i].TimeSlots).length;j++)
      {
        console.log("check1 "+j, Object.values( availableDays[i].TimeSlots)[j])
      }


        // setAvailaSeatsByDate(availableDays[i].AvailableSeates);
        // setAvailablTimeSlotsByDate(availableDays[i].TimeSlots);
        return;
      } else {
        console.log("else");
        setTimeSlotsWithSeats([]);
        // setAvailaSeatsByDate([]);
      }
    }

    // alert(availableDays[0].day);
    // // console.log(availableDays.filter((data) => data.day));
    // console.log(availableDays.find((data) => data.day == date));
  };

  const confirmOrder = () => {
    if (selectTimeSlot !== "" && selectseat !== "") {
      props.navigation.navigate("Payment", {
        selectedDate: selectedDate,
        selectedTimeSlot: selectTimeSlot,
        selectedSeat: selectseat,
        resturantDetail,
        ratingCount,
        totalUsersForFeedback,
      });
    } else Alert("Kindly Select time slot and available seats");
  };

  const onSelectTimeSlot=(item)=>{
    setAvailableSeatsBtTime([])
    setSelectTimeSlot(item.Time)
    setAvailableSeatsBtTime(Object.values(item.AvailableSeates))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        image={auth().currentUser.photoURL}
        content="Bookings"
        iconPress={() => props.navigation.goBack()}
        profileImagePress={() => props.navigation.navigate("Profile")}
      ></Header>
      <CustomAlert
        isModalVisible={isError}
        image={images.errorIcon}
        text={errorMsg}
        onHide={setIsError}
      ></CustomAlert>

      <Text style={styles.heading}>Date</Text>
      {/* <DateSelectionCalendar
            // theme={CustomTheme}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          /> */}
      <View style={styles.calenderContainer}>
        <CalendarPicker
        // height={height/1.6}
        width={width}
          customDatesStyles={customDatesStyle}
          onDateChange={onDateSelection}
          minDate={new Date()}
          disabledDates={disableDates}
          selectedDayColor={"#ADD8E6"} 
          onMonthChange={() => {
            setAvailablTimeSlotsByDate([]);
            setAvailaSeatsByDate([]);
            // setAvailableSeatsBtTime([])
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          
          contentContainerStyle={{ paddingBottom: height/4 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Seats Available at</Text>
          <FlatList
            style={styles.flatlist}
            data={
              timeSlotsWithSeats
              // setTimeSlotsWithSeats !== []
              //   ? timeSlotsWithSeats
              //   : []
            }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={[styles.seatAvaiable, styles.activeSeat]}>
                <Text>No timeslot available</Text>
              </View>
            )}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.timeSlot,
                  selectTimeSlot == item.Time && styles.activeTimeSlot,
                  item.isSelected && styles.alreadySelected,
                ]}
                disabled={item.isSelected}
                onPress={() => onSelectTimeSlot(item)}
              >
                <Text style={styles.timeSlotTxt}>{item.Time}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />

          <Text style={styles.heading}>Number of people</Text>
          <FlatList
            style={styles.flatlist}
            data={
              setTimeSlotsWithSeats !== []
                ? availableSeatsByTime
                : []
              // availableSeatsByTime
            }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={[styles.seatAvaiable, styles.activeSeat]}>
                <Text>Please Select Time Slot first</Text>
              </View>
            )}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.seatAvaiable,
                  selectseat == (item.minSeats+" - "+item.maxSeats)&& styles.activeSeat,
                  item.isSelected && styles.alreadySelected,
                ]}
                onPress={() => setSelectedSeats(item.minSeats+" - "+item.maxSeats)}
                disabled={item.isSelected}
              >
                <Text style={styles.seatAvaibleTxt}>{item.minSeats} - {item.maxSeats}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
          <Button
            customStyle={styles.btn}
            title={"Deposit: $" + resturantDetail.resPricePerHead}
            onPress={() => confirmOrder()}
          ></Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default BookNow;
