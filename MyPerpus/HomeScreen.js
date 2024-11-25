import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('./assets/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>MyPerpus</Text>
      </View>

      {/* Main Menu */}
      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('SearchBooks')}
        >
          <Text style={styles.menuText}>Cari Buku</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('MyLoans')}
        >
          <Text style={styles.menuText}>Pinjaman Saya</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 MyPerpus. All Rights Reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flex: 1,
    maxHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2986cc',
    paddingHorizontal: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
  },
  menu: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  menuButton: {
    backgroundColor: '#2986cc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    transform: [{ scale: 1 }],
    transition: 'transform 0.3s ease',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  footerText: {
    color: '#333',
    fontSize: 14,
  },
});

export default HomeScreen;
