import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getTaskById, updateTask } from '../lib/database';

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

  const statuses = ['Pending', 'Ongoing', 'Finished'];

  useEffect(() => {
    const task = getTaskById(Number(id));
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setStatus(task.status);
    }
  }, [id]);

  const handleUpdate = () => {
    if (!title) return Alert.alert("Wait", "Title is required");
    updateTask(Number(id), title, desc, status);
    // Use replace to go back and refresh the list properly
    router.replace("/(tabs)/tasks");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>EDIT TITLE</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        
        <Text style={styles.label}>EDIT DESCRIPTION</Text>
        <TextInput style={[styles.input, { height: 100 }]} multiline value={desc} onChangeText={setDesc} />
        
        <Text style={styles.label}>STATUS</Text>
        <View style={styles.statusRow}>
          {statuses.map((item) => (
            <Pressable
              key={item}
              onPress={() => setStatus(item)}
              style={[styles.statusTab, status === item && styles.statusTabActive]}
            >
              <Text style={[styles.statusTabText, status === item && styles.statusTabTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Pressable style={styles.btn} onPress={handleUpdate}>
            <Text style={styles.btnText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Exactly the same styles as AddTask for perfect UI consistency
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, padding: 25 },
  label: { fontSize: 12, fontWeight: '800', color: '#BBB', marginBottom: 8, marginTop: 20 },
  input: { borderBottomWidth: 1, borderColor: '#EEE', paddingVertical: 12, fontSize: 18, color: '#1C1C1E' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, marginHorizontal: 4, backgroundColor: '#F2F2F7' },
  statusTabActive: { backgroundColor: '#1C1C1E' },
  statusTabText: { color: '#888', fontWeight: '700', fontSize: 13 },
  statusTabTextActive: { color: '#FFF' },
  footer: { marginTop: 'auto', paddingBottom: 20 },
  btn: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 16, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '800', fontSize: 16 }
});