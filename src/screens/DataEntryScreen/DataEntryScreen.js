import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import RenderHTML from "react-native-render-html";

const html = `



  <div>
            <h1 style="font-size: 28px">Lorem ipsum?</h1>
            <div class="" style="display: flex; width: 100%">
              <p style="text-align: justify; font-weight: 400; width: 90%">
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <div class="img" style="width: 90%">
                <img
                  src="https://www.freepnglogos.com/uploads/man-png/man-your-company-formations-formation-registrations-10.png"
                  alt=""
                />
              </div>
              <br />
              <h1 style="font-size: 28px">The outfit Formoula</h1>
              <p style="text-align: justify; font-weight: 400; width: 90%">
                Buzzy outfit formulas and of the moment pieces are perfect for
                trendsetters looking to make a splash. Right Now
              </p>
              <h1 style="font-size: 28px">Lorem Ipsum</h1>
              <p style="text-align: justify; font-weight: 400; width: 90%">
              Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated.
              </p>
            </div>

           
          </div>
 
`;

const DataEntryScreen = () => {
  const SaveData = async () => {
    // let pushKey = database().ref("ResturantsTest2").push().key;
    // console.log(pushKey);
    let key = database()
      .ref("Resturants")
      .push({
        resImage:
          "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=400",
        resName: "Heirloom Cafe.",
        resCity: "Manchester",
        resPricePerHead: "100",
        resContact: {
          address: "2118 Thornridge Cir. Syracuse, London 35624",
          call: "(702) 555-0122",
          email: "cafenirvan@gmail.com",
        },
        ratings: "",
        resDescription:
          "Bar - Bistro' 'Le Café' '. An attractive store with delicious food, local beers and good wine. ",
      }).key;
    database().ref("Resturants").child(key).update({ resId: key });
  };
  // this is function to insert resturant
  const insertRes = () => {
    let key = database()
      .ref("Resturants")
      .push({
        resImage:
          "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=400",
        resName: "Heirloom Cafe.",
        resCity: "Manchester",
        resPricePerHead: "100",
        resContact: {
          address: "2118 Thornridge Cir. Syracuse, London 35624",
          call: "(702) 555-0122",
          email: "cafenirvan@gmail.com",
        },
        resDetail: {
          startTime: "9.00 PM",
          seats: "8",
        },
        ratings: "",
        resDescription:
          "Bar - Bistro' 'Le Café' '. An attractive store with delicious food, local beers and good wine. ",
      }).key;
    database().ref("Resturants").child(key).update({ resId: key });
  };

  const insertOffers = () => {
    database()
      .ref("Resturants")
      .child("-MiC48d-aHfelNBiXXlv") //ID of resturant
      .child("Offers")
      .push("banana cake"); // only change this one and push offer in specific resturant
  };

  ///create a event in resturant
  const createEvents = async () => {
    let timeSlotsData = [
      "05:00 pm",
      "07:00 pm",
      "08:00 pm",
      "09:00 pm",
      "10:00 pm",
    ];
    let seatsAvailableData = ["1 - 2", "3 - 6", "7 - 11", "12 - 14"];

    let key = await database()
      .ref("Resturants")
      .child("-MiC48d-aHfelNBiXXlv") //ID of resturant
      .child("Events")
      .push({
        day: "2021-09-05T07:00:00.000Z",
      }).key;
    //insert Time slots
    timeSlotsData.forEach((data) => {
      database()
        .ref("Resturants")
        .child("-MiC48d-aHfelNBiXXlv") //ID of resturant
        .child("Events")
        .child(key)
        .child("TimeSlots")
        .push({
          time: data,
          isSelected: false,
        });
    });

    //insert SEATS AVAILABLE
    seatsAvailableData.forEach((data) => {
      database()
        .ref("Resturants")
        .child("-MiC48d-aHfelNBiXXlv") //ID of resturant
        .child("Events")
        .child(key)
        .child("AvailableSeates")
        .push({
          time: data,
          isSelected: false,
        });
    });
  };

  const insertDetail = () => {};

  const insertTripsAndTricks = () => {
    database().ref("TripsAndTricks").push({
      title: "Secret of success in social gatherings?",
      image:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      description:
        "https://www.freepnglogos.com/uploads/man-png/man-your-company-formations-formation-registrations-10.png",
      content: html,
    });
  };

  const toShowHTML = () => {
    database()
      .ref("TripsAndTricks")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("data ", Object.values(snapshot.val())[0]);
        }
      });
  };

  const insertQuestions = () => {
    database().ref("Questions").push({
      question: "What was your favourite class in school?",
    });
  };

  return (
    <View style={{ marginTop: 150, marginLeft: 50 }}>
      <TouchableOpacity
        onPress={() => insertTripsAndTricks()}
        style={{
          backgroundColor: "blue",
          width: 200,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>

      {/* <RenderHTML contentWidth={300} source={{ html }} /> */}
    </View>
  );
};
export default DataEntryScreen;

// resImage:
//           "https://www.logogrand.com/news/wp-content/uploads/2020/03/rest.jpg'",
//         resName: "Le Café Nirvan",
//         resCity: "Manchester",
//         resRating: {
//           UserId: [
//             {
//               id: "1",
//               rating: "3",
//               content: " this is my favorite resturant",
//               createAt: new Date().toISOString(),
//             },
//           ],
//         },
//         resPricePerHead: "220",
//         favoritBy: ["1", "2", "3"],
//         resDescription:
//           "Bar - Bistro' 'Le Café' '. An attractive store with delicious food, local beers and good wine. ",
//         resOffers: [
//           "Soup",
//           "Main Dish",
//           "Tenderloin with mushroom",
//           "dessert",
//           "banana cake",
//         ],
//         resDetail: {
//           time: "evening starts at 9.00 8 seats",
//           seats: "8",
//         },
//         resContact: {
//           address: "2118 Thornridge Cir. Syracuse, London 35624",
//           call: "(702) 555-0122",
//           email: "cafenirvan@gmail.com",
//         },
//         resAvailable: [
//           {
//             "05-09-2021": {
//               time: ["03:00PM", "05:00AM"],
//               seats: ["1-2", "3-4", "6-7"],
//             },
//           },
//         ],
//       });
