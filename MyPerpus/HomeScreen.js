import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from './Footer';

// Fungsi Pure untuk Render Buku
const renderBookItem = ({ item }) => (
  <View style={styles.bookItem}>
    <Image source={{ uri: item.image }} style={styles.bookImage} />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>Judul: {item.title}</Text>
      <Text style={styles.bookAuthor}>Penulis: {item.author}</Text>
      <Text style={styles.bookStatus}>Status: {item.status}</Text>
    </View>
  </View>
);

// Fungsi Pure untuk Filter Buku
const filterBooks = (books, query) => {
  if (!query) return books; // Jika query kosong, kembalikan semua buku
  return books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase()) ||
    book.status.toLowerCase().includes(query.toLowerCase())
  );
};

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Data buku statis
  // Penggunaan React.useMemo
  // books didefinisikan sebagai state statis dengan React.useMemo. Ini memastikan bahwa data buku tidak diinisialisasi ulang setiap kali komponen dirender.
  // filteredBooks dihitung ulang hanya ketika books atau searchQuery berubah, yang meningkatkan performa.
  const books = React.useMemo(
    () => [
      {
        id: '1',
        title: 'Buku A',
        author: 'Penulis A',
        status: 'Tersedia',
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        title: 'Buku B',
        author: 'Penulis B',
        status: 'Dipinjam',
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '3',
        title: 'Buku C',
        author: 'Penulis C',
        status: 'Tersedia',
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '4',
        title: 'Buku D',
        author: 'Penulis D',
        status: 'Tersedia',
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '5',
        title: 'Buku E',
        author: 'Penulis E',
        status: 'Tersedia',
        image: 'https://via.placeholder.com/100',
      },
    ],
    []
  );

  // Buku yang difilter berdasarkan query
  const filteredBooks = React.useMemo(() => filterBooks(books, searchQuery), [books, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>MyPerpus</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari buku"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List Buku */}
      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
      />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4fc',
    paddingBottom: 60,
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
  searchBar: {
    height: 50,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bookList: {
    padding: 10,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  bookStatus: {
    fontSize: 14,
    color: '#2986cc',
  },
});

export default HomeScreen;
