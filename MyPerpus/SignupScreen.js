import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Fungsi validasi input untuk sign up
const validateSignUpFields = (username, password, confirmPassword) => {
  return username && password && confirmPassword;
};

// Fungsi validasi password
const arePasswordsEqual = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Fungsi untuk menampilkan alert
const showAlert = (message) => {
  Alert.alert('Info', message);
};

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

// Fungsi untuk menangani logika Sign Up
const handleSignUp = (username, password, confirmPassword) => {
  if (validateSignUpFields(username, password, confirmPassword)) {
    if (arePasswordsEqual(password, confirmPassword)) {
      showAlert(`Berhasil mendaftar, ${username}!`);
      navigation.navigate('Login')
    } else {
      showAlert('Password dan Konfirmasi Password tidak sama!');
    }
  } else {
    showAlert('Semua field harus diisi!');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar MyPerpus</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp(username, password, confirmPassword)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
});

export default SignUpScreen;
