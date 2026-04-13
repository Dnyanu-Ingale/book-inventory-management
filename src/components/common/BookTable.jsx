function BookTable({ books, onView, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No books available
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="actions">
                  <button onClick={() => onView(book)}>View</button>
                  <button onClick={() => onEdit(book)}>Edit</button>
                  <button onClick={() => onDelete(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;