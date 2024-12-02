import { useNavigation, useRoute } from "@react-navigation/core";
import { Box, Image, ScrollView } from "native-base";
import React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  IMG_1,
  IMG_2,
  IMG_3,
  IMG_4,
  IMG_5,
  IMG_6,
  IMG_7,
  IMG_8,
  IMG_9,
  IMG_10,
  IMG_11,
  IMG_12,
} from "../utilities/image";
import Header from "./components/Header";

const IMG = [
  IMG_1,
  IMG_2,
  IMG_3,
  IMG_4,
  IMG_5,
  IMG_6,
  IMG_7,
  IMG_8,
  IMG_9,
  IMG_10,
  IMG_11,
  IMG_12,
];

const SelectImage = () => {
  const { params } = useRoute();

  const navigation = useNavigation();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const size = width / Math.floor(width / 100) - 5;

  return (
    <ScrollView
      flex={1}
      bg={"primary.50"}
      contentContainerStyle={{
        paddingBottom: bottom,
      }}
    >
      <Header title={"Select Image"} />
      <Box flexDir={"row"} flexWrap={"wrap"} style={{ gap: 5 }}>
        {IMG.map((item, index) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              navigation.navigate("Game", {
                level: params.level,
                img: item,
              });
            }}
          >
            <Image
              source={item}
              size={size}
              alt={index.toLocaleString()}
              resizeMode={"stretch"}
            />
          </TouchableOpacity>
        ))}
      </Box>
    </ScrollView>
  );
};

export default SelectImage;
