import { useState } from 'react';
import BookTable from '../components/common/BookTable';

function HomePage() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
  ]);

  const handleView = (book) => {
    console.log('View:', book);
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
        <BookTable
          books={books}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}

export default HomePage;