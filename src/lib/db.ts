import { neon } from '@neondatabase/serverless';
import { Song } from './types';
import { COMPLETE_200_DECK } from './deck-data';

function getNeonSql() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) return null;
  return neon(connectionString);
}

export async function getSongById(id: string): Promise<Song | null> {
  const sql = getNeonSql();
  
  if (sql) {
    try {
      const songRows = await sql`
        SELECT * FROM songs WHERE id = ${id} OR card_code = ${id} LIMIT 1
      `;
      if (songRows && songRows.length > 0) {
        const row = songRows[0];
        const stemRows = await sql`
          SELECT * FROM stems WHERE song_id = ${row.id} ORDER BY stem_number ASC
        `;
        return {
          id: row.id,
          cardCode: row.card_code,
          title: row.title,
          artist: row.artist,
          releaseYear: row.release_year,
          youtubeViews: row.youtube_views,
          difficulty: row.difficulty,
          difficultyLabel: row.difficulty_label || row.difficulty,
          pile: row.pile || (row.difficulty === 'facil' ? 'verde' : row.difficulty === 'medio' ? 'amarela' : 'vermelha'),
          genre: row.genre,
          spotifyUrl: row.spotify_url,
          coverImage: row.cover_image,
          hint: row.hint,
          stems: stemRows.map((s: any) => ({
            number: s.stem_number,
            name: s.name,
            category: s.category,
            audioPath: s.audio_path,
            unlocked: s.stem_number === 1
          }))
        };
      }
    } catch (err) {
      console.warn('Erro ao consultar Neon Postgres, usando dados locais:', err);
    }
  }

  // Fallback no baralho completo de 200 cartas
  const cleanId = id.toLowerCase().trim();
  
  // 1. Busca por Card Code exato (ex: CARD-001 até CARD-200)
  const foundByCode = COMPLETE_200_DECK.find(
    s => s.cardCode.toLowerCase() === cleanId ||
         s.cardCode.toLowerCase().replace('-', '') === cleanId.replace('-', '')
  );
  if (foundByCode) return foundByCode;

  // 2. Busca por ID slug
  const foundById = COMPLETE_200_DECK.find(s => s.id.toLowerCase() === cleanId);
  if (foundById) return foundById;

  // 3. Busca por título
  const foundByTitle = COMPLETE_200_DECK.find(
    s => s.title.toLowerCase().includes(cleanId) ||
         cleanId.includes(s.title.toLowerCase())
  );
  if (foundByTitle) return foundByTitle;

  return COMPLETE_200_DECK[0];
}

export async function getAllCards(): Promise<Song[]> {
  const sql = getNeonSql();
  if (sql) {
    try {
      const songRows = await sql`SELECT * FROM songs ORDER BY card_code ASC`;
      if (songRows && songRows.length > 0) {
        const results: Song[] = [];
        for (const row of songRows) {
          const stemRows = await sql`SELECT * FROM stems WHERE song_id = ${row.id} ORDER BY stem_number ASC`;
          results.push({
            id: row.id,
            cardCode: row.card_code,
            title: row.title,
            artist: row.artist,
            releaseYear: row.release_year,
            youtubeViews: row.youtube_views,
            difficulty: row.difficulty,
            difficultyLabel: row.difficulty_label || row.difficulty,
            pile: row.pile,
            genre: row.genre,
            spotifyUrl: row.spotify_url,
            coverImage: row.cover_image,
            hint: row.hint,
            stems: stemRows.map((s: any) => ({
              number: s.stem_number,
              name: s.name,
              category: s.category,
              audioPath: s.audio_path,
              unlocked: s.stem_number === 1
            }))
          });
        }
        return results;
      }
    } catch (err) {
      console.warn('Neon Postgres indisponível, retornando baralho local de 200 cartas:', err);
    }
  }
  return COMPLETE_200_DECK;
}
