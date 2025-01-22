import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      select: {
        category_id: true,
        name: true,
        slug: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
} 