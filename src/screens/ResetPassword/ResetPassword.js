import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Images from '../../constant/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import TextInputField from '../../components/TextInputField/TextInputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActivityIndicator from '../../components/Activityindicator/Activityindicator';
import Button from '../../components/Button/Button';
import {COLORS} from '../../constant/theme';
import Rating from '../../components/Rating/Rating';

import styles from './Styles';

const ResetPassword = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIslaoding] = useState(false);
  const [forchRefresh,setForceRefresh]=useState(1)
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setForceRefresh(forchRefresh+1)
    });
  }, );

  const handleResetPassword = () => {
    if (currentPassword == '' || newPassword == '' || confirmPassword == '') {
      alert('All feilds are mendatory!');
      return;
    }
    if (confirmPassword !== newPassword) {
      alert('Password did not match!');
    } else {
      setIslaoding(true);
      setTimeout(() => {
        setIslaoding(false);
        props.navigation.goBack();
      }, 3000);
    }
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={28}
            onPress={() => props.navigation.goBack()}></Ionicons>
          <Feather
            name="settings"
            size={24}
            onPress={() => props.navigation.navigate('Setting')}>
            {' '}
          </Feather>
        </View>
        <HeaderContent
          content="Feedback"
          customStyle={{marginTop: 20}}></HeaderContent>

        <Image style={styles.image} source={Images.passwordIcon}></Image>
        <View style={styles.contentContainer}>
          <TextInputField
            placeholder="Current Password"
            secureTextEntry={true}
            placeholderTextColor="#000"
            customStyle={{borderColor: COLORS.borderColor}}
            onChangeText={setCurrentPassword}></TextInputField>
          <TextInputField
            placeholder="New Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            customStyle={{borderColor: COLORS.borderColor}}
            onChangeText={setNewPassword}></TextInputField>
          <TextInputField
            placeholder="Confirm New Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            customStyle={{borderColor: COLORS.borderColor}}
            onChangeText={setConfirmPassword}></TextInputField>
          <Button title="Save" onPress={() => handleResetPassword()}></Button>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
export default ResetPassword;
