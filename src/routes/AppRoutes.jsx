import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import AddBookPage from '../pages/AddBookPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books/add" element={<AddBookPage />} />
        <Route path="books/:id" element={<BookDetailsPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;