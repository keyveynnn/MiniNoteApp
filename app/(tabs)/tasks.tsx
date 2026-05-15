import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Alert, SafeAreaView } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { getTasks, Task } from "../../lib/database"; 

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const loadTasks = () => { 
    try { 
      setTasks(getTasks()); 
    } catch (e) { 
      console.error(e); 
    } 
  };
  
  useFocusEffect(useCallback(() => { loadTasks(); }, []));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task List</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Your Tasks</Text>
        
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.card} 
              onPress={() => {
                // Pass only the ID to avoid "empty" data bugs
                router.push({ 
                  pathname: "/task-detail", 
                  params: { id: item.id } 
                });
              }}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </Pressable>
          )}
        />

        <Pressable style={styles.floatingBtn} onPress={() => router.push("/add-task")}>
          <Text style={styles.addBtnText}>+ Add Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F2F2F7" },
  header: { height: 60, backgroundColor: "#1C1C1E", justifyContent: "center", paddingHorizontal: 20 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 15, marginBottom: 12, elevation: 2 },
  taskTitle: { fontSize: 18, fontWeight: '700' },
  statusText: { fontSize: 12, color: '#666' },
  floatingBtn: { 
    backgroundColor: '#1C1C1E', 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  addBtnText: { color: '#fff', fontWeight: '800', fontSize: 18 },
});