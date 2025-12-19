"use client";

import { useRef, useState } from "react";
import { books } from "@/app/lib/books";

type Props = {
  params: Promise<{ id: string }>;
};

export default function BookPage({ params }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // unwrap params (Next.js 16)
  const [bookId, setBookId] = useState<string | null>(null);

  if (!bookId) {
    params.then((p) => setBookId(p.id));
    return null;
  }

  const book = books.find((b) => b.id === bookId);
  if (!book) return <div>Book not found</div>;

  const scrollToPage = (page: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const pageWidth = container.clientWidth;

    container.scrollTo({
      left: (page - 1) * pageWidth,
      behavior: "smooth",
    });

    setCurrentPage(page);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Page indicator */}
      <div style={{ textAlign: "center", padding: "8px", fontSize: "14px" }}>
        Page {currentPage} / {book.totalPages}
      </div>

      {/* Book pages */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowX: "hidden",
          display: "flex",
        }}
      >
        {Array.from({ length: book.totalPages }).map((_, i) => {
          const pageNumber = String(i + 1).padStart(2, "0");

          return (
            <img
              key={i}
              src={`/books/${book.id}/${pageNumber}.png`}
              alt={`Page ${i + 1}`}
              style={{
                width: "100vw",
                height: "100%",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => scrollToPage(currentPage - 1)}
        >
          ⬅️ Prev
        </button>

        <button
          disabled={currentPage === book.totalPages}
          onClick={() => scrollToPage(currentPage + 1)}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
