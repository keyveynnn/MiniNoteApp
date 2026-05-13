import React, { useState } from "react";
import { updateTask } from "@/lib/database";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{ id: string; title: string; description: string; status: string }>();
  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = () => {
    if (!title.trim()) return Alert.alert("Error", "Title required");
    updateTask(Number(params.id), title, description, status);
    router.dismissAll(); // Return to main list
    router.push("/tasks");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput style={[styles.input, { height: 100 }]} value={description} onChangeText={setDescription} multiline />
      <Pressable style={styles.btn} onPress={handleUpdate}><Text style={styles.btnText}>Update Task</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10, fontSize: 16 },
  btn: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});