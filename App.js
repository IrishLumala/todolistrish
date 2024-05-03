import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, Image } from 'react-native';
import TodoItem from './src/todo';
import { create } from 'zustand';

const useStore = create((set) => ({
  todos: [],
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  deleteTodo: (taskId) =>
    set((state) => ({ todos: state.todos.filter((item) => item.id !== taskId) })),
  updateTodo: (taskId, newText) =>
    set((state) => ({
      todos: state.todos.map((item) => (item.id === taskId ? { ...item, text: newText } : item)),
    })),
}));

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const updateTodo = useStore((state) => state.updateTodo);

  const handleAddTodo = () => {
    if (newTodo) {
      addTodo({
        id: Date.now(),
        text: newTodo,
      });
      setNewTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TodoRish</Text>
      {}
      <View style={styles.userInfo}>
        <Image
          source={require('./assets/rish.jpg')}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.userInfoText}>Display Name: Irish Divine N. Lumala</Text>
          <Text style={styles.userInfoText}>School ID: 20201374</Text>
          <Text style={styles.userInfoText}>Section Code: IT35B</Text>
          <Text style={styles.userInfoText}>Course Description: AppDev</Text>
          <Text style={styles.userInfoText}>Course Name: BSIT</Text>
          <Text style={styles.userInfoText}>Academic Year: 2023-2024</Text>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button title="Add Task" onPress={handleAddTodo} color="#f28b82" />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            text={item.text}
            onDelete={() => deleteTodo(item.id)}
            onUpdate={(newText) => updateTodo(item.id, newText)}
          />
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6e0b5',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eea990',
  },
  button: {
    backgroundColor: '#eea990',
    borderRadius: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#f28b82',
    textAlign: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  rowImage: {
    width: 100,
    height: 100,
  },

  footer: {
    backgroundColor: '#eea990',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
