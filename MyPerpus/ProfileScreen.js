import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Footer from './Footer';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Bagian Gambar Profil */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
      </View>

      {/* Informasi Email */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: user@example.com</Text>
      </View>

      {/* Informasi Username */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Username: User123</Text>
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Arahkan ke halaman login setelah logout
          navigation.replace('Login');
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      paddingBottom: 60, // Ruang untuk footer
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#ddd',
    },
    infoContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 1, // Untuk bayangan di Android
    },
    infoText: {
      fontSize: 16,
      color: '#333',
    },
    logoutButton: {
      margin: 20,
      padding: 15,
      backgroundColor: '#ff5252',
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default ProfileScreen;
