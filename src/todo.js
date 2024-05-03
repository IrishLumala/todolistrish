import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet  } from 'react-native';

const TodoItem = ({ text, onDelete, onUpdate }) => {
    const [isEditing, setEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(text);
  
    const handleUpdate = () => {
      onUpdate(updatedText);
      setEditing(false);
    };
  
    return (
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
          {isEditing ? (
            <View>
              <TextInput
                value={updatedText}
                onChangeText={(text) => setUpdatedText(text)}
                style={styles.input}
              />
              <Button title="Save" onPress={handleUpdate} color="#efc6c6" style={styles.button} />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => setEditing(true)} color="#ddbea5" style={styles.button} />
              <Button title="Delete" onPress={onDelete} color="#ffc8b3" style={styles.button} />
            </View>
          )}
        </View>
      );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#f6e0b5', 
      borderRadius: 20, 
      marginBottom: 10,
    },
    text: {
      flex: 1,
      fontSize: 16, 
      color: '#333',
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    button: {
      marginHorizontal: 5,
      borderRadius: 20, 
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    editButton: {
      backgroundColor: '#a7d8e4', 
    },
    deleteButton: {
      backgroundColor: '#f28b82', 
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#eea990', 
      borderRadius: 5,
      padding: 8,
      fontSize: 16, 
      color: '#333', 
    },
  });
   

export default TodoItem;