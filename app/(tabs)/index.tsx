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
import Errorpage from "../components/Error";
import Headers from "../components/Header";
import History from "../components/History";

import Pausebtn from "../components/Pausebtn";
import Playbtn from "../components/Playbtn";
import SearchBar from "../components/Searchbar";
import Settings from "../components/Settings";
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

export default function main() {
  const [word, setWord] = useState("");
  const [data, setData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState("Play");

  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showPage, setShowpage] = useState(true);
  const [showError, setShowerror] = useState(true);

  const [Errortext, setErrortext] = useState("");
  const [Errormessage, setErrormessage] = useState("");
  type ImageKey = "notaword" | "nowifi";

  const [Errorimage, setErrorimage] = useState<ImageKey>("notaword");

  const [history, setHistory] = useState<string[]>([]);
  const [hideHistorypage, setHideHistory] = useState(false);
  const [showSettings, setSettings] = useState(false);
  const [theme, setSwitch] = useState(true);

  const closeSettings = () => {
    setSettings(false);
  };

  const Themeswitch = async (value: boolean) => {
    try {
      setSwitch(value);

      await AsyncStorage.setItem("dark_mode", String(value));
    } catch (err) {
      console.log("Theme save error:", err);
    }
  };
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem("dark_mode");

        if (saved !== null) {
          setSwitch(saved === "true");
        }
      } catch (err) {
        console.log("Theme load error:", err);
      }
    };

    loadTheme();
  }, []);

  //////////
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

  // SHOW HISTORY AND HIDES ERROR PAGE
  const hideError = () => {
    setShowerror(true);
    setHideHistory(false);
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

  const searchWord = async (searchText?: string) => {
    const query = (searchText ?? word).trim();

    if (!query || loading) return;

    setWord(query);

    setHistory((prev) => {
      if (prev.includes(query)) return prev;
      return [query, ...prev];
    });

    showthepage();
    setLoading(true);
    setData(null);
    setShowerror(true);
    hideHistory();

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`,
      );

      const json = await res.json();

      if (!res.ok || !Array.isArray(json)) {
        setData(null);
        setErrortext("Word Not Found!");
        setErrormessage("Make sure the word you input exist");
        setErrorimage("notaword");
        setShowerror(false);
        setHideHistory(true);
        setWord("");
        return;
      }

      setData(json?.[0] ?? null);
    } catch (err) {
      setTimeout(() => {
        setShowerror(false);
        setErrortext("Connection Error!");
        setErrormessage("Check your internet connection and try again");
        setErrorimage("nowifi");
      }, 1500);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
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
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme ? "#040f26" : "white",
      }}
    >
      <View style={styles.header}>
        <Headers theme={theme} openSettings={() => setSettings(true)} />
      </View>
      <SearchBar
        value={word}
        onChangeText={setWord}
        onSearch={searchWord}
        loading={loading}
        showpage={showPage}
        theme={theme}
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
          onSearch={searchWord}
          onDelete={(item: string) => {
            setHistory((prev) => prev.filter((word) => word !== item));
          }}
          theme={theme}
        />
      </View>
      <View
        style={{
          ...styles.Errorcontainer,
          display: showError ? "none" : "flex",
        }}
      >
        <Errorpage
          text={Errortext}
          Message={Errormessage}
          imageselect={Errorimage}
          onClose={hideError}
        />
      </View>
      <Settings
        visible={showSettings}
        openSetting={closeSettings}
        SwitchTheme={Themeswitch}
        theme={theme}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Errorcontainer: {
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
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
