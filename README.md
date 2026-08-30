# 🎵 STEMSHITS — Jogo de Tabuleiro Musical com Stems e QR Code

<div align="center">
  <h3>Adivinhe a música pelos instrumentos isolados e avance no tabuleiro!</h3>
  <p>Um jogo híbrido físico e digital inspirado em jogos modernos de trivia musical e tabuleiros de estratégia.</p>
</div>

---

## 🎲 Como Funciona o Jogo de Tabuleiro

O **STEMSHITS** combina um tabuleiro físico com cartas reais e um aplicativo web mobile-first para reproduzir os instrumentos isolados (*stems*) da música:

1. **Jogue o Dado e Avance no Tabuleiro:**
   - **🟢 Casa Verde:** Compre uma carta da **Pilha Fácil** (Músicas muito populares / hits globais).
   - **🟡 Casa Amarela:** Compre uma carta da **Pilha Média** (Hits com introduções instrumentais mais sutis).
   - **🔴 Casa Vermelha:** Compre uma carta da **Pilha Difícil** (Arranjos complexos, faixas eletrônicas ou clássicos desafiadores).
   - **⭐ Casas Especiais:** Duelo de ouvidos, roubo de pontos ou cartas com "Par de Instrumentos".

2. **Escaneie o QR Code da Carta:**
   - O jogador da vez aponta a câmera do celular para o **QR Code** impresso na carta física. O aplicativo carrega a faixa instantaneamente no modo secreto (sem revelar nome nem artista).

3. **Ouça as Camadas de Áudio (Stems):**
   - A música começa tocando **apenas a 1ª camada (Bateria)**.
   - **Acertar com 1 instrumento (Bateria):** Ganha **+5 Pontos** (ou avança 5 casas!) 👑
   - **Desbloquear 2º instrumento:** Ganha **+4 Pontos** (ou avança 4 casas)
   - **Desbloquear 3º instrumento:** Ganha **+3 Pontos** (ou avança 3 casas)
   - **Desbloquear 4º instrumento:** Ganha **+2 Pontos** (ou avança 2 casas)
   - **Desbloquear 5º instrumento (Voz Principal):** Ganha **+1 Ponto** (ou avança 1 casa)

4. **Revele e Pause:**
   - Ao clicar em **"Revelar Artista & Resposta"**, a música pausa imediatamente e o aplicativo exibe o gabarito oficial com ano de lançamento, visualizações no YouTube, curiosidades e a pontuação conquistada.

---

## 📱 Recursos do Aplicativo Web

- **Mobile-First & Ergonômico:** Controles com área de toque mínima de 48px e barra de ações fixa no rodapé do celular para jogar com apenas uma mão na mesa.
- **Engine de Áudio Cumulativo Sem Latência:** Troca suave e contínua entre as faixas pré-mixadas (`1.mp3` até `5.mp3`), preservando o ponto exato da reprodução sem eco ou sobreposição.
- **Leitor de QR Code Integrado:** Suporte à câmera traseira de smartphones e digitação manual de código de carta (`CARD-001` a `CARD-010`).
- **Simulador de Cartas 3D:** Pré-visualize as cartas físicas, gere QR codes em tempo real e vire a carta para conferir o gabarito.
- **Suporte a Neon Postgres & Fallback Local:** Funciona localmente de forma autônoma e possui conexão nativa com banco de dados serverless Neon (Vercel).

---

## 🎶 Músicas Iniciais no Baralho (10 Faixas / 50 Arquivos de Áudio)

| Carta | Artista & Música | Ano | Views YouTube | Dificuldade | Instrumentos Isolados |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **CARD-001** | **The Weeknd** – *Blinding Lights* | 2019 | 1.0B | 🟢 Fácil (par 1) | 1. Bateria \| 2. Synth 1+2 \| 3. Synth 3 \| 4. Synth 4 \| 5. Voz Principal |
| **CARD-002** | **LMFAO** – *Party Rock Anthem* | 2011 | 2.6B | 🔴 Difícil (par 4) | 1. Bateria \| 2. Baixo \| 3. Synth 1 \| 4. Synth 2 \| 5. Voz |
| **CARD-003** | **The Police** – *Every Breath You Take* | 1983 | 1.7B | 🟢 Fácil (par 2) | 1. Bateria \| 2. Baixo \| 3. Órgão + Cordas \| 4. Guitarra \| 5. Voz |
| **CARD-004** | **Billie Eilish** – *Bad Guy* | 2019 | 1.3B | 🟢 Fácil (par 1) | 1. Bateria \| 2. Baixo \| 3. Backing 1 \| 4. Backing 2 \| 5. Voz Principal |
| **CARD-005** | **OneRepublic** – *Counting Stars* | 2013 | 4.4B | 🟢 Fácil (par 2) | 1. Bateria + Baixo \| 2. Piano \| 3. Violão + Cordas \| 4. Synth \| 5. Voz |
| **CARD-006** | **Katy Perry** – *Roar* | 2013 | 4.3B | 🟡 Médio (par 3) | 1. Bateria \| 2. Baixo \| 3. Synth 1+2 \| 4. Guitarra 1+2 \| 5. Voz |
| **CARD-007** | **Lady Gaga** – *Born This Way* | 2011 | 326M | 🟢 Fácil (par 2) | 1. Bateria + Baixo \| 2. Synth \| 3. Guitarra \| 4. Backing \| 5. Voz |
| **CARD-008** | **Lynyrd Skynyrd** – *Sweet Home Alabama* | 1974 | 143M | 🟢 Fácil (par 2) | 1. Bateria \| 2. Baixo \| 3. Piano \| 4. Guitarra \| 5. Voz |
| **CARD-009** | **Drake** – *Hotline Bling* | 2015 | 2.1B | 🟢 Fácil (par 1) | 1. Bateria \| 2. Baixo \| 3. Synth \| 4. Órgão \| 5. Voz |
| **CARD-010** | **Maroon 5** – *Moves Like Jagger* | 2010 | 852M | 🔴 Difícil (par 4) | 1. Bateria \| 2. Baixo \| 3. Synth \| 4. Guitarra + Assobio \| 5. Voz |

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones & Animações:** [Lucide Icons](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Leitor de QR Code:** [Html5-QRCode](https://github.com/mebjas/html5-qrcode) + [qrcode.react](https://github.com/zpao/qrcode.react)
- **Banco de Dados:** [Neon Postgres Serverless](https://neon.tech/) com fallback in-memory automático.

---

## 📦 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/WesleyFreitsz/stemshits.git
cd stemshits

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador do seu computador ou acesse via IP local pelo celular na mesma rede Wi-Fi.

---

## 🗄️ Banco de Dados (Neon Postgres)

Para salvar e gerenciar centenas de músicas no Neon Postgres:
1. Copie o arquivo `.env.example` para `.env.local` e preencha com a sua `DATABASE_URL` do Neon.
2. Execute o arquivo `src/lib/schema.sql` no console SQL do Neon para criar as tabelas e carregar o seed das cartas.
*(Se não configurar uma URL, o app funciona com o banco em memória local em `src/lib/deck-data.ts`).*
