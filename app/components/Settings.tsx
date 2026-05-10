import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Alert,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

import Xbutton from "./Xbotton";

interface SettingsProps {
  visible: boolean;
  openSetting: () => void;
  SwitchTheme: (value: boolean) => void;
  theme: boolean;
}

const THEME = {
  dark: {
    bg: "#040f26",
    card: "rgba(249, 194, 255, 0.15)",
    text: "#FFFFFF",
    subtext: "#94a3b8",
  },

  light: {
    bg: "#FFFFFF",
    card: "rgba(183, 113, 229, 0.1)",
    text: "#0f172a",
    subtext: "#64748b",
  },

  accent: "#7C3AED",
};

const SOCIAL_LINKS = [
  {
    id: "github",
    icon: AntDesign,
    name: "github",
    url: "https://github.com/KimBaricog",
    color: "#9CA3AF",
  },

  {
    id: "facebook",
    icon: FontAwesome,
    name: "facebook-square",
    url: "https://www.facebook.com/kim.baricog.2025",
    color: "#9CA3AF",
  },

  {
    id: "gmail",
    icon: FontAwesome,
    name: "google",
    url: "mailto:kimbaricog4@gmail.com",
    color: "#9CA3AF",
  },

  {
    id: "linkedin",
    icon: AntDesign,
    name: "linkedin",
    url: "https://www.linkedin.com/in/kim-baricog-aba590393/",
    color: "#9CA3AF",
  },
];

const Settings = ({
  visible,
  openSetting,
  SwitchTheme,
  theme,
}: SettingsProps) => {
  const activeTheme = theme ? THEME.dark : THEME.light;

  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;

  const handleLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert("Error", "Unable to open link");
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={openSetting}
      animationType="none"
    >
      <View style={styles.overlay}>
        {/* BACKDROP */}
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <Pressable style={styles.backdrop} onPress={openSetting} />
        </Animated.View>

        {/* MODAL */}
        <Animated.View
          entering={SlideInDown.springify()}
          exiting={SlideOutDown.duration(200)}
          style={[
            styles.modalCard,
            {
              backgroundColor: activeTheme.bg,

              width: isTablet ? 550 : "100%",

              maxHeight: height * 0.85,

              paddingHorizontal: width * 0.06,
            },
          ]}
        >
          <SafeAreaView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            >
              {/* HANDLE */}
              <View style={styles.handle} />

              {/* HEADER */}
              <View style={styles.header}>
                <Animated.View entering={FadeIn.delay(100)}>
                  <Text
                    style={[
                      styles.brandText,
                      {
                        color: activeTheme.text,

                        fontSize: isTablet ? 30 : 24,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: THEME.accent,
                      }}
                    >
                      AWO
                    </Text>{" "}
                    Dictionary
                  </Text>

                  <Text
                    style={[
                      styles.subHeaderText,
                      {
                        color: activeTheme.subtext,
                      },
                    ]}
                  >
                    Preferences
                  </Text>
                </Animated.View>

                <Pressable
                  onPress={openSetting}
                  hitSlop={15}
                  style={styles.closePressable}
                >
                  <Xbutton />
                </Pressable>
              </View>

              {/* SETTINGS */}
              <View style={styles.section}>
                {/* DARK MODE */}
                <Animated.View
                  entering={FadeIn.delay(200)}
                  layout={Layout.springify()}
                >
                  <View
                    style={[
                      styles.listRow,
                      {
                        backgroundColor: activeTheme.card,

                        minHeight: isTablet ? 75 : 65,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.listText,
                        {
                          color: activeTheme.text,

                          fontSize: isTablet ? 18 : 16,
                        },
                      ]}
                    >
                      Dark Mode
                    </Text>

                    <Switch
                      value={theme}
                      onValueChange={SwitchTheme}
                      trackColor={{
                        false: "#cbd5e1",
                        true: THEME.accent,
                      }}
                    />
                  </View>
                </Animated.View>

                {/* OFFLINE */}
                <Animated.View
                  entering={FadeIn.delay(300)}
                  layout={Layout.springify()}
                >
                  <View
                    style={[
                      styles.listRow,
                      {
                        backgroundColor: activeTheme.card,

                        minHeight: isTablet ? 75 : 65,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.listText,
                        {
                          color: activeTheme.text,

                          fontSize: isTablet ? 18 : 16,
                        },
                      ]}
                    >
                      Offline Downloads
                    </Text>

                    <Pressable
                      style={styles.statusBadge}
                      onPress={() =>
                        Alert.alert(
                          "Coming Soon",
                          "Offline mode is currently unavailable.",
                        )
                      }
                    >
                      <Text style={styles.statusText}>NOT AVAILABLE</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              </View>

              {/* FOOTER */}
              <Animated.View entering={FadeIn.delay(400)} style={styles.footer}>
                <Text
                  style={[
                    styles.footerTitle,
                    {
                      color: activeTheme.text,

                      fontSize: isTablet ? 18 : 15,
                    },
                  ]}
                >
                  Support Developer
                </Text>

                <View
                  style={[
                    styles.socialRow,
                    {
                      gap: isTablet ? 24 : 16,
                    },
                  ]}
                >
                  {SOCIAL_LINKS.map((link, index) => (
                    <Animated.View
                      key={link.id}
                      entering={FadeIn.delay(500 + index * 60)}
                    >
                      <Pressable
                        onPress={() => handleLink(link.url)}
                        style={({ pressed }) => [
                          styles.iconCircle,
                          {
                            opacity: pressed ? 0.5 : 1,

                            transform: [
                              {
                                scale: pressed ? 0.9 : 1,
                              },
                            ],

                            width: isTablet ? 54 : 44,

                            height: isTablet ? 54 : 44,

                            borderRadius: isTablet ? 27 : 22,
                          },
                        ]}
                      >
                        <link.icon
                          name={link.name as any}
                          size={isTablet ? 24 : 18}
                          color={link.color}
                        />
                      </Pressable>
                    </Animated.View>
                  ))}
                </View>

                <Text
                  style={[
                    styles.versionText,
                    {
                      color: activeTheme.subtext,
                    },
                  ]}
                >
                  Version 1.1.4
                </Text>
              </Animated.View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  modalCard: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

    paddingTop: 14,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },

      android: {
        elevation: 25,
      },
    }),
  },

  handle: {
    width: 45,
    height: 5,
    borderRadius: 20,
    backgroundColor: "rgba(150,150,150,0.25)",
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },

  brandText: {
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  subHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },

  section: {
    gap: 14,
  },

  listRow: {
    borderRadius: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,
  },

  listText: {
    fontWeight: "600",
  },

  statusBadge: {
    backgroundColor: "#475569",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 10,
  },

  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerTitle: {
    fontWeight: "700",
    marginBottom: 20,
  },

  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  iconCircle: {
    backgroundColor: "rgba(124, 58, 237, 0.08)",

    justifyContent: "center",
    alignItems: "center",
  },

  versionText: {
    marginTop: 24,
    fontSize: 11,
    opacity: 0.8,
    letterSpacing: 1,
  },

  closePressable: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
});

export default Settings;
