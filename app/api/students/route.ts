import { NextResponse } from 'next/server';
import { students } from '@/app/lib/data';

export async function GET() {
  return NextResponse.json(students);
}
