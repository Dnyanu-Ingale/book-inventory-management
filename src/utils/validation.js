export const validateBookForm = (data) => {
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