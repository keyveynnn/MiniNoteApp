import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { getTasks, deleteTask, Task } from "@/lib/database";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    try {
      setTasks(getTasks());
    } catch (e) {
      Alert.alert("Error", "Could not load tasks");
    }
  };

  useFocusEffect(useCallback(() => { loadTasks(); }, []));

  return (
    <View style={styles.container}>
      <Pressable style={styles.addBtn} onPress={() => router.push("/add-task")}>
        <Text style={styles.addBtnText}>+ Add New Task</Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskStatus}>{item.status}</Text>
            <View style={styles.row}>
              <Pressable style={styles.viewBtn} onPress={() => router.push({ pathname: "/task-detail", params: { ...item } })}>
                <Text style={styles.whiteText}>View</Text>
              </Pressable>
              <Pressable style={styles.delBtn} onPress={() => { deleteTask(item.id); loadTasks(); }}>
                <Text style={styles.whiteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addBtn: { backgroundColor: '#000', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskStatus: { color: '#666', marginVertical: 5 },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
  viewBtn: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  delBtn: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 5 },
  whiteText: { color: '#fff' }
});