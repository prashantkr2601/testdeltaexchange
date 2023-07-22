import { db } from "../config/config.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const notesCollection = collection(db, "notes");
class NotesService {
  addNote = async (newNote) => {
    return await addDoc(notesCollection, {
      ...newNote,
      lastUpdated: new Date(),
    });
  };

  getNote = async (id) => {
    return await getDoc(doc(db, "notes", id));
  };

  getNotes = async () => {
    return await getDocs(notesCollection);
  };

  deleteNote = async (id) => {
    return await deleteDoc(doc(db, "notes", id));
  };
}
export default new NotesService();
