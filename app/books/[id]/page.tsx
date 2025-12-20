"use client";

import { useEffect, useRef, useState } from "react";
import { books } from "@/app/lib/books";

type Props = {
  params: Promise<{ id: string }>;
};

export default function BookPage({ params }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [bookId, setBookId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 1️⃣ Unwrap params (ALWAYS runs)
  useEffect(() => {
    params.then((p) => setBookId(p.id));
  }, [params]);

  const book = books.find((b) => b.id === bookId);
  const storageKey = book ? `book-progress-${book.id}` : null;

  // 2️⃣ Restore last page (ALWAYS declared, guarded inside)
  useEffect(() => {
    if (!storageKey || !book) return;

    const savedPage = localStorage.getItem(storageKey);
    if (savedPage) {
      const page = Number(savedPage);
      setCurrentPage(page);

      requestAnimationFrame(() => {
        scrollToPage(page, false);
      });
    }
  }, [storageKey, book]);

  const scrollToPage = (page: number, save = true) => {
    if (!containerRef.current || !storageKey) return;

    const container = containerRef.current;
    const pageWidth = container.clientWidth;

    container.scrollTo({
      left: (page - 1) * pageWidth,
      behavior: "smooth",
    });

    setCurrentPage(page);

    if (save) {
      localStorage.setItem(storageKey, String(page));
    }
  };

  // 🟡 Safe render guards (JSX only)
  if (!book) {
    return <div>Loading book…</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Page indicator */}
      <div style={{ textAlign: "center", padding: "8px", fontSize: "14px" }}>
        Page {currentPage} / {book.totalPages}
      </div>

      {/* Pages */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "hidden",
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
