import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BookForm from '../components/common/BookForm';
import { getBookById, updateBook } from '../services/bookService';

const initialFormData = {
  title: '',
  author: '',
  publisher: '',
  publishedDate: '',
  email: '',
  recommendedAge: '',
  description: '',
};

function EditBookPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setError('');

        const bookData = await getBookById(id);

        setFormData({
          title: bookData.title || '',
          author: bookData.author || '',
          publisher: bookData.publisher || '',
          publishedDate: bookData.publishedDate || '',
          email: bookData.email || '',
          recommendedAge: bookData.recommendedAge || '',
          description: bookData.description || '',
        });
      } catch (fetchError) {
        setError('Failed to load book data for editing.');
        console.error('Error fetching book for edit:', fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');

      await updateBook(id, {
        ...formData,
        recommendedAge: Number(formData.recommendedAge),
      });

      navigate('/');
    } catch (submitError) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="page">
        <div className="content-card">
          <p>Loading book data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Edit Book</h2>
          <p>Update the selected book details</p>
        </div>
      </div>

      <div className="content-card">
        {error && <p className="error-text">{error}</p>}

        <BookForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText="Update Book"
        />

        <Link to="/" className="secondary-link">
          Cancel and go back
        </Link>
      </div>
    </section>
  );
}

export default EditBookPage;