import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

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

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const books = [
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
  ];

  // Data yang difilter berdasarkan query
  const filteredBooks = filterBooks(books, searchQuery);

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

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Pinjaman</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
  searchBar: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 25,
    marginLeft: 25,
    borderColor: '#2986cc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  bookList: {
    padding: 10,
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  bookImage: {
    width: 60,
    height: 80,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookStatus: {
    fontSize: 14,
    color: '#2986cc',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 14,
    color: '#2986cc',
  },
});

export default HomeScreen;
