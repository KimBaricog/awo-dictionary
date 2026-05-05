import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  loading: boolean;
  showpage: boolean;
  onSearch: (text?: string) => void;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onSearch,
  loading,
  showpage,
}) => {
  return (
    <View style={styles.searchcon}>
      <TextInput
        placeholder="Enter word..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        maxLength={50}
      />
      <Pressable style={styles.button} onPress={() => onSearch(value)}>
        <Text style={styles.buttonText}>
          {loading ? "Searching..." : "Search"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: "65%",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#b771e5",
    padding: 10,
    borderRadius: 8,
    width: "33%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  searchcon: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
});

export default SearchBar;
