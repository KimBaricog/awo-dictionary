import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import Blankpage from "./Blankpage";
import Xbutton from "./Xbotton";

type Props = {
  history: string[];
  onDelete: (item: string) => void;
  onSearch: (word: string) => void;
  theme: boolean;
};

function History({ history, onDelete, onSearch, theme }: Props) {
  const limitedHistory = history.slice(0, 5);
  const isEmpty = limitedHistory.length === 0;

  const colors = {
    text: theme ? "#c084fc" : "#7c3aed",
    bg: theme ? "#1b2a41" : "#ffffff",
    item: theme ? "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.08)",
    word: theme ? "#ffffff" : "#1f2937",
    sub: theme ? "#9ca3af" : "#6b7280",
    border: theme ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
  };

  return (
    <View style={styles.container}>
      {/* Header with Icon */}
      <View style={styles.head}>
        <MaterialCommunityIcons name="history" size={18} color={colors.text} />
        <Text style={[styles.headTitle, { color: colors.text }]}>
          Recent History
        </Text>
      </View>

      {/* Main List Container */}
      <View style={[styles.mainCard, { backgroundColor: colors.bg }]}>
        {isEmpty ? (
          <Blankpage showpage={true} />
        ) : (
          limitedHistory.map((item, index) => (
            <Animated.View
              key={`${item}-${index}`}
              entering={FadeInLeft.delay(index * 100)}
              exiting={FadeOutRight}
              layout={Layout.springify()}
              style={[
                styles.historyItem,
                { backgroundColor: colors.item, borderColor: colors.border },
              ]}
            >
              <Pressable
                style={styles.wordContainer}
                onPress={() => onSearch(item)}
                android_ripple={{ color: colors.text }}
              >
                <Text style={[styles.historyText, { color: colors.word }]}>
                  {item}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onDelete(item)}
                hitSlop={10}
                style={styles.deleteBtn}
              >
                <Xbutton />
              </Pressable>
            </Animated.View>
          ))
        )}
      </View>

      {/* Footer Info */}
      {!isEmpty && (
        <View style={styles.footer}>
          <Text style={[styles.footerHint, { color: colors.sub }]}>
            Tap to search again
          </Text>
          <View style={[styles.counter, { backgroundColor: colors.item }]}>
            <Text style={[styles.counterText, { color: colors.text }]}>
              {limitedHistory.length}/5
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    alignSelf: "center",
    marginVertical: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingLeft: 4,
  },
  headTitle: {
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  mainCard: {
    width: "100%",
    minHeight: 180,
    borderRadius: 24,
    padding: 12,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 3,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden", // Ensures ripple stays inside
  },
  wordContainer: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  historyText: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteBtn: {
    paddingRight: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 8,
  },
  footerHint: {
    fontSize: 12,
    fontStyle: "italic",
  },
  counter: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default History;
