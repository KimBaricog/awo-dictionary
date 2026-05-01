import { Image, StyleSheet, Text, View } from "react-native";
import Owldialog from "./Dialog";
import Gearbtn from "./Gearbtn";
export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <Text style={styles.logoText}>AWO</Text>
          Dictionary
        </Text>
        <View style={{ position: "absolute", right: 20, top: 30 }}>
          <Gearbtn />
        </View>
      </View>

      <View style={styles.awocontainer}>
        <Image
          source={require("../../assets/images/awo.png")}
          style={styles.logo}
        />
        <Owldialog />
        <View style={{ width: 250 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
