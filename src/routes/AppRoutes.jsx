import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import AddBookPage from '../pages/AddBookPage';
import EditBookPage from '../pages/EditBookPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="books/add" element={<AddBookPage />} />
          <Route path="books/edit/:id" element={<EditBookPage />} />
          <Route path="books/:id" element={<BookDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;