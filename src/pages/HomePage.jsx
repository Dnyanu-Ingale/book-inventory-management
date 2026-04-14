import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTable from '../components/common/BookTable';
import { getAllBooks } from '../services/bookService';

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
    console.log('Edit:', book);
  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Book Inventory</h2>
          <p>Manage your collection of books</p>
        </div>

        <button className="primary-btn">
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