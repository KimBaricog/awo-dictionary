import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Xbutton from "./Xbotton";

function Settings({
  visible,
  openSetting,
}: {
  visible: boolean;
  openSetting: () => void;
}) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={style.container}>
        <View style={style.main}>
          {/* HEADER */}
          <View style={style.header}>
            <Text style={style.headText}>
              <Text style={{ color: "#7C3AED", fontWeight: "bold" }}>AWO </Text>
              Settings
            </Text>

            <Pressable onPress={openSetting}>
              <Xbutton />
            </Pressable>
          </View>

          {/* LIST */}
          <View style={style.listContainer}>
            <View style={style.list}>
              <Text>Download offline mode</Text>

              <Pressable style={style.downloadBtn}>
                <Text style={style.downloadText}>Download</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000007a",
    justifyContent: "center",
    alignItems: "center",
  },

  main: {
    padding: 20,
    borderRadius: 15,
    width: "90%",
    backgroundColor: "white",
    height: 500,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  listContainer: {
    width: "100%",
    gap: 15,
    marginTop: 20,
  },

  list: {
    backgroundColor: "#b771e56f",
    width: "100%",
    height: 60,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    color: "white",
  },

  downloadBtn: {
    backgroundColor: "#b771e5",
    width: 100,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  downloadText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
});

export default Settings;
