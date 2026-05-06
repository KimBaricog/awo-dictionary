import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

export default function ToggleSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // LOAD ONCE
  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("switch_state");

      if (value !== null) {
        setIsEnabled(value === "true");
      }

      setReady(true);
    };

    load();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;

    setIsEnabled(newValue);

    await AsyncStorage.setItem("switch_state", String(newValue));
  };

  // 🚨 IMPORTANT: don't render switch until loaded
  if (!ready) return null;

  return (
    <View style={styles.container}>
      <Switch value={isEnabled} onValueChange={toggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
