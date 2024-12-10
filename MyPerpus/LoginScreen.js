import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

// Pure function untuk validasi input
// hanya menerima parameter dan mengembalikan output tanpa efek samping.
const validateFields = (identifier, password, role) => {
  return identifier && password && role;
};

// Pure function untuk membuat pesan alert
const createAlertMessage = (type, identifier, role) => {
  if (type === 'success') {
    return `Login berhasil sebagai ${role} dengan Email: ${identifier}`;
  }
  if (type === 'error') {
    return `Terjadi kesalahan, mohon periksa kembali email dan password Anda.`;
  }
  if (type === 'missing') {
    return 'Masukkan Email, Password, dan pilih peran Anda.';
  }
  if (type === 'invalidEmail') {
    return 'Hanya login menggunakan email yang diizinkan!';
  }
  return 'Terjadi kesalahan.';
};

// Fungsi untuk menampilkan alert
const showAlert = (message) => Alert.alert('Info', message);

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  // Penjelasan
  // variabel dalam fungsi LoginScreen seperti identifier, password, dan role memang dipakai sebagai parameter untuk fungsi validateFields.
  // Namun, ini tidak melanggar konsep Pure Function, karena variabel-variabel tersebut diberikan sebagai parameter ke fungsi tanpa mengakses langsung variabel di luar ruang lingkup fungsi.
  // Pure Function tidak peduli dari mana parameter berasal. Yang penting adalah bahwa fungsi hanya bergantung pada nilai yang diterima sebagai parameter dan tidak mengakses variabel di luar ruang lingkupnya.

  // Fungsi login
  const handleLogin = async () => {
    // Validasi input
    if (!validateFields(identifier, password, role)) {
      const alertMessage = createAlertMessage('missing');
      showAlert(alertMessage);
      return;
    }

    // Periksa apakah input berupa email
    if (!identifier.includes('@')) {
      const alertMessage = createAlertMessage('invalidEmail');
      showAlert(alertMessage);
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      const user = userCredential.user;

      // Buat pesan berhasil
      const alertMessage = createAlertMessage('success', user.email, role);
      showAlert(alertMessage);

      // Navigasi ke halaman berikutnya
      navigation.navigate('Home');
    } catch (error) {
      const alertMessage = createAlertMessage('error');
      showAlert(alertMessage);
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
          onPress={() => {
            const newRole = 'admin'; // Immutability: membuat nilai baru
            setRole(newRole);
          }}
        >
          <View style={[styles.radioCircle, role === 'admin' && styles.radioSelected]} />
          <Text style={styles.radioText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => {
            const newRole = 'customer'; // Immutability: membuat nilai baru
            setRole(newRole);
          }}
        >
          <View style={[styles.radioCircle, role === 'customer' && styles.radioSelected]} />
          <Text style={styles.radioText}>Customer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
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
  signUpText: {
    fontWeight: 'bold',
    color: '#2986cc',
  },
});

export default LoginScreen;
