import { NextRequest, NextResponse } from 'next/server';
import { getSongById } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const song = await getSongById(id);

    if (!song) {
      return NextResponse.json(
        { error: `Música ou carta '${id}' não encontrada.` },
        { status: 404 }
      );
    }

    return NextResponse.json(song);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro interno ao consultar dados da música.', details: error?.message },
      { status: 500 }
    );
  }
}
