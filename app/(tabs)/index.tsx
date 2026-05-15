import { router } from "expo-router";
import { StyleSheet, Text, View, Pressable, SafeAreaView, StatusBar } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Mini Task App</Text>
        <Text style={styles.subtitle}>Manage your daily goals efficiently</Text>
        
        <Pressable 
          style={styles.button} 
          onPress={() => router.push("/tasks")}
        >
          <Text style={styles.buttonText}>Open Tasks</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Light gray background from your UI
  },
  header: {
    height: 100,
    backgroundColor: "#1C1C1E", // Black header
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42, // Bold large title
    fontWeight: "800",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#717171",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1C1C1E", // Black button
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});