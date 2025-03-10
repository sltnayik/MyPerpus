import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Footer from './FooterAdmin';

// Komponen untuk Render Buku
const BookItem = React.memo(({ item, onPinjamPress }) => (
  <View style={styles.bookItem}>
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/100' }}
      style={styles.bookImage}
    />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>Judul: {item.judul}</Text>
      <Text style={styles.bookAuthor}>Penulis: {item.pengarang}</Text>
      <Text style={styles.bookStatus}>
        Status: {item.status ? 'Tersedia' : 'Dipinjam'}
      </Text>

      {/* Tombol Pinjam */}
      {item.status && (
        <TouchableOpacity
          style={styles.pinjamButton}
          onPress={() => onPinjamPress(item.id)}
        >
          <Text style={{ color: 'white' }}>Pinjam</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
));

// Pure function untuk Filter Buku
// fungsi murni karena mereka tidak memiliki efek samping dan hanya bergantung pada input untuk menghasilkan output.
const filterBooks = (books, query) =>
  query
    ? books.filter((book) =>
        [book.judul, book.pengarang, book.status ? 'tersedia' : 'dipinjam']
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(query.toLowerCase()))
      )
    : books;

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  // Fungsi Murni untuk Memproses Buku
  const processBooks = (snapshot) =>
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  // Mengambil Data Buku dari Firestore
  useEffect(() => {
    const booksCollection = collection(db, 'buku');
    const unsubscribe = onSnapshot(booksCollection, (snapshot) =>
      setBooks(processBooks(snapshot))
    );
    return unsubscribe;
  }, [db]);

  // Fungsi untuk meminjam buku
  const handlePinjam = async (bookId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('Pengguna tidak login. Harap login terlebih dahulu.');
      navigation.navigate('Login');
      return;
    }

    try {
      const bookRef = doc(db, 'buku', bookId);
      await updateDoc(bookRef, { status: false, uid: user.uid });
      console.log('Buku berhasil dipinjam!');
    } catch (error) {
      console.error('Gagal meminjam buku:', error.message);
    }
  };

  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>MyPerpus</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari buku"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Daftar Buku */}
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => (
          <BookItem item={item} onPinjamPress={handlePinjam} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
      />

      {/* Footer */}
      <Footer navigation={navigation} currentScreen="Home Admin" />
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
  pinjamButton: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
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
