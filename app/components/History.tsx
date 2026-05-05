import { Pressable, StyleSheet, Text, View } from "react-native";
import Blankpage from "./Blankpage";
import Xbutton from "./Xbotton";

type Props = {
  history: string[];
  onDelete: (item: string) => void;
  onSearch: (word: string) => void;
};

function History({ history, onDelete, onSearch }: Props) {
  const isEmpty = history.length === 0;

  // ✅ always show only latest 5
  const limitedHistory = history.slice(0, 5);

  const length = limitedHistory.length;
  return (
    <View style={style.container}>
      <View style={style.head}>
        <Text style={style.text}>History</Text>
      </View>

      <View style={style.main}>
        {isEmpty ? (
          <Blankpage showpage={true} />
        ) : (
          limitedHistory.map((item: string, index: number) => (
            <View key={index} style={styles.historyItem}>
              {/* CLICK TO SEARCH AGAIN */}
              <Pressable
                style={styles.wordContainer}
                onPress={() => onSearch(item)}
              >
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>

              {/* DELETE BUTTON */}
              <Pressable onPress={() => onDelete(item)}>
                <Xbutton />
              </Pressable>
            </View>
          ))
        )}
      </View>

      <Text style={[style.mainText, isEmpty && { display: "none" }]}>
        Tap a history item to search again{"\n"}
        <Text>{length}/5</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#7c3aed1f",
    borderRadius: 5,
  },

  wordContainer: {
    flex: 1,
  },

  historyText: {
    fontSize: 16,
    color: "#111827",
  },
});

const style = StyleSheet.create({
  container: {
    width: "90%",
    margin: 20,
  },

  head: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10,
  },

  main: {
    width: "100%",
    minHeight: 200,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  text: {
    fontSize: 15,
    color: "#7c3aed",
    fontWeight: "bold",
  },

  mainText: {
    color: "gray",
    width: "100%",
    textAlign: "center",
    marginTop: 10,
  },
});

export default History;
