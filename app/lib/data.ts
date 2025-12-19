// Fake in-memory database

export const books = [
  { id: 1, title: 'The Red Ball', level: 'Eiken 5' },
  { id: 2, title: 'The Lost Cat', level: 'Eiken 5' },
  { id: 3, title: 'Space Adventure', level: 'Eiken 5' },
  { id: 4, title: 'My Blue Bike', level: 'Eiken 5' },
  { id: 5, title: 'The Big Tree', level: 'Eiken 5' },
  { id: 6, title: 'A Day at the Zoo', level: 'Eiken 5' },
  { id: 7, title: 'The Magic Hat', level: 'Eiken 5' },
  { id: 8, title: 'Tom and the Dog', level: 'Eiken 5' },
  { id: 9, title: 'The Small House', level: 'Eiken 5' },
  { id: 10, title: 'Fun in the Park', level: 'Eiken 5' },
];

export const students = [
  { id: 1, name: 'Dean' },
  { id: 2, name: 'Anna' },
];

export const records: {
  studentId: number;
  bookId: number;
  date: string;
}[] = [];
