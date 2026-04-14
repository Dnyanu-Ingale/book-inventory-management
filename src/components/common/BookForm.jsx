function BookForm({ formData, onChange, onSubmit, isSubmitting, submitButtonText }) {
  return (
    <form className="book-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter book title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={onChange}
          placeholder="Enter author name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="publisher">Publisher</label>
        <input
          id="publisher"
          name="publisher"
          type="text"
          value={formData.publisher}
          onChange={onChange}
          placeholder="Enter publisher name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">Published Date</label>
        <input
          id="publishedDate"
          name="publishedDate"
          type="date"
          value={formData.publishedDate}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Publisher Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter publisher email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="recommendedAge">Recommended Age</label>
        <input
          id="recommendedAge"
          name="recommendedAge"
          type="number"
          value={formData.recommendedAge}
          onChange={onChange}
          placeholder="Enter recommended age"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter description"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default BookForm;