import { Image, NativeBaseProvider, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import branch from "react-native-branch";
import codePush from "react-native-code-push";
import Icon from "react-native-vector-icons/MaterialIcons";
import RootNavigator from "./src/navigators";
import ProgressBar from "./src/screens/components/ProgressBar";
import { getScaledSize, space } from "./src/utilities/rn-helper";
import theme from "./theme";
import * as ScreenOrientation from "expo-screen-orientation";

Icon.loadFont();
ScreenOrientation.unlockAsync();

const App = () => {
  const [progress, setProgress] = useState(0);

  function onDownloadProgress({ totalBytes, receivedBytes }) {
    setProgress(receivedBytes / totalBytes);
  }
  const percentage = Math.floor(progress * 100);

  const initCodePushSync = () => {
    async function syncStatus() {
      const stats = await codePush.sync(
        {
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        (status) => {
          if (status === codePush.SyncStatus.UNKNOWN_ERROR) {
            console.log("unknow_error");
          }
          console.log("syncStatus", status);
        },
        onDownloadProgress
      );

      const availableUpdate = await codePush.checkForUpdate();
      if (availableUpdate) {
        const downloadedPackage = await availableUpdate.download(
          onDownloadProgress
        );
        downloadedPackage.install(codePush.InstallMode.IMMEDIATE);
      } else if (stats === codePush.SyncStatus.UPDATE_INSTALLED) {
        codePush.restartApp();
      }
    }

    try {
      syncStatus();
    } catch (e) {
      console.error("sync status failed", e);
    }
  };

  useEffect(() => {
    branch.subscribe(({ error, params, uri }) => {
      if (params && params.isGame === "true") {
        async function check() {
          const checkAvailable = await codePush.checkForUpdate();
          if (checkAvailable) {
            initCodePushSync();
          }
        }
        try {
          check();
        } catch (e) {
          console.log("sync status failed", e);
        }
      }
      if (error) {
        console.error("Error from Branch: " + error);
        return;
      }
    });
  }, []);

  if (progress !== 0) {
    return (
      <NativeBaseProvider theme={theme}>
        <CodePushProgress percentage={percentage} progress={progress} />
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor={"#eab308"} />
        <RootNavigator />
      </NativeBaseProvider>
    );
  }
};

// export default App;
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
export default codePush(codePushOptions)(App);

const CodePushProgress = ({ percentage, progress }) => {
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
        source={require("./src/assets/image/puzzle.png")}
        height={getScaledSize(98)}
        width={getScaledSize(98)}
        alt={"splash"}
      />
      <View style={styles.root}>
        <Text
          size={10}
          style={{
            marginBottom: space,
            width: "100%",
            textAlign: "center",
          }}
        >{`Loading App (${percentage}%)`}</Text>
        <View style={{ flexDirection: "row", marginHorizontal: space * 8 }}>
          <ProgressBar progress={progress} bgColor={"rgb(248,215,146)"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { position: "absolute", bottom: space * 20, width: "100%" },
  imageBackground: {
    resizeMode: "stretch",
  },
  shadowButton: {
    position: "absolute",
    bottom: 110,
    right: 0,
    zIndex: 999,
    elevation: 999,
  },
  restartButton: {
    bottom: 0,
    right: 11,
    zIndex: 999,
    elevation: 999,
    padding: 3,
    borderWidth: 1.5,
    borderColor: "#FFE9A8",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 30,
  },
});
