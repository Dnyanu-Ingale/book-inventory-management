import { useEffect, useMemo, useState } from 'react';
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

  const summaryData = useMemo(() => {
    const totalBooks = books.length;

    const uniquePublishers = new Set(
      books.map((book) => book.publisher).filter(Boolean)
    ).size;

    const averageAge =
      totalBooks > 0
        ? (
            books.reduce(
              (sum, book) => sum + Number(book.recommendedAge || 0),
              0
            ) / totalBooks
          ).toFixed(1)
        : 0;

    return {
      totalBooks,
      uniquePublishers,
      averageAge,
    };
  }, [books]);

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
      <div className="page-header page-header-responsive">
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

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{summaryData.totalBooks}</p>
        </div>

        <div className="stat-card">
          <h3>Publishers</h3>
          <p>{summaryData.uniquePublishers}</p>
        </div>

        <div className="stat-card">
          <h3>Average Age</h3>
          <p>{summaryData.averageAge}</p>
        </div>
      </div>

      <div className="content-card">
        <div className="section-title">
          <h3>Books Inventory Table</h3>
          <p>All books currently available in the system</p>
        </div>

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

      <div className="content-card">
        <div className="section-title">
          <h3>Books Summary Table</h3>
          <p>Quick inventory overview</p>
        </div>

        <div className="table-container">
          <table className="book-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Total Books</td>
                <td>{summaryData.totalBooks}</td>
              </tr>
              <tr>
                <td>Unique Publishers</td>
                <td>{summaryData.uniquePublishers}</td>
              </tr>
              <tr>
                <td>Average Recommended Age</td>
                <td>{summaryData.averageAge}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default HomePage;