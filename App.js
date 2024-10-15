import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';

const ACTIONS = {
  ADD_TASK: 'add-task',
  REMOVE_TASK: 'remove-task',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, { id: Date.now(), task: action.payload }];
    case ACTIONS.REMOVE_TASK:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: taskText });
      setTaskText('');
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: taskId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODOS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new todo"
          value={taskText}
          onChangeText={setTaskText}
        />
        <Button title="Save" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.task}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  taskText: {
    fontSize: 16,
  },
});
