import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

// Fungsi validasi input
const validateFields = (identifier, password, role) => {
  return identifier && password && role;
};

// Fungsi untuk menampilkan alert
const showAlert = (message) => {
  Alert.alert('Info', message);
};

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Fungsi untuk menangani login
  const handleLogin = async (identifier, password, role) => {
    if (validateFields(identifier, password, role)) {
      try {
        const isEmail = identifier.includes('@');
        if (!isEmail) {
          showAlert('Hanya login menggunakan email yang diizinkan!');
          return;
        }

        // Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
        const user = userCredential.user;

        // Berhasil login
        showAlert(`Login berhasil sebagai ${role} dengan Email: ${user.email}`);
        navigation.navigate('Home');
      } catch (error) {
        showAlert(error.message || 'Terjadi kesalahan saat login.');
      }
    } else {
      showAlert('Masukkan Email, Password, dan pilih peran Anda.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyPerpus</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={identifier}
        onChangeText={setIdentifier}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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

      <TouchableOpacity style={styles.button} onPress={() => handleLogin(identifier, password, role)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Text 
          style={styles.signUpText} 
          onPress={() => navigation.navigate('SignUp')}
        >
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
