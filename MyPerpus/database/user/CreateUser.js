import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const registerUser = async (email, password, username) => {
  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data pengguna ke Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: user.email,
    });

    console.log('Pengguna berhasil didaftarkan!');
  } catch (error) {
    console.error('Gagal mendaftarkan pengguna:', error.message);
  }
};
