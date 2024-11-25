import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Fungsi validasi input yang lebih terpisah
const validateFields = (username, password) => {
  return username && password;
};

// Fungsi untuk menampilkan alert secara terpisah
const showAlert = (message) => {
  Alert.alert('Info', message);
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

// Fungsi utama yang menangani login
const handleLogin = (username, password) => {
  if (validateFields(username, password)) {
    showAlert(`Selamat Datang, ${username}!`);
    navigation.navigate('Home');
  } else {
    showAlert('Masukkan Username beserta Password');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyPerpus</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={() => handleLogin(username, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don't have an account? 
        <Text 
          style={styles.signUpText} 
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2986cc',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#2986cc',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#2986cc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    color: '#2986cc',
    fontSize: 16,
  },
  signUpText: {
    color: '#2986cc',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
