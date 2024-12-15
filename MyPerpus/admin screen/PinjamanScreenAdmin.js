import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Footer from './FooterAdmin';

// Pure function untuk memproses data buku
const processBooksData = (snapshot) =>
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

// Fungsi untuk membuat item buku dengan tombol kembalikan
const BookItem = React.memo(({ book, onReturn }) => (
  <View style={styles.bookItem}>
    <Image source={{ uri: book.cover || 'https://via.placeholder.com/100' }} style={styles.bookCover} />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>{book.judul}</Text>
      <Text style={styles.bookAuthor}>{book.pengarang}</Text>
    </View>
    {onReturn && (
      <TouchableOpacity style={styles.returnButton} onPress={() => onReturn(book)}>
        <Text style={styles.returnButtonText}>Kembalikan</Text>
      </TouchableOpacity>
    )}
  </View>
));

// Pure function untuk membuat daftar buku
const BookList = React.memo(({ books, onReturn }) => (
  <FlatList
    data={books}
    renderItem={({ item }) => <BookItem book={item} onReturn={onReturn} />}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.bookListContainer}
  />
));

// Komponen utama PinjamanScreen
const PinjamanScreen = ({ navigation }) => {
  const [borrowedByUser, setBorrowedByUser] = useState([]);
  const [borrowedByOthers, setBorrowedByOthers] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const booksCollection = collection(db, 'buku');

    // Query buku yang dipinjam oleh user saat ini
    const userBooksQuery = query(
      booksCollection,
      where('status', '==', false),
      where('uid', '==', user.uid)
    );

    // Query buku yang dipinjam oleh user lain
    const otherBooksQuery = query(
      booksCollection,
      where('status', '==', false),
      where('uid', '!=', user.uid)
    );

    const unsubscribeUserBooks = onSnapshot(userBooksQuery, (snapshot) => {
      setBorrowedByUser(processBooksData(snapshot)); // Tidak langsung dimutasi
    });

    const unsubscribeOtherBooks = onSnapshot(otherBooksQuery, (snapshot) => {
      setBorrowedByOthers(processBooksData(snapshot));
    });

    return () => {
      unsubscribeUserBooks();
      unsubscribeOtherBooks();
    };
  }, [user]);

  // Pure function untuk mengembalikan buku
  const handleReturnBook = async (book) => {
    const db = getFirestore();
    const bookRef = doc(db, 'buku', book.id);

    try {
      await updateDoc(bookRef, { status: true, uid: '' });
      Alert.alert('Berhasil', `Buku "${book.judul}" telah dikembalikan.`);
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengembalikan buku.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>MyPerpus</Text>
      </View>

      {/* Header Keterangan */}
      <Text style={styles.keteranganText}>Pinjaman anda</Text>
      <BookList books={borrowedByUser} onReturn={handleReturnBook} />

      <Text style={styles.keteranganText}>Buku dalam pinjaman</Text>
      <BookList books={borrowedByOthers} />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Pinjaman Customer" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4fc',
    paddingBottom: 60, // Ruang untuk footer
    // marginTop: 50
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
    marginTop: 60
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
  returnButton: {
    alignSelf: 'center',
    backgroundColor: '#2986cc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  returnButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PinjamanScreen;
