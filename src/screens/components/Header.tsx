import { useNavigation } from "@react-navigation/core";
import { Box, Button, HStack, Text } from "native-base";
import React, { FC } from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HEADER_HEIGHT } from "../../utilities";
import { space } from "../../utilities/rn-helper";

interface HeaderProperty {
  title: string;
}

const Header: FC<HeaderProperty> = ({ title }) => {
  const navigation = useNavigation();
  const isAnroid = Platform.OS === "android";
  const isIpad = Platform.isPad;

  return (
    <Box>
      <HStack
        style={
          {
            // height: HEADER_HEIGHT,
          }
        }
        bg={"primary.100"}
        width={"100%"}
        alignItems="center"
        justifyContent="space-around"
        flexDirection="row"
        px={space * 0.5}
        safeAreaTop
      >
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          flex={0}
          _text={{ color: "primary.300" }}
          leftIcon={
            <Icon name="arrow-back" size={27} style={{ color: "#92400e" }} />
          }
          backgroundColor={"transparent"}
          colorScheme="yellow"
        ></Button>
        <Text
          flex={1}
          textAlign="center"
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={"primary.300"}
        >
          {title}
        </Text>
        <Box flex={0.22} />
      </HStack>
      <Box flex={1} bg={"primary.50"}></Box>
    </Box>
  );
};

export default Header;
