import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/common/BookForm';
import { createBook } from '../services/bookService';

const initialFormData = {
  title: '',
  author: '',
  publisher: '',
  publishedDate: '',
  email: '',
  recommendedAge: '',
  description: '',
};

function AddBookPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

      await createBook({
        ...formData,
        recommendedAge: Number(formData.recommendedAge),
      });

      navigate('/');
    } catch (submitError) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Add New Book</h2>
          <p>Fill in the details below to add a book to inventory</p>
        </div>
      </div>

      <div className="content-card">
        {error && <p className="error-text">{error}</p>}

        <BookForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText="Save Book"
        />

        <Link to="/" className="secondary-link">
          Cancel and go back
        </Link>
      </div>
    </section>
  );
}

export default AddBookPage;