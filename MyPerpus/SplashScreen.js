import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Fungsi untuk menangani navigasi setelah 3 detik
const navigateAfterDelay = (navigation, delay = 3000) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, delay);
};

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    navigateAfterDelay(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>MyPerpus</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 40,
    color: '#2986cc',
    marginBottom: 20,
  },
});

export default SplashScreen;
