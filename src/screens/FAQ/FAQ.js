import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Images from "../../constant/images";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import {AccordionList} from "accordion-collapse-react-native";
import styles from "./Styles";
const list=[
    {
      id:1,
      title: 'Can I present my own menu and restaurant branding?',
      body: 'Get ‘best in class’ online ordering and the ability to inform your customers and site visitors about your food, your menu, your history and your restaurant ambiance. No one does it better'
    },
    {
      id:2,
      title: 'Can I create separate information pages on telling customers about our story, locations, hours, etc.?',
      body: 'Yes. You can display nutrition information, about us pages, contact information and feedback forms to help your customers get the information they need about your food and restaurant'
    },
    {
        id:3,
        title: 'Who owns the data?',
        body: 'You do! All the data on your application is accessible via a Reporting Dashboard that restaurant owners can use to access all customer information including e-mail addresses, past orders, sales behaviour, top buyers, delivery heatmaps and menu data.'
      },
      {
        id:4,
        title: 'Our menu is very diverse, with lots of options. Can I specify menu item modifiers for each product?',
        body: 'Yes. Put your modifiers in any order you want and control the number that can be selected for any item. Simply add a new flavour of bread to all sandwiches with the click of a mouse. In addition, our system provides unlimited modifiers for products and lets you control quantities. Easily set up a three topping pizza or build your own salad while controlling all modifiers for your menu items.'
      }

    ]
const FAQ = (props) => {


   const _head=(item)=>{
        return(
            <View style={styles.headingContainer}>
              <Text style={styles.headingTxt}>{item.id}) {item.title}</Text>
              </View>
        
        );
    }
    
   const  _body=(item)=>{
        return (
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyTxt}> {item.body}</Text>
            </View>
        )
    }
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
      </View>
      {/* <HeaderContent
          content="FAQ"
          customStyle={{ marginTop: 20 }}
        ></HeaderContent> */}
        <Image style={styles.image} source={Images.FAQ}></Image>
        <View style={styles.contentContainer}>
        <AccordionList
            list={list}
            header={_head}
            body={_body}
            keyExtractor={item => `${item.id}`}
          />
            </View>
    </SafeAreaView>
  );
};
export default FAQ;
