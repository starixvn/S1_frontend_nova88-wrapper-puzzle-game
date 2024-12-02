import { useNavigation } from "@react-navigation/native";
import { Image } from "native-base";
import React, { useEffect } from "react";
import { View } from "react-native";
import { getScaledSize } from "../../utilities/rn-helper";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0a1a39",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/image/puzzle.jpg")}
        height={getScaledSize(150)}
        width={getScaledSize(150)}
        alt={"splash"}
      />
    </View>
  );
};

export default SplashScreen;
