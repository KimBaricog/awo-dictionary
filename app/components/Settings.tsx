import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import Xbutton from "./Xbotton";

function Settings({
  visible,
  openSetting,
}: {
  visible: boolean;
  openSetting: () => void;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ready, setReady] = useState(false);

  // LOAD SAVED VALUE
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("dark_mode");

      if (saved !== null) {
        setIsDarkMode(saved === "true");
      }

      setReady(true);
    };

    load();
  }, []);

  // SAVE WHEN CHANGED
  const toggleTheme = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem("dark_mode", String(value));
  };

  if (!ready) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={style.container}>
        <View
          style={[style.main, isDarkMode && { backgroundColor: "#040f26" }]}
        >
          {/* HEADER */}
          <View style={style.header}>
            <Text style={[style.headText, isDarkMode && { color: "white" }]}>
              <Text style={{ color: "#7C3AED", fontWeight: "bold" }}>AWO </Text>
              Settings
            </Text>

            <Pressable onPress={openSetting}>
              <Xbutton />
            </Pressable>
          </View>

          {/* LIST */}
          <View style={style.listContainer}>
            <View
              style={[
                style.list,
                isDarkMode && { backgroundColor: "#f9c2ff9b" },
              ]}
            >
              <Text>Switch Theme</Text>

              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>

            <View
              style={[
                style.list,
                isDarkMode && { backgroundColor: "#f9c2ff9b" },
              ]}
            >
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
    backgroundColor: "#459d57",
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
