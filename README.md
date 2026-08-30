# 🎵 Hitster Stems (Bandle Edition)

Jogo de tabuleiro e cartas musicais inspirado na dinâmica social do **Hitster** e no sistema de faixas isoladas do **Bandle**.

---

## 🚀 Como Funciona

1. **Pegue a Carta Física:** Cada carta possui um **QR Code**, ano de lançamento (2019), visualizações no YouTube (1 Bilhão+) e nível de dificuldade (🟢 Fácil).
2. **Escaneie com a Câmera:** O jogador da vez aponta a câmera do celular para o QR Code da carta. O navegador abre a rodada instantaneamente.
3. **Ouça os Instrumentos (Stems):**
   - A música começa tocando **apenas a Bateria** (1º instrumento).
   - Acertar com 1 instrumento = **+5 Pontos** ⭐⭐⭐⭐⭐
   - Desbloquear Sintetizador 1 + 2 = **+4 Pontos** ⭐⭐⭐⭐
   - Desbloquear Sintetizador 3 = **+3 Pontos** ⭐⭐⭐
   - Desbloquear Sintetizador 4 = **+2 Pontos** ⭐⭐
   - Desbloquear Voz Principal = **+1 Ponto** ⭐
4. **Revele e Ouça no Spotify:** Ao clicar em *Revelar*, o app comemora com confetes, exibe a resposta (*The Weeknd - Blinding Lights*), soma os pontos e oferece link direto para a faixa completa no Spotify.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14+ / React 19** (App Router, Tailwind CSS)
- **Web Audio API** (Sincronização 100% precisa e sem latência de 5 canais de áudio)
- **Html5-QRCode** (Leitor de QR Code integrado para câmeras traseiras de celulares e webcams)
- **Neon Postgres (Vercel)** (Armazenamento escalável de cartas, músicas, stems e histórico)
- **Canvas Confetti & Framer Motion** (Micro-interações e celebração)

---

## 📦 Como Rodar Localmente

```bash
# 1. Entrar na pasta do projeto
cd C:\Users\wesle\.gemini\antigravity\scratch\music-hitster-game

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🗄️ Configuração do Banco Neon Postgres (Opcional para produção)

1. Crie um projeto no [Neon.tech](https://neon.tech) ou adicione a integração Neon Postgres no dashboard da [Vercel](https://vercel.com).
2. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Cole a sua `DATABASE_URL` no `.env.local`.
4. Execute o script `src/lib/schema.sql` no console SQL do Neon para criar as tabelas e dados iniciais.
*(Obs: Se você não configurar a DATABASE_URL, o app funciona perfeitamente utilizando o banco de dados em memória local já configurado com a música Blinding Lights).*
