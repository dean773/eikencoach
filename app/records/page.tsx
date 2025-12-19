'use client';

import { useEffect, useState } from 'react';

type Book = { id: number; title: string; level: string };
type Student = { id: number; name: string };
type Record = { studentId: number; bookId: number; date: string };

export default function RecordsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  // Fetch students, books, and records
  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(setStudents);

    fetch('/api/books')
      .then(res => res.json())
      .then(setBooks);

    fetch('/api/records')
      .then(res => res.json())
      .then(setRecords);
  }, []);

  const submitRecord = async () => {
    if (!selectedStudent || !selectedBook) {
      alert('Select a student and a book!');
      return;
    }

    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: selectedStudent,
        bookId: selectedBook
      })
    });

    const data = await res.json();
    setRecords(data.records);
    alert('Record added!');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Reading Records</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          Student:
          <select
            value={selectedStudent ?? ''}
            onChange={e => setSelectedStudent(Number(e.target.value))}
          >
            <option value="">Select student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          Book:
          <select
            value={selectedBook ?? ''}
            onChange={e => setSelectedBook(Number(e.target.value))}
          >
            <option value="">Select book</option>
            {books.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={submitRecord}>Add Record</button>

      <h2 style={{ marginTop: 40 }}>Current Records</h2>
      <ul>
        {records.map((r, i) => {
          const student = students.find(s => s.id === r.studentId)?.name ?? 'Unknown';
          const book = books.find(b => b.id === r.bookId)?.title ?? 'Unknown';
          return <li key={i}>{student} read {book} on {new Date(r.date).toLocaleDateString()}</li>;
        })}
      </ul>
    </main>
  );
}
