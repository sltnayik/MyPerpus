import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Fungsi untuk menampilkan alert
const showAlert = (title, message) => Alert.alert(title, message);

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  // Mengupdate state form
  const handleInputChange = (field) => (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Fungsi untuk menangani pendaftaran
  const handleSignUp = async () => {
    const { email, username, password, confirmPassword, role } = formData;

    // Validasi input
    if (!email || !username || !password || !confirmPassword || !role) {
      showAlert('Error', 'Semua field harus diisi!');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Error', 'Password dan konfirmasi password tidak cocok!');
      return;
    }

    try {
      // Mendaftarkan pengguna dengan email dan password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Menyimpan data pengguna ke Firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        role,
      });

      showAlert('Berhasil', `Berhasil mendaftar sebagai ${role}, ${username}!`);
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
