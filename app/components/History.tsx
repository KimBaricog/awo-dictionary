import { Pressable, StyleSheet, Text, View } from "react-native";
import Blankpage from "./Blankpage";
import Xbutton from "./Xbotton";

type Props = {
  history: string[];
  onDelete: (item: string) => void;
};

function History({ history, onDelete }: Props) {
  const isEmpty = history.length === 0;

  return (
    <View style={style.container}>
      <View style={style.head}>
        <Text style={style.text}>History</Text>
      </View>

      <View style={style.main}>
        {isEmpty ? (
          <Blankpage showpage={true} />
        ) : (
          history.map((item: string, index: number) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{item}</Text>

              <Pressable onPress={() => onDelete(item)}>
                <Xbutton />
              </Pressable>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  historyText: {
    fontSize: 16,
    color: "#111827",
  },

  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
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
});

export default History;
