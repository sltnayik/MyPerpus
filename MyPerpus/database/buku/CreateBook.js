import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../../FirebaseConfig';

const bukuCollection = collection(db, 'buku');

export async function addBuku(uid, judul, pengarang, status) {
  try {
    const data = {
      uid: uid,
      judul: judul,
      pengarang: pengarang,
      status: status,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };

    await addDoc(bukuCollection, data);
    console.log("Buku berhasil ditambahkan ke Firestore.");
  } catch (error) {
    console.error("Gagal menambahkan buku ke Firestore:", error);
  }
}
