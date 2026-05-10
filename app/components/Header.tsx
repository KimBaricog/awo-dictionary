import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Owldialog from "./Dialog";
import Gearbtn from "./Gearbtn";

export default function Header({
  theme,
  openSettings,
}: {
  theme: boolean;
  openSettings: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            {
              color: theme ? "white" : "black",
            },
          ]}
        >
          <Text style={{ color: "#7C3AED" }}>AWO</Text>
          Dictionary
        </Text>

        <View style={styles.gearContainer}>
          <Pressable onPress={openSettings}>
            <Gearbtn theme={theme} />
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.awocontainer,
          {
            backgroundColor: theme ? "#4b2c69" : "#d8c4f0",
          },
        ]}
      >
        <Image
          source={require("../../assets/images/awo.png")}
          style={styles.logo}
        />

        <Owldialog />

        <View style={{ width: 250 }} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  gearContainer: {
    position: "absolute",
    right: 20,
    top: 30,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 10,
  },
  logo: {
    width: 130,
    height: 160,
    position: "absolute",

    top: -30,
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 50,
    paddingTop: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  logoText: { color: "#7C3AED", fontWeight: "bold" },
  subtitle: {
    fontSize: 12,
    color: "#687076",
    fontWeight: "100",
    fontFamily: "sans-serif",
  },
  awocontainer: {
    backgroundColor: "#4b2c69",
    height: 130,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
