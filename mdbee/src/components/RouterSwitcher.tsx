import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import AddNote from "../pages/AddNotePage";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";

const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<AddNote />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/add" element={<AddNote />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  );
};

export default RouteSwitcher;
