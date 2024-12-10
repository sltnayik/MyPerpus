import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Footer from './Footer';

// Fungsi untuk membuat komponen informasi profil
const ProfileInfo = ({ title, value }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

// Fungsi untuk membuat tombol logout
const LogoutButton = ({ onLogout }) => (
  <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
    <Text style={styles.logoutButtonText}>Logout</Text>
  </TouchableOpacity>
);

// Pure function untuk menangani logout
const handleLogout = (navigation) => {
  navigation.replace('Login');
};

// Komponen utama ProfileScreen
const ProfileScreen = ({ navigation }) => {
  const profileData = {
    username: 'User123',
    email: 'user@example.com',
    profileImage: 'https://via.placeholder.com/150',
  };

  return (
    <View style={styles.container}>
      {/* Header Profil */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <Text style={styles.usernameText}>{profileData.username}</Text>
      </View>

      {/* Informasi Profil */}
      <ProfileInfo title="Email" value={profileData.email} />
      <ProfileInfo title="Username" value={profileData.username} />

      {/* Tombol Logout */}
      <LogoutButton onLogout={() => handleLogout(navigation)} />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4fc',
    paddingBottom: 60,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  infoText: {
    fontSize: 18,
    color: '#222',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    marginHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
