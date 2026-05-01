import { Image, StyleSheet, Text, View } from "react-native";

function Blankpage({ showpage }: { showpage: boolean }) {
  return (
    <View
      style={{ ...style.containerBlank, display: showpage ? "flex" : "none" }}
    >
      <Image
        style={style.logoimg}
        source={require("../../assets/images/mainlogo.png")}
      />
      <Text style={style.text}>No History.</Text>
    </View>
  );
}

const style = StyleSheet.create({
  logoimg: {
    width: 200,
    height: 200,
  },
  containerBlank: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#6B7280",
  },
});
export default Blankpage;
