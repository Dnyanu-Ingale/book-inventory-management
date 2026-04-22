function BookForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  submitButtonText,
}) {
  return (
    <form className="book-form" onSubmit={onSubmit}>
      {/* Title */}
      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
        />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      {/* Author */}
      <div className="form-group">
        <label>Author</label>
        <input
          name="author"
          type="text"
          value={formData.author}
          onChange={onChange}
        />
        {errors.author && <p className="field-error">{errors.author}</p>}
      </div>

      {/* Publisher */}
      <div className="form-group">
        <label>Publisher</label>
        <input
          name="publisher"
          type="text"
          value={formData.publisher}
          onChange={onChange}
        />
        {errors.publisher && (
          <p className="field-error">{errors.publisher}</p>
        )}
      </div>

      {/* Date */}
      <div className="form-group">
        <label>Published Date</label>
        <input
          name="publishedDate"
          type="date"
          value={formData.publishedDate}
          onChange={onChange}
        />
        {errors.publishedDate && (
          <p className="field-error">{errors.publishedDate}</p>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      {/* Age */}
      <div className="form-group">
        <label>Recommended Age</label>
        <input
          name="recommendedAge"
          type="number"
          value={formData.recommendedAge}
          onChange={onChange}
        />
        {errors.recommendedAge && (
          <p className="field-error">{errors.recommendedAge}</p>
        )}
      </div>

      {/* Description */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={onChange}
        />
        {errors.description && (
          <p className="field-error">{errors.description}</p>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="primary-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default BookForm;