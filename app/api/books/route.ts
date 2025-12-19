import { NextResponse } from 'next/server';
import { books } from '@/app/lib/data';

export async function GET() {
  return NextResponse.json(books);
}
