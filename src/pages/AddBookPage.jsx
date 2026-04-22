import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/common/BookForm';
import { createBook } from '../services/bookService';

/* ===== Initial Form State ===== */
const initialFormData = {
  title: '',
  author: '',
  publisher: '',
  publishedDate: '',
  email: '',
  recommendedAge: '',
  description: '',
};

/* ===== Validation Function ===== */
const validateForm = (data) => {
  const errors = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!data.author.trim()) {
    errors.author = 'Author is required';
  }

  if (!data.publisher.trim()) {
    errors.publisher = 'Publisher is required';
  }

  if (!data.publishedDate) {
    errors.publishedDate = 'Published date is required';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.recommendedAge) {
    errors.recommendedAge = 'Age is required';
  } else if (Number(data.recommendedAge) <= 0) {
    errors.recommendedAge = 'Age must be positive';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  return errors;
};

/* ===== Component ===== */
function AddBookPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  /* ===== Handle Input Change ===== */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Optional: remove error while typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  /* ===== Handle Submit ===== */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Stop if errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

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

  /* ===== UI ===== */
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
          errors={errors}
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