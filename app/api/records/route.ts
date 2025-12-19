import { NextResponse } from 'next/server';
import { records } from '@/app/lib/data';

export async function POST(request: Request) {
  const body = await request.json();

  records.push({
    studentId: body.studentId,
    bookId: body.bookId,
    date: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    records,
  });
}

export async function GET() {
  return NextResponse.json(records);
}
