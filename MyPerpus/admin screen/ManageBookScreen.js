import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, onSnapshot, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../FirebaseConfig';
import Footer from './FooterAdmin';

// Pure function untuk membuat item buku
const RenderBookItem = React.memo(({ item, onDelete }) => (
  <View style={styles.bookItem}>
    {item.image && (
      <Image source={{ uri: item.image }} style={styles.bookImage} />
    )}
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>Judul: {item.judul}</Text>
      <Text style={styles.bookAuthor}>Penulis: {item.pengarang}</Text>
      <Text style={styles.bookStatus}>
        Status: {item.status ? 'Tersedia' : 'Dipinjam'}
      </Text>
    </View>

    <TouchableOpacity onPress={() => onDelete(item.id)}>
      <Text style={styles.deleteButton}>Hapus</Text>
    </TouchableOpacity>
  </View>
));

const ManageBooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const booksCollection = collection(db, 'buku');

  // Pure function untuk memetakan dokumen snapshot menjadi data buku
  const mapSnapshotToBooks = (snapshot) =>
    snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

  // Mendapatkan data buku secara real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      setBooks(mapSnapshotToBooks(snapshot));
    });

    return () => unsubscribe();
  }, []);

  // Menambah buku dengan data immutable
  const addBuku = async () => {
    if (!newTitle || !newAuthor) {
      return Alert.alert('Input Error', 'Harap isi semua bidang');
    }

    try {
      const user = getAuth().currentUser;
      const uid = user ? user.uid : null;

      if (!uid) {
        return Alert.alert('Error', 'Pengguna tidak ditemukan, silakan login terlebih dahulu');
      }

      await addDoc(booksCollection, {
        uid,
        judul: newTitle,
        pengarang: newAuthor,
        status: true,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      Alert.alert('Sukses', 'Buku berhasil ditambahkan');
      setNewTitle('');
      setNewAuthor('');
    } catch (error) {
      console.error('Failed to add book:', error);
      Alert.alert('Gagal', 'Tidak dapat menambah buku');
    }
  };

  // Menghapus buku dengan ID tertentu
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'buku', id));
      Alert.alert('Sukses', 'Buku berhasil dihapus');
    } catch (error) {
      console.error('Failed to delete book:', error);
      Alert.alert('Gagal', 'Tidak dapat menghapus buku');
    }
  };

  // Filter buku menggunakan fungsi murni
  const filterBooks = (books, query) =>
    books.filter(
      (book) =>
        book.judul?.toLowerCase().includes(query.toLowerCase()) ||
        book.pengarang?.toLowerCase().includes(query.toLowerCase())
    );

  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kelola Buku</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari buku"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
      />

      {/* Daftar Buku */}
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => (
          <RenderBookItem item={item} onDelete={deleteBook} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
      />

      {/* Form Tambah Buku */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Judul buku"
          value={newTitle}
          onChangeText={(text) => setNewTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama penulis"
          value={newAuthor}
          onChangeText={(text) => setNewAuthor(text)}
        />
        <TouchableOpacity onPress={addBuku} style={styles.addButton}>
          <Text style={styles.addText}>Tambah Buku</Text>
        </TouchableOpacity>
      </View>

      <Footer navigation={navigation} currentScreen="ManageBooks" />
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
    margin: 15,
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
    color: '#333'
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  bookStatus: {
    fontSize: 14,
    color: '#2986cc',
  },
  deleteButton: {
    color: '#ff0000',
    fontWeight: 'bold', 
    marginLeft: 15 
  },
  form: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#2986cc',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageBooksScreen;
