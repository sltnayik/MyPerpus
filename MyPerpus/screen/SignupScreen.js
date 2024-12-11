import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

// Pure Function: Validasi input
const validateSignUpFields = (username, email, password, confirmPassword, role) => 
  username && email && password && confirmPassword && role;

// Pure Function: Validasi kecocokan password
const arePasswordsEqual = (password, confirmPassword) => password === confirmPassword;

// Pure Function: Menampilkan alert
const showAlert = (title, message) => Alert.alert(title, message);

  // penjelasan pure function
  // Tidak memiliki efek samping (side effects):
  // Fungsi tidak memodifikasi variabel atau data di luar cakupannya.
  // Semua operasi hanya terjadi di dalam fungsi tersebut.
  
  // Deterministik:
  // Fungsi selalu mengembalikan nilai yang sama untuk input yang sama.
  // Tidak bergantung pada nilai global atau data eksternal yang bisa berubah.
  
  // Tidak bergantung pada state eksternal:
  // Semua data yang diperlukan fungsi diterima melalui parameter.
  
  // Tidak mengubah input:
  // Input yang diberikan ke fungsi tidak dimodifikasi.

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  // High Order Function: Mengupdate state form secara immutability
  const handleInputChange = (field) => (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));  
  };

  // High Order Function: Menangani logika Sign Up
  const handleSignUp = async () => {
    const { email, username, password, confirmPassword, role } = formData;

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
        value={formData.email}
        onChangeText={handleInputChange('email')}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={handleInputChange('username')}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={handleInputChange('password')}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={handleInputChange('confirmPassword')}
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleInputChange('role')('admin')}
        >
          <View style={[styles.radioCircle, formData.role === 'admin' && styles.radioSelected]} />
          <Text style={styles.radioText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleInputChange('role')('customer')}
        >
          <View style={[styles.radioCircle, formData.role === 'customer' && styles.radioSelected]} />
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
    backgroundColor: '#eaf4fc',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2986cc',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: '#2986cc',
  },
  radioText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#2986cc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 16,
    color: '#2986cc',
    marginTop: 20,
  },
  signInText: {
    fontWeight: 'bold',
    color: '#2986cc',
  },
});

export default SignUpScreen;
