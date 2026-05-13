import { initDatabase } from "../lib/database"; // Changed from @/lib/database to relative path
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Initialize the SQLite database table when the app first loads
    try {
      initDatabase();
    } catch (error) {
      console.error(error);
      Alert.alert("Database Error", "Failed to initialize database storage.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Task App</Text>
      <Text style={styles.subtitle}>Manage your daily goals efficiently</Text>

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 }
        ]} 
        onPress={() => router.push("/tasks")}
      >
        <Text style={styles.buttonText}>Open Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 24,
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 34, 
    fontWeight: "700", 
    marginBottom: 8,
    color: "#111" 
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 32,
    color: "#666" 
  },
  button: { 
    backgroundColor: "#111", 
    paddingHorizontal: 32, 
    paddingVertical: 16, 
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "600",
    fontSize: 18 
  },
});