import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getTaskById, deleteTask, Task } from '../lib/database';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const data = getTaskById(Number(id));
      setTask(data || null);
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: () => {
          deleteTask(Number(id));
          router.replace("/(tabs)/tasks");
        } 
      }
    ]);
  };

  if (!task) {
    return (
      <View style={styles.container}><Text>Task not found...</Text></View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>TITLE</Text>
        <Text style={styles.content}>{task.title}</Text>

        <Text style={styles.label}>DESCRIPTION</Text>
        <Text style={styles.content}>{task.description || "No description provided."}</Text>

        <Text style={styles.label}>STATUS</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.editBtn} onPress={() => router.push({ pathname: "/edit-task", params: { id: task.id } })}>
            <Text style={styles.editText}>Edit Task</Text>
          </Pressable>
          
          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete Task</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  container: { flex: 1, padding: 24 },
  label: { fontSize: 12, fontWeight: "700", color: "#BBB", marginBottom: 8, letterSpacing: 1 },
  content: { fontSize: 20, color: "#1C1C1E", marginBottom: 30, fontWeight: "500" },
  statusBadge: { backgroundColor: "#F2F2F7", padding: 10, borderRadius: 8, alignSelf: 'flex-start' },
  statusText: { fontWeight: "bold", color: "#666" },
  footer: { marginTop: 'auto' },
  editBtn: { backgroundColor: "#1C1C1E", padding: 18, borderRadius: 15, alignItems: "center", marginBottom: 12 },
  editText: { color: "#FFF", fontWeight: "700" },
  deleteBtn: { padding: 18, alignItems: "center" },
  deleteText: { color: "#FF3B30", fontWeight: "600" }
});