import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Audio } from "expo-av";
import Headers from "../components/Header";
import History from "../components/History";
import Pausebtn from "../components/Pausebtn";
import Playbtn from "../components/Playbtn";
import SearchBar from "../components/Searchbar";
import Xbotton from "../components/Xbotton";

interface Phonetic {
  text?: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordData {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}

export default function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState("Play");

  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showPage, setShowpage] = useState(true);

  const [history, setHistory] = useState<string[]>([]);
  const [hideHistorypage, setHideHistory] = useState(false);

  const showthepage = () => {
    setShowpage((prev) => !prev);
  };

  const closeBotton = () => {
    setIsOpen(false);
    setData(null);

    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    setWord("");
    showthepage();
    setHideHistory(false);
  };
  //SAVED HISTORY IN ASYNC STORAGE
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem("history");

        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (err) {
        console.log("Error loading history:", err);
      }
    };

    loadHistory();
  }, []);

  //HIDE HISTORY PAGE IF SEARCHING WORD
  const hideHistory = () => {
    setHideHistory(true);
  };
  //SAVED WORDS IN HISTORY
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem("history", JSON.stringify(history));
      } catch (err) {
        console.log("Error saving history:", err);
      }
    };

    saveHistory();
  }, [history]);

  const searchWord = async () => {
    if (!word.trim() || loading) return;

    setHistory((prev) => {
      if (prev.includes(word)) return prev;

      return [word, ...prev];
    });

    showthepage();
    setLoading(true);
    setData(null);
    hideHistory();

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );

      const json = await res.json();

      if (!res.ok || !Array.isArray(json)) {
        setData(null);
        alert("Word not found");
        setHideHistory(false);
        setWord("");
        return;
      }

      setData(json?.[0] ?? null);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const audioplaying = () => {
    setPlayingAudio("Play");
  };

  // 🎧 LOAD + PLAY AUDIO
  const playAudio = async (url?: string) => {
    if (!url) return;
    audioplaying();
    try {
      // fix protocol-relative URL
      const fixedUrl = url.startsWith("//") ? `https:${url}` : url;

      // stop old sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: fixedUrl },
        { shouldPlay: true },
      );

      soundRef.current = sound;
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlayingAudio("Play");
        }
      });
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Headers />
      </View>
      <SearchBar
        value={word}
        onChangeText={setWord}
        onSearch={searchWord}
        loading={loading}
        showpage={showPage}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#7C3AED"
          style={{ marginTop: 20 }}
        />
      )}

      {/* RESULT */}
      {data && !loading && (
        <View style={[styles.card, { display: isOpen ? "flex" : "none" }]}>
          <View>
            <Pressable style={styles.closeBtn} onPress={closeBotton}>
              <Xbotton />
            </Pressable>
          </View>

          <Text style={styles.word}>{data.word}</Text>

          {/* PHONETICS + AUDIO PLAYER */}
          {data.phonetics?.map((p, i) => (
            <View key={i} style={styles.audioBox}>
              {p.text && <Text style={styles.phonetic}>{p.text}</Text>}

              {p.audio && (
                <View>
                  <Pressable
                    style={styles.playBtn}
                    onPress={() => playAudio(p.audio)}
                  >
                    {isPlaying ? <Pausebtn /> : <Playbtn />}
                    <Text style={styles.playText}>{playingAudio}</Text>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
          {/* ORIGIN */}
          {data.origin && (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Origin:</Text> {data.origin}
            </Text>
          )}
          {/* MEANINGS */}
          {data.meanings.map((m, i) => (
            <View key={i} style={{ marginTop: 15 }}>
              <Text style={styles.partOfSpeech}>{m.partOfSpeech}</Text>

              {m.definitions.map((d, j) => (
                <View key={j} style={{ marginBottom: 10 }}>
                  <Text style={styles.definition}>• {d.definition}</Text>
                  {d.example && (
                    <Text style={styles.example}>Example: "{d.example}"</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      <View style={{ display: hideHistorypage ? "none" : "flex" }}>
        <History
          history={history}
          onDelete={(item: string) => {
            setHistory((prev) => prev.filter((word) => word !== item));
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7fa",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    margin: 10,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 5,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  phonetic: {
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 5,
  },
  audioBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#b771e533",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  playBtn: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  playingBtn: {
    backgroundColor: "#7C3AED",
  },
  playText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  meaningContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 15,
  },
  partOfSpeech: {
    fontWeight: "bold",
    color: "#7C3AED",
    fontSize: 14,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  definitionBox: {
    marginBottom: 12,
  },
  definition: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  example: {
    fontStyle: "italic",
    color: "#6B7280",
    marginLeft: 14,
    marginTop: 4,
  },
});
