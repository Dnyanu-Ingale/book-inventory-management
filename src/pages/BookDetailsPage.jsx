import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/bookService';

function BookDetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getBookById(id);
        setBook(data);
      } catch (fetchError) {
        setError('Failed to load book details.');
        console.error('Error fetching book details:', fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
      <section className="page">
        <div className="content-card">
          <p>Loading book details...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <div className="content-card">
          <p className="error-text">{error}</p>
          <Link to="/" className="secondary-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="page">
        <div className="content-card">
          <p>Book not found.</p>
          <Link to="/" className="secondary-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Book Details</h2>
          <p>Detailed information about the selected book</p>
        </div>
      </div>

      <div className="content-card details-card">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Published Date:</strong> {book.publishedDate}</p>
        <p><strong>Publisher Email:</strong> {book.email}</p>
        <p><strong>Recommended Age:</strong> {book.recommendedAge}</p>
        <p><strong>Description:</strong> {book.description}</p>

        <Link to="/" className="secondary-link">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default BookDetailsPage;