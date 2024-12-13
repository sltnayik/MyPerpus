import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, TextInput } from 'react-native';
import { getAuth, updatePassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Footer from './FooterAdmin';

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profileImage: 'https://via.placeholder.com/150',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileData({
              username: userData.username || 'Unknown User',
              email: user.email || 'Email not available',
              profileImage: userData.profileImage || 'https://via.placeholder.com/150',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, [auth, db, navigation]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigation.replace('Login'))
      .catch((error) => Alert.alert('Error', error.message));
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert('Sukses', 'Password berhasil diperbarui.');
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Pengguna tidak ditemukan.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <Text style={styles.usernameText}>{profileData.username}</Text>
      </View>

      <ProfileInfo title="Email" value={profileData.email} />
      <ProfileInfo title="Username" value={profileData.username} />

      {/* Tombol Ganti Password */}
      <TouchableOpacity style={styles.changePasswordButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.changePasswordButtonText}>Ganti Password</Text>
      </TouchableOpacity>

      <LogoutButton onLogout={handleLogout} />
      <Footer navigation={navigation} currentScreen="Profile Admin" />

      {/* Modal untuk Ganti Password */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ganti Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan password baru"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleChangePassword}>
                <Text style={styles.modalButtonText}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileInfo = ({ title, value }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

const LogoutButton = ({ onLogout }) => (
  <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
    <Text style={styles.logoutButtonText}>Logout</Text>
  </TouchableOpacity>
);

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
  changePasswordButton: {
    backgroundColor: '#4caf50',
    marginHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  changePasswordButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    width: '80%' 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  textInput: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 15 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  modalButton: { 
    backgroundColor: '#4caf50', 
    padding: 10, 
    borderRadius: 5, 
    marginHorizontal: 5, 
    flex: 1, 
    alignItems: 'center' 
  },
  modalButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  cancelButton: { 
    backgroundColor: '#ff5252' 
  },
});

export default ProfileScreen;
