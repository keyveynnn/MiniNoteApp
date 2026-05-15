import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { addTask } from '../lib/database';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('Pending');
  const statuses = ['Pending', 'Ongoing', 'Finished'];

  // ADDED ASYNC HERE
  const handleSave = async () => {
    if (!title) return Alert.alert("Wait", "Title is required");
    
    // ADDED AWAIT HERE
    await addTask(title, desc, status); 
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>TASK TITLE</Text>
        <TextInput 
          style={styles.input} 
          placeholder="New task..." 
          onChangeText={setTitle} 
          placeholderTextColor="#CCC"
        />
        
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput 
          style={[styles.input, { height: 100 }]} 
          multiline 
          placeholder="Details..." 
          onChangeText={setDesc}
          placeholderTextColor="#CCC"
        />
        
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
        
        <Pressable style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Create Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, padding: 25 },
  label: { fontSize: 12, fontWeight: '800', color: '#BBB', marginBottom: 8, marginTop: 20 },
  input: { borderBottomWidth: 1, borderColor: '#EEE', paddingVertical: 12, fontSize: 18, color: '#1C1C1E' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, marginHorizontal: 4, backgroundColor: '#F2F2F7' },
  statusTabActive: { backgroundColor: '#1C1C1E' },
  statusTabText: { color: '#888', fontWeight: '700' },
  statusTabTextActive: { color: '#FFF' },
  btn: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 'auto' },
  btnText: { color: '#FFF', fontWeight: '800', fontSize: 16 }
});