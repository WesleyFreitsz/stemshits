-- ==========================================================
-- STEMSHITS Game - Esquema do Banco de Dados (Neon Postgres)
-- ==========================================================

CREATE TABLE IF NOT EXISTS songs (
    id VARCHAR(100) PRIMARY KEY,
    card_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    youtube_views VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('facil', 'medio', 'dificil')),
    difficulty_label VARCHAR(100),
    genre VARCHAR(100) NOT NULL,
    spotify_url TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    hint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stems (
    id SERIAL PRIMARY KEY,
    song_id VARCHAR(100) REFERENCES songs(id) ON DELETE CASCADE,
    stem_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    audio_path TEXT NOT NULL,
    CONSTRAINT unique_song_stem UNIQUE (song_id, stem_number)
);

-- ==========================================================
-- SEED DE TODAS AS 10 MÚSICAS
-- ==========================================================

-- 1. The Weeknd - Blinding Lights
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('blinding-lights', 'CARD-001', 'Blinding Lights', 'The Weeknd', 2019, '1.0B Views', 'facil', 'Fácil (par 1)', 'Synthwave / Synth-pop', 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b', 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80', 'Lançada em 2019, quebrou recordes da Billboard com sintetizadores inesquecíveis.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('blinding-lights', 1, 'Bateria', 'drums', '/audio/blinding-lights/1.mp3'),
    ('blinding-lights', 2, 'Sintetizador 1 + 2', 'synth', '/audio/blinding-lights/2.mp3'),
    ('blinding-lights', 3, 'Sintetizador 3', 'synth', '/audio/blinding-lights/3.mp3'),
    ('blinding-lights', 4, 'Sintetizador 4', 'synth', '/audio/blinding-lights/4.mp3'),
    ('blinding-lights', 5, 'Voz Principal', 'vocals', '/audio/blinding-lights/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 2. LMFAO - Party Rock Anthem
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('party-rock-anthem', 'CARD-002', 'Party Rock Anthem', 'LMFAO ft. Lauren Bennett, GoonRock', 2011, '2.6B Views', 'dificil', 'Difícil (par 4)', 'Electro Pop / Dance', 'https://open.spotify.com/track/0IkKz2J9ayMu9neAio4VgG', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80', 'O hino eletrônico de 2011 que consagrou o shuffle dance.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('party-rock-anthem', 1, 'Bateria', 'drums', '/audio/party-rock-anthem/1.mp3'),
    ('party-rock-anthem', 2, 'Baixo', 'bass', '/audio/party-rock-anthem/2.mp3'),
    ('party-rock-anthem', 3, 'Sintetizador 1', 'synth', '/audio/party-rock-anthem/3.mp3'),
    ('party-rock-anthem', 4, 'Sintetizador 2', 'synth', '/audio/party-rock-anthem/4.mp3'),
    ('party-rock-anthem', 5, 'Voz', 'vocals', '/audio/party-rock-anthem/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 3. The Police - Every Breath You Take
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('every-breath-you-take', 'CARD-003', 'Every Breath You Take', 'The Police', 1983, '1.7B Views', 'facil', 'Fácil (par 2)', 'Classic Rock / New Wave', 'https://open.spotify.com/track/1JSTJqkT5qHq89iSSzpkQA', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80', 'Um dos maiores clássicos dos anos 80.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('every-breath-you-take', 1, 'Bateria', 'drums', '/audio/every-breath-you-take/1.mp3'),
    ('every-breath-you-take', 2, 'Baixo', 'bass', '/audio/every-breath-you-take/2.mp3'),
    ('every-breath-you-take', 3, 'Órgão + Cordas', 'synth', '/audio/every-breath-you-take/3.mp3'),
    ('every-breath-you-take', 4, 'Guitarra', 'guitar', '/audio/every-breath-you-take/4.mp3'),
    ('every-breath-you-take', 5, 'Voz', 'vocals', '/audio/every-breath-you-take/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 4. Billie Eilish - Bad Guy
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('bad-guy', 'CARD-004', 'Bad Guy', 'Billie Eilish', 2019, '1.3B Views', 'facil', 'Fácil (par 1)', 'Electropop / Alternative', 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92v4426', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80', 'Hit vencedor de Grammys com batida marcante e atmosfera minimalista.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('bad-guy', 1, 'Bateria', 'drums', '/audio/bad-guy/1.mp3'),
    ('bad-guy', 2, 'Baixo', 'bass', '/audio/bad-guy/2.mp3'),
    ('bad-guy', 3, 'Vocais de Apoio 1', 'vocals', '/audio/bad-guy/3.mp3'),
    ('bad-guy', 4, 'Vocais de Apoio 2', 'vocals', '/audio/bad-guy/4.mp3'),
    ('bad-guy', 5, 'Voz Principal', 'vocals', '/audio/bad-guy/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 5. OneRepublic - Counting Stars
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('counting-stars', 'CARD-005', 'Counting Stars', 'OneRepublic', 2013, '4.4B Views', 'facil', 'Fácil (par 2)', 'Pop Rock / Folk Pop', 'https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80', 'Com mais de 4 bilhões de visualizações, um dos maiores hinos pop rock de 2013.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('counting-stars', 1, 'Bateria + Baixo', 'drums', '/audio/counting-stars/1.mp3'),
    ('counting-stars', 2, 'Piano', 'synth', '/audio/counting-stars/2.mp3'),
    ('counting-stars', 3, 'Violão + Cordas', 'guitar', '/audio/counting-stars/3.mp3'),
    ('counting-stars', 4, 'Sintetizador', 'synth', '/audio/counting-stars/4.mp3'),
    ('counting-stars', 5, 'Voz', 'vocals', '/audio/counting-stars/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 6. Katy Perry - Roar
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('roar', 'CARD-006', 'Roar', 'Katy Perry', 2013, '4.3B Views', 'medio', 'Médio (par 3)', 'Power Pop', 'https://open.spotify.com/track/6F5c583bxiGEbVfZJUMxCn', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80', 'Hino pop motivacional estrondoso com mais de 4 bilhões de views.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('roar', 1, 'Bateria', 'drums', '/audio/roar/1.mp3'),
    ('roar', 2, 'Baixo', 'bass', '/audio/roar/2.mp3'),
    ('roar', 3, 'Sintetizador 1 + 2', 'synth', '/audio/roar/3.mp3'),
    ('roar', 4, 'Guitarra 1 + 2', 'guitar', '/audio/roar/4.mp3'),
    ('roar', 5, 'Voz', 'vocals', '/audio/roar/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 7. Lady Gaga - Born This Way
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('born-this-way', 'CARD-007', 'Born This Way', 'Lady Gaga', 2011, '326M Views', 'facil', 'Fácil (par 2)', 'Electropop / Dance-pop', 'https://open.spotify.com/track/3ZE3wv8V3w2T2e79nfSVeg', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80', 'Hino icônico de empoderamento e batida eletrizante dos anos 2010.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('born-this-way', 1, 'Bateria + Baixo', 'drums', '/audio/born-this-way/1.mp3'),
    ('born-this-way', 2, 'Sintetizador', 'synth', '/audio/born-this-way/2.mp3'),
    ('born-this-way', 3, 'Guitarra', 'guitar', '/audio/born-this-way/3.mp3'),
    ('born-this-way', 4, 'Vocais de Apoio', 'vocals', '/audio/born-this-way/4.mp3'),
    ('born-this-way', 5, 'Voz', 'vocals', '/audio/born-this-way/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 8. Lynyrd Skynyrd - Sweet Home Alabama
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('sweet-home-alabama', 'CARD-008', 'Sweet Home Alabama', 'Lynyrd Skynyrd', 1974, '143M Views', 'facil', 'Fácil (par 2)', 'Southern Rock', 'https://open.spotify.com/track/7e89621qvXCYwgdi257GLV', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80', 'O riff de guitarra e piano sulista mais famoso da história do rock.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('sweet-home-alabama', 1, 'Bateria', 'drums', '/audio/sweet-home-alabama/1.mp3'),
    ('sweet-home-alabama', 2, 'Baixo', 'bass', '/audio/sweet-home-alabama/2.mp3'),
    ('sweet-home-alabama', 3, 'Piano', 'synth', '/audio/sweet-home-alabama/3.mp3'),
    ('sweet-home-alabama', 4, 'Guitarra', 'guitar', '/audio/sweet-home-alabama/4.mp3'),
    ('sweet-home-alabama', 5, 'Voz', 'vocals', '/audio/sweet-home-alabama/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 9. Drake - Hotline Bling
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('hotline-bling', 'CARD-009', 'Hotline Bling', 'Drake', 2015, '2.1B Views', 'facil', 'Fácil (par 1)', 'R&B / Hip-hop', 'https://open.spotify.com/track/0wwPcA6wtMf6HUM3IRdeP7', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', 'Hit global de 2015 com samples de órgão e batida suave de cha-cha.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('hotline-bling', 1, 'Bateria', 'drums', '/audio/hotline-bling/1.mp3'),
    ('hotline-bling', 2, 'Baixo', 'bass', '/audio/hotline-bling/2.mp3'),
    ('hotline-bling', 3, 'Sintetizador', 'synth', '/audio/hotline-bling/3.mp3'),
    ('hotline-bling', 4, 'Órgão', 'synth', '/audio/hotline-bling/4.mp3'),
    ('hotline-bling', 5, 'Voz', 'vocals', '/audio/hotline-bling/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;

-- 10. Maroon 5 - Moves Like Jagger
INSERT INTO songs (id, card_code, title, artist, release_year, youtube_views, difficulty, difficulty_label, genre, spotify_url, cover_image, hint)
VALUES ('moves-like-jagger', 'CARD-010', 'Moves Like Jagger', 'Maroon 5 ft. Christina Aguilera', 2010, '852M Views', 'dificil', 'Difícil (par 4)', 'Dance-pop / Funk-pop', 'https://open.spotify.com/track/7LcfA9hZyzs2jN97Sj99rC', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80', 'Batida eletro-funk com o assobio lendário e vocais de Adam Levine e Christina Aguilera.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, artist = EXCLUDED.artist, difficulty_label = EXCLUDED.difficulty_label;

INSERT INTO stems (song_id, stem_number, name, category, audio_path) VALUES
    ('moves-like-jagger', 1, 'Bateria', 'drums', '/audio/moves-like-jagger/1.mp3'),
    ('moves-like-jagger', 2, 'Baixo', 'bass', '/audio/moves-like-jagger/2.mp3'),
    ('moves-like-jagger', 3, 'Sintetizador', 'synth', '/audio/moves-like-jagger/3.mp3'),
    ('moves-like-jagger', 4, 'Guitarra + Assobio', 'guitar', '/audio/moves-like-jagger/4.mp3'),
    ('moves-like-jagger', 5, 'Voz', 'vocals', '/audio/moves-like-jagger/5.mp3')
ON CONFLICT (song_id, stem_number) DO UPDATE SET name = EXCLUDED.name, audio_path = EXCLUDED.audio_path;
