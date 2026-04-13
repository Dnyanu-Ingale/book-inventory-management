import { useParams } from 'react-router-dom';

function BookDetailsPage() {
  const { id } = useParams();

  return (
    <section className="page">
      <div className="page-header">
        <h2>Book Details</h2>
        <p>Details for Book ID: {id}</p>
      </div>

      <div className="content-card">
        <p><strong>Title:</strong> Sample Title</p>
        <p><strong>Author:</strong> Sample Author</p>
        <p><strong>Publisher:</strong> Sample Publisher</p>
        <p><strong>Published Date:</strong> 2024</p>
        <p><strong>Description:</strong> Sample description of the book.</p>
      </div>
    </section>
  );
}

export default BookDetailsPage;