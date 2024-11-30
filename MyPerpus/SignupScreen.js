import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

// Fungsi validasi input untuk sign up
const validateSignUpFields = (username, email, password, confirmPassword, role) => {
  return username && email && password && confirmPassword && role;
};

// Fungsi validasi password
const arePasswordsEqual = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Fungsi untuk menampilkan alert
const showAlert = (title, message) => {
  Alert.alert(title, message);
};

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  // Fungsi untuk menangani logika Sign Up
  const handleSignUp = async () => {
    if (!validateSignUpFields(username, email, password, confirmPassword, role)) {
      showAlert('Error', 'Semua field harus diisi!');
      return;
    }

    if (!arePasswordsEqual(password, confirmPassword)) {
      showAlert('Error', 'Password dan Konfirmasi Password tidak sama!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      showAlert('Berhasil', `Berhasil mendaftar sebagai ${role}, ${username}!`);
      console.log('User created:', user);

      navigation.navigate('Login');
    } catch (error) {
      showAlert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar MyPerpus</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

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

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setRole('admin')}
        >
          <View style={[styles.radioCircle, role === 'admin' && styles.radioSelected]} />
          <Text style={styles.radioText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setRole('customer')}
        >
          <View style={[styles.radioCircle, role === 'customer' && styles.radioSelected]} />
          <Text style={styles.radioText}>Customer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
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
  roleContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2986cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2986cc',
  },
  radioText: {
    fontSize: 16,
    color: '#2986cc',
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
