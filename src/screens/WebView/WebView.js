import React, { useEffect,useState,} from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import Images from "../../constant/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WebView } from 'react-native-webview';
import ActivityIndicator from "../../components/Activityindicator/Activityindicator";
import styles from "./styles";
const WebViewScreen = (props) => {
  const [isLoading,setIsLoading]=useState(false)
  useState(()=>{
setIsLoading(true)
  },[props.route.params.link ])
    return(
        <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
        ></Ionicons>
      </View>
      {
        isLoading&&<ActivityIndicator/>
      }

      <WebView 
      onLoadEnd={()=>setIsLoading(false)}
      source={{ uri: props.route.params.link }} 
       style={styles.container}
      />
      
    </SafeAreaView>
    )
}
export default WebViewScreen