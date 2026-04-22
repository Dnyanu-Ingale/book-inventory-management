import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTable from '../components/common/BookTable';
import { deleteBook, getAllBooks } from '../services/bookService';

function HomePage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getAllBooks();
        setBooks(data);
      } catch (fetchError) {
        setError('Failed to load books. Please try again.');
        console.error('Error fetching books:', fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleView = (book) => {
    navigate(`/books/${book.id}`);
  };

  const handleEdit = (book) => {
    navigate(`/books/edit/${book.id}`);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setError('');
      await deleteBook(id);

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );
    } catch (deleteError) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', deleteError);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Book Inventory</h2>
          <p>Manage your collection of books</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate('/books/add')}
        >
          Add Book
        </button>
      </div>

      <div className="content-card">
        {isLoading && <p>Loading books...</p>}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && (
          <BookTable
            books={books}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </section>
  );
}

export default HomePage;