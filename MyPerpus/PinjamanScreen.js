import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Footer from './Footer'; // Import Footer

// Fungsi untuk membuat item buku
const BookItem = ({ book }) => (
  <View style={styles.bookItem}>
    <Image source={{ uri: book.cover }} style={styles.bookCover} />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookAuthor}>{book.author}</Text>
    </View>
  </View>
);

// Fungsi untuk membuat daftar buku
const BookList = ({ books }) => (
  <FlatList
    data={books}
    renderItem={({ item }) => <BookItem book={item} />}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.bookListContainer}
  />
);

// Komponen utama PinjamanScreen
const PinjamanScreen = ({ navigation }) => {
  // Data buku pinjaman (contoh statis)
  const borrowedBooks = [
    { id: '1', title: 'Belajar React Native', author: 'John Doe', cover: 'https://via.placeholder.com/100' },
    { id: '2', title: 'Pengantar Firebase', author: 'Jane Doe', cover: 'https://via.placeholder.com/100' },
    { id: '3', title: 'Desain UI/UX', author: 'Alex Smith', cover: 'https://via.placeholder.com/100' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>MyPerpus</Text>
      </View>

      {/* Header Keterangan */}
      <Text style={styles.keteranganText}>Pinjaman</Text>

      {/* Daftar Buku */}
      <BookList books={borrowedBooks} />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Pinjaman" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4fc',
    paddingBottom: 60, // Ruang untuk footer
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#2986cc',
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
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
    marginHorizontal: 15,
    color: '#333',
    marginVertical: 10,
  },
  bookListContainer: {
    paddingHorizontal: 15,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 8,
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
