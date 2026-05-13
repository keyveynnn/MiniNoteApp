import React, { useState } from "react";
import { addTask } from "@/lib/database";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      return Alert.alert("Required", "Please enter a task title.");
    }

    try {
      // Save to SQLite
      addTask(title.trim(), description.trim(), status);
      
      // Navigate back to the list
      router.back();
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert("Error", "Failed to save the task. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add some details..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {statusOptions.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setStatus(opt)}
                style={[
                  styles.opt,
                  status === opt && styles.activeOpt,
                ]}
              >
                <Text
                  style={[
                    styles.optText,
                    status === opt && styles.activeOptText,
                  ]}
                >
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.btn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={handleSave}
          >
            <Text style={styles.btnText}>Create Task</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#000",
    marginBottom: 24,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 40,
  },
  opt: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  activeOpt: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  optText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  activeOptText: {
    color: "#fff",
  },
  btn: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});