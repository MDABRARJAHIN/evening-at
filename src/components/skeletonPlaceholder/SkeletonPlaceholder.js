import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const { height, width } = Dimensions.get("window");

const SkeletonPlaceholders = () => {
  const [arr, setArr] = useState(["1", "2", "3", "4", "5", "6"]);

  const ItemPlaceHolder = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={100}
              height={100}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              flex={1}
              justifyContent={"space-between"}
              marginLeft={12}
            >
              <SkeletonPlaceholder.Item
                width="50%"
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="30%"
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="80%"
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  };

  const HeaderPlaceHolder = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item width={30} height={30} />
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <SafeAreaView style={{ marginTop: 40, width: width - 60, marginLeft: 30 }}>
      <HeaderPlaceHolder />
      {arr.map(() => {
        return <ItemPlaceHolder />;
      })}
    </SafeAreaView>
  );
};
export default SkeletonPlaceholders;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: width,

    paddingHorizontal: 30,
    alignItems: "center",
  },
  itemImage: {
    height: width / 4,
    width: width / 4,
    borderRadius: 20,
  },
  feedbackContainer: {
    flexDirection: "row",
    width: width - width / 5 - 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
