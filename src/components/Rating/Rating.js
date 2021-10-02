import React from 'react';
import {View, Dimensions} from 'react-native';
import StarRating from 'react-native-star-rating';

const Rating = ({rating, isDisable, onPress, size}) => {
  return (
    <StarRating
      disabled={isDisable}
      maxStars={5}
      rating={rating}
      fullStarColor="#FFC107"
      starSize={size}
      selectedStar={rating => onPress(rating)}
      containerStyle={{marginHorizontal: 50, marginVertical: 5}}
    />
  );
};
export default Rating;
