import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Xbutton from "./Xbotton";

const images = {
  notaword: require("../../assets/images/mainlogo.png"),
  nowifi: require("../../assets/images/nowifi.png"),
};

type ImageKey = keyof typeof images;

export default function Error({
  text,
  Message,
  imageselect,
  onClose,
}: {
  text: string;
  Message: string;
  imageselect: ImageKey;
  onClose: () => void;
}) {
  if (!onClose) return null;

  return (
    <View style={style.container}>
      <View style={style.exitbtn}>
        <Pressable onPress={onClose}>
          <Xbutton />
        </Pressable>
      </View>

      <Image style={style.img} source={images[imageselect]} />
      <Text style={style.headtext}>{text}</Text>
      <Text style={style.maintext}>{Message}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  exitbtn: {
    width: "100%",
    height: 100,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 50,
  },
  container: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
  },
  headtext: {
    color: "#ff0000aa",
    fontWeight: 600,
    fontSize: 20,
  },
  maintext: {
    color: "gray",
    fontWeight: 400,
  },
});
