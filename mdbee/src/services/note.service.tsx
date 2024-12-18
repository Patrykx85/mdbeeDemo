import { Note } from "../Interfaces";
import apiAuth from "./apiAuth";
import authHeader from "./auth-header";

import { API_URL } from "./common.service";

class NoteService {
  addNote(noteData: Note) {
    return apiAuth.post(API_URL + `api/notes/`, noteData, {
      headers: authHeader(),
    });
  }
  getNotes() {
    return apiAuth.get(API_URL + `api/notes/`, {
      headers: authHeader(),
    });
  }
  getNote(id: string) {
    return apiAuth.get(API_URL + `api/notes/${id}`, {
      headers: authHeader(),
    });
  }
  updateNote(id: string, noteData: Note) {
    return apiAuth.patch(API_URL + `api/notes/${id}`, {
      headers: authHeader(),
    });
  }
  deleteNote(id: string) {
    return apiAuth.delete(API_URL + `api/notes/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new NoteService();
