import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from './Footer'; // Import Footer

const PinjamanScreen = ({ navigation }) => {
  // Data buku pinjaman (contoh statis)
  const borrowedBooks = [
    { id: '1', title: 'Belajar React Native', author: 'John Doe', cover: 'https://via.placeholder.com/100' },
    { id: '2', title: 'Pengantar Firebase', author: 'Jane Doe', cover: 'https://via.placeholder.com/100' },
    { id: '3', title: 'Desain UI/UX', author: 'Alex Smith', cover: 'https://via.placeholder.com/100' },
  ];

  // Render item buku
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.cover }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>MyPerpus</Text>
      </View>
      
      {/* Header Keterangan */}
      <Text style={styles.keteranganText}>Pinjaman</Text>

      {/* Daftar Buku */}
      <FlatList
        data={borrowedBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookListContainer}
      />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Pinjaman" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingBottom: 60, // Ruang untuk footer
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#2986cc',
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 10
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  keteranganText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 15,
    marginVertical: 10,
    color: '#333',
  },
  bookListContainer: {
    padding: 10,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1, // Bayangan untuk Android
    padding: 10,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default PinjamanScreen;
