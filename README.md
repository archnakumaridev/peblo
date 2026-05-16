# Peblo Notes

A modern, AI-powered notes workspace built with Next.js, Prisma, and TypeScript. Write notes, get AI-generated summaries, share publicly, and track your productivity — all in one clean interface.

---

## Features

### Authentication
- Signup and login with email and password
- JWT-based session stored in a secure httpOnly cookie
- Protected routes via Next.js middleware
- Logout clears session instantly

### Notes
- Create, edit, and delete notes
- Auto-save while typing (debounced 800ms)
- Archive and restore notes
- Add and remove tags per note
- Search by keyword across title and content
- Filter by tag or archived status

### AI
- Generate a summary of any note
- Extract action items automatically
- Get a suggested title based on content
- AI usage tracked per note and shown in dashboard
- Powered by Groq (free, no credit card needed)

### Public Sharing
- Generate a unique public link for any note
- Shared notes are readable without login
- Revoke the link anytime to make a note private

### Dashboard
- Total active notes count
- Recently edited notes
- Most-used tags
- AI usage statistics
- Weekly activity chart (last 7 days)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite via Prisma ORM |
| Auth | Custom JWT with `jose` + `bcryptjs` |
| AI | Groq API (`llama3-8b-8192`) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/peblo-notes.git
cd peblo-notes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-long-random-secret-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GROQ_API_KEY="your-groq-api-key-here"
```

> Get a free Groq API key at [console.groq.com](https://console.groq.com) — no credit card required.

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/             # Login and signup pages
│   ├── (app)/              # Protected app pages
│   │   ├── dashboard/      # Analytics and insights
│   │   └── notes/          # Notes list and editor
│   ├── shared/[slug]/      # Public shared note page
│   └── api/                # All API route handlers
├── components/
│   ├── auth/               # LoginForm, SignupForm
│   ├── notes/              # NotesList, NoteEditor, AiPanel, TagInput
│   ├── dashboard/          # StatsCards, WeeklyChart, TopTags
│   └── ui/                 # Button, Input, Sidebar, Topbar
├── hooks/                  # useNotes, useNote, useDashboard, useUser
├── lib/                    # prisma.ts, session.ts, api.ts
└── types/                  # Shared TypeScript types
```

---

## API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create a new account |
| POST | `/api/auth/login` | Login with email and password |
| POST | `/api/auth/logout` | Clear session cookie |
| GET | `/api/auth/me` | Get current logged-in user |

**Signup request:**
```json
{
  "name": "Ayan Sharma",
  "email": "ayan@example.com",
  "password": "ayan1234"
}
```

**Login request:**
```json
{
  "email": "ayan@example.com",
  "password": "ayan1234"
}
```

---

### Notes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Get all notes (supports search and filters) |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/:id` | Get a single note |
| PATCH | `/api/notes/:id` | Update title, content, tags, or archived |
| DELETE | `/api/notes/:id` | Delete a note permanently |

**Query params for GET /api/notes:**
```
?search=exam          search by keyword
?tag=bca              filter by tag name
?archived=true        show archived notes only
```

**Create note request:**
```json
{
  "title": "BCA Exam Prep",
  "content": "Need to revise networking topics for the exam.",
  "tags": ["exam", "bca"]
}
```

**Update note request (partial):**
```json
{
  "title": "Updated Title"
}
```

---

### AI

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes/:id/generate` | Generate summary, action items, and suggested title |

**Response:**
```json
{
  "summary": "The upcoming college exam will cover Network topics from the BCA curriculum.",
  "action_items": [
    "Review Network fundamentals",
    "Practice with sample questions"
  ],
  "suggested_title": "BCA Network Exam Preparation"
}
```

---

### Sharing

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes/:id/share` | Generate a public share link |
| DELETE | `/api/notes/:id/share` | Remove the share link |
| GET | `/api/shared/:slug` | Get public note by slug (no auth) |

**Share response:**
```json
{
  "slug": "JvPvwNADZP",
  "url": "/shared/JvPvwNADZP"
}
```

---

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Get all productivity insights |

**Response:**
```json
{
  "totalNotes": 1,
  "recentNotes": [
    { "id": "...", "title": "BCA Exam Prep", "updatedAt": "2026-05-15T18:25:59.559Z" }
  ],
  "topTags": [
    { "name": "exam", "count": 1 },
    { "name": "bca", "count": 1 }
  ],
  "aiUsageCount": 2,
  "weeklyActivity": [
    { "day": "2026-05-09", "count": 0 },
    { "day": "2026-05-15", "count": 1 }
  ]
}
```

---

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  notes     Note[]
}

model Note {
  id          String   @id @default(cuid())
  title       String
  content     String   @default("")
  archived    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  tags        Tag[]
  shareLink   ShareLink?
  aiSummary   String?
  aiActions   String?
  aiSuggestedTitle String?
  aiUsageCount Int     @default(0)
}

model Tag {
  id    String @id @default(cuid())
  name  String  @unique
  notes Note[]
}

model ShareLink {
  id        String   @id @default(cuid())
  slug      String   @unique
  noteId    String   @unique
  note      Note     @relation(fields: [noteId], references: [id],onDelete:Cascade)
  createdAt DateTime @default(now())
}
```

---

## How Auth Works

1. User signs up → password hashed with `bcryptjs`
2. On login → password verified → JWT signed with `jose`
3. JWT stored as an `httpOnly` cookie (JS cannot read it — XSS safe)
4. Middleware verifies cookie on every protected route
5. API routes call `getSession()` to get `userId` and query only that user's data
6. Logout deletes the cookie

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite file path e.g. `file:./dev.db` |
| `JWT_SECRET` | Long random string used to sign JWT tokens |
| `NEXT_PUBLIC_APP_URL` | Base URL e.g. `http://localhost:3000` |
| `GROQ_API_KEY` | Free API key from console.groq.com |

---

## .env.example

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=
NEXT_PUBLIC_APP_URL=
GROQ_API_KEY=
```

---

## License

MIT