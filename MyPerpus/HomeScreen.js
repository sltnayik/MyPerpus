import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
  // Dummy data untuk daftar buku
  const books = [
    { id: '1', title: 'Buku 1', author: 'Penulis 1' },
    { id: '2', title: 'Buku 2', author: 'Penulis 2' },
    { id: '3', title: 'Buku 3', author: 'Penulis 3' },
    { id: '4', title: 'Buku 4', author: 'Penulis 4' },
    { id: '5', title: 'Buku 5', author: 'Penulis 5' },
    { id: '6', title: 'Buku 6', author: 'Penulis 6' },
    { id: '7', title: 'Buku 7', author: 'Penulis 7' },
    { id: '8', title: 'Buku 8', author: 'Penulis 8' },
  ];

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

      {/* Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cari buku..."
          style={styles.searchInput}
        />
      </View>

      {/* Daftar Buku */}
      <View style={styles.bookListContainer}>
        <FlatList
          data={books}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <View style={styles.bookCover} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
            </View>
          )}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MyLoans')}>
          <Text style={styles.footerText}>Pinjaman Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.footerText}>Profil</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2986cc',
    padding: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
  },
  bookListContainer: {
    flex: 1,
    padding: 10,
  },
  bookItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookCover: {
    width: 80,
    height: 120,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2986cc',
    paddingVertical: 15,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
