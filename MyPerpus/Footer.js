import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = ({ navigation, currentScreen }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Pinjaman')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'Pinjaman' && styles.activeNavButton]}>
          Pinjaman
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'Home' && styles.activeNavButton]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'Profile' && styles.activeNavButton]}>
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%', // Menjamin lebar 100%
    position: 'absolute',
    bottom: 0,
    left: 0, // Memastikan footer mulai dari sisi kiri layar
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 14,
    color: '#2986cc',
  },
  activeNavButton: {
    fontWeight: 'bold',
    color: '#0056b3',
  },
});

export default Footer;
