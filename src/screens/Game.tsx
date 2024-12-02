import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import _ from "lodash";
import { Box, Button, Image, ScrollView, Text } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { PicturePuzzle, PuzzlePieces } from "react-native-picture-puzzle";
import Header from "./components/Header";
import SuccessModal from "./components/SuccessModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const Game = () => {
  const { width, height } = Dimensions.get("window");
  const minWidth = Math.min(height, width, 400);

  const { params } = useRoute();
  const getLevel = () => {
    let level = 9;
    if (params.level === "Easy") {
      level = 9;
    } else if (params.level === "Medium") {
      level = 16;
    } else {
      level = 25;
    }
    return level;
  };

  const num = getLevel();

  const originalPieces = useMemo<PuzzlePieces>(
    () => [...Array(num)].map((_, i) => i),
    []
  );

  const shuffledPieces = useMemo<PuzzlePieces>(() => {
    const p = [...originalPieces];
    shuffle(p);
    return p;
  }, [originalPieces]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(`${params.level}`);
      if (value) {
        setScore(parseInt(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(`${params.level}`, value.toLocaleString());
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [hidden, setHidden] = useState<number | null>(8);
  const [pieces, setPieces] = useState<PuzzlePieces>(shuffledPieces);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  const renderLoading = useCallback(
    (): JSX.Element => <ActivityIndicator />,
    []
  );

  const onChange = useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      if (_.isEqual(nextPieces, originalPieces)) {
        setPieces(originalPieces);
        setHidden(null);
        setTimeout(() => {
          setVisible(true);
        }, 500);
        if (count < score || score === 0) {
          storeData(count + 1);
          setScore(count + 1);
        }
      } else {
        setPieces([...nextPieces]);
        setHidden(nextHidden);
      }
      setCount(count + 1);
    },
    [setPieces, setHidden, count]
  );

  const retry = useCallback(() => {
    setPieces(shuffledPieces);
    setHidden(8);
    setCount(0);
    setVisible(false);
  }, [setPieces, shuffledPieces]);

  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      flex={1}
      bg={"primary.50"}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <Header title="Game" />
      <Box m={3} mt={8} flexDirection={"row"} justifyContent={"space-around"}>
        <Image
          source={params.img}
          size={"xl"}
          alt={params.img.toLocaleString()}
          resizeMode={"stretch"}
        />
        <Box justifyContent={"space-between"}>
          <Box
            alignItems={"center"}
            borderWidth={1}
            px={5}
            py={2.5}
            borderColor={"primary.100"}
          >
            <Text color={"primary.100"} fontWeight={"bold"}>
              MOVED
            </Text>
            <Text color={"primary.100"} fontWeight={"bold"}>
              Best: {score !== 0 ? score : "-"}
            </Text>
            <Text color={"primary.100"} fontWeight={"bold"}>
              {count}
            </Text>
          </Box>
          <Button
            bg={"primary.200"}
            colorScheme="yellow"
            _text={{ fontSize: 15, color: "white" }}
            onPress={() => retry()}
          >
            Restart
          </Button>
        </Box>
      </Box>
      <Box alignSelf={"center"}>
        <PicturePuzzle
          size={minWidth}
          pieces={pieces}
          hidden={hidden}
          onChange={onChange}
          source={params.img}
          renderLoading={renderLoading}
          style={{ marginTop: 20, flex: 1 }}
        />
      </Box>
      <SuccessModal
        isShow={visible}
        restart={(e) => {
          if (e) {
            retry();
          }
        }}
      />
    </ScrollView>
  );
};

export default Game;
