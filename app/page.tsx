'use client';

import { useEffect, useState } from 'react';

type Book = {
  id: number;
  title: string;
  level: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>EikenCoach</h1>

      <h2>Book Library</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> — {book.level}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
