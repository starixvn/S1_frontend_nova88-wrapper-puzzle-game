import { useNavigation } from "@react-navigation/core";
import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  useSafeArea,
} from "native-base";
import React from "react";
import { HEADER_HEIGHT } from "../utilities";
import { space } from "../utilities/rn-helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MENU = [
  {
    label: "Easy",
  },
  {
    label: "Medium",
  },
  {
    label: "Hard",
  },
];

const Home = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      bg={"primary.50"}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <HStack
        style={{
          height: HEADER_HEIGHT + top,
        }}
        bg={"primary.100"}
        width={"100%"}
        alignItems="center"
        justifyContent="center"
        px={space * 0.5}
      ></HStack>
      <Box
        flex={1}
        alignItems={"center"}
        _text={{
          textAlign: "center",
          fontSize: 32,
          color: "primary.200",
          fontFamily: "heading",
          fontWeight: "bold",
          m: 5,
        }}
      >
        Puzzle Games
        <Image
          source={require("../assets/image/puzzle.png")}
          size={"xl"}
          alt={"logo"}
        />
        <Text
          mt={4}
          mb={2}
          fontSize={25}
          fontWeight={"bold"}
          color="primary.200"
        >
          Welcome to the game!
        </Text>
        {MENU.map((i, index) => {
          return (
            <Button
              bg={"primary.200"}
              colorScheme="yellow"
              key={index}
              m={3}
              width="50%"
              _text={{ fontSize: 20, color: "white" }}
              onPress={() =>
                navigation.navigate("SelectImage", { level: i.label })
              }
            >
              {i.label}
            </Button>
          );
        })}
      </Box>
    </ScrollView>
  );
};

export default Home;
