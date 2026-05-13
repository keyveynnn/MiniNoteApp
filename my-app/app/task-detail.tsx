import { updateTask } from "@/lib/database";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
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

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  // Initialize state with current task data
  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = () => {
    if (!title.trim()) {
      return Alert.alert("Error", "Task title cannot be empty.");
    }

    try {
      // Save changes to SQLite
      updateTask(Number(params.id), title.trim(), description.trim(), status);
      
      Alert.alert("Success", "Task updated successfully", [
        { 
          text: "OK", 
          onPress: () => router.dismissAll() // Returns to the task list/detail with fresh data
        }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Update Error", "Failed to save changes.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Task Title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Task Description"
          multiline
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {statusOptions.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => setStatus(opt)}
              style={[styles.opt, status === opt && styles.activeOpt]}
            >
              <Text style={[styles.optText, status === opt && styles.activeOptText]}>
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable 
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]} 
          onPress={handleUpdate}
        >
          <Text style={styles.btnText}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 24 },
  label: { fontSize: 14, fontWeight: "700", color: "#666", marginBottom: 8, textTransform: "uppercase" },
  input: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 24 },
  textArea: { height: 120, textAlignVertical: "top" },
  statusRow: { flexDirection: "row", gap: 10, marginBottom: 40 },
  opt: { flex: 1, padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, alignItems: "center" },
  activeOpt: { backgroundColor: "#111", borderColor: "#111" },
  optText: { fontWeight: "600", color: "#444" },
  activeOptText: { color: "#fff" },
  btn: { backgroundColor: "#111", padding: 18, borderRadius: 16, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});