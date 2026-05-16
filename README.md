# Peblo — AI Powered Notes Workspace

Peblo is a modern AI-powered notes and productivity workspace built with Next.js, Prisma, and TypeScript.

It provides a beautiful writing experience with AI-generated summaries, suggested titles, note sharing, tagging, dashboard analytics, dark mode support, and responsive multi-device layouts.

---

# Features

## Authentication

- User signup
- User login
- JWT session authentication
- Protected routes

---

## Notes System

- Create notes
- Edit notes with autosave
- Delete notes
- Archive / restore notes
- Tag support
- Search notes
- Filter archived notes

---

## AI Features

- AI-generated summaries
- AI suggested titles
- AI usage tracking

---

## Public Sharing

- Generate public share links
- Read-only shared note pages

---

## Dashboard

- Total notes analytics
- AI usage statistics
- Weekly activity chart
- Top tags
- Recent notes

---

## UI / UX

- Fully responsive layout
- Dark mode support
- Mobile sidebar
- Clean modern SaaS design
- Optimized editor experience

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons
- Recharts
- next-themes

---

## Backend

- Next.js Route Handlers
- Prisma ORM
- SQLite
- JWT Authentication

---

## clone repo
```bash
git clone https://github.com/your-username/peblo.git
```
cd peblo
npm install

## .env
DATABASE_URL="file:./dev.db"
JWT_SECRET=
NEXT_PUBLIC_APP_URL=
GROQ_API_KEY=

## prisma setup
npx prisma generate
npx prisma generate

## run dev server
npm run dev


## api formats of signup signin logout

signup
url : POST http://localhost:3000/api/auth/signup
 req  = {
  "name":"ayansharma",
  "email":"ayansharma2006@gmail.com",
  "password":"ayan1234"
  
}
res = {
  "success": true
}

signin

url : POST http://localhost:3000/api/auth/login
 req  ={
   "email":"ayansharma2006@gmail.com",
  "password":"ayan1234"
}
res = {
  "success": true
}

logout
url : POST http://localhost:3000/api/auth/logout

res = {
  "success": true
}


## api structure of notes operations
post a note
url : POST http://localhost:3000/api/notes
 req  ={
  "title":"there is a work of college exam",
  "content":"work is giving the exam of networks in bca",
  "tags":["exam", "bca"]
}
res ={
  "title":"there is a work of college exam",
  "content":"work is giving the exam of networks in bca",
  "tags":["exam", "bca"]
}


filter a note'
url : GET http://localhost:3000/api/notes?archived=true

res ={
  "notes": [
    {
      "id": "cmp77gq470001f8pf8b3bxodg",
      "title": "there is a work of assignment ",
      "content": "work is of making a software for the internshala company a full stack project it is ",
      "archived": true,
      "createdAt": "2026-05-15T17:42:49.400Z",
      "updatedAt": "2026-05-15T17:42:49.400Z",
      "userId": "cmp76ezy90000f8pfjlyi1gxw",
      "aiSummary": null,
      "aiActions": null,
      "aiSuggestedTitle": null,
      "aiUsageCount": 0,
      "tags": [
        {
          "id": "cmp77gq4d0002f8pfcze2zypv",
          "name": "full stack"
        },
        {
          "id": "cmp77gq4h0003f8pfsraw0e6h",
          "name": "project"
        }
      ],
      "shareLink": null
    }
  ]
}


get a note
url : GET http://localhost:3000/api/notes/cmp77gq470001f8pf8b3bxodg

res ={
  "id": "cmp77gq470001f8pf8b3bxodg",
  "title": "there is a work of assignment ",
  "content": "work is of making a software for the internshala company a full stack project it is ",
  "archived": true,
  "createdAt": "2026-05-15T17:42:49.400Z",
  "updatedAt": "2026-05-15T17:42:49.400Z",
  "userId": "cmp76ezy90000f8pfjlyi1gxw",
  "aiSummary": null,
  "aiActions": null,
  "aiSuggestedTitle": null,
  "aiUsageCount": 0,
  "tags": [
    {
      "id": "cmp77gq4d0002f8pfcze2zypv",
      "name": "full stack"
    },
    {
      "id": "cmp77gq4h0003f8pfsraw0e6h",
      "name": "project"
    }
  ],
  "shareLink": null
}


update a note
url : PATCH http://localhost:3000/api/notes/cmp77gq470001f8pf8b3bxodg
 req  ={
  "title":"there is assignment work"
}
res ={
  "id": "cmp77gq470001f8pf8b3bxodg",
  "title": "there is assignment work",
  "content": "work is of making a software for the internshala company a full stack project it is ",
  "archived": true,
  "createdAt": "2026-05-15T17:42:49.400Z",
  "updatedAt": "2026-05-15T18:00:35.807Z",
  "userId": "cmp76ezy90000f8pfjlyi1gxw",
  "aiSummary": null,
  "aiActions": null,
  "aiSuggestedTitle": null,
  "aiUsageCount": 0,
  "tags": [
    {
      "id": "cmp77gq4d0002f8pfcze2zypv",
      "name": "full stack"
    },
    {
      "id": "cmp77gq4h0003f8pfsraw0e6h",
      "name": "project"
    }
  ],
  "shareLink": null
}


delete a note
url : DELETE http://localhost:3000/api/notes/cmp77gq470001f8pf8b3bxodg

res ={
  "success": true
}


generate a summary of ai

url : POST http://localhost:3000/api/notes/cmp77iqa80004f8pf3h2vdwfe/generate
res ={
  "summary": "The upcoming college exam will cover Network topics from the BCA curriculum.",
  "action_items": [
    "Review Network fundamentals",
    "Practice with sample questions"
  ],
  "suggested_title": "BCA Network Exam Preparation"
}



share a note or make a link
url : POST http://localhost:3000/api/notes/cmp77iqa80004f8pf3h2vdwfe/share

res = {
  "slug": "JvPvwNADZP",
  "url": "/shared/JvPvwNADZP"
}


shared a note
url : GET http://localhost:3000/api/shared/JvPvwNADZP

res = {
  "title": "there is a work of college exam",
  "content": "work is giving the exam of networks in bca",
  "tags": [
    {
      "id": "cmp77iqaf0005f8pf8y1z5vat",
      "name": "exam"
    },
    {
      "id": "cmp77iqag0006f8pfvwcizwgx",
      "name": "bca"
    }
  ],
  "author": "ayansharma",
  "updatedAt": "2026-05-15T18:25:59.559Z",
  "aiSummary": "The upcoming college exam will cover Network topics from the BCA curriculum."
}


## GEt dashbaord info
url : GET http://localhost:3000/api/dashboard
res ={
  "totalNotes": 1,
  "recentNotes": [
    {
      "id": "cmp77iqa80004f8pf3h2vdwfe",
      "title": "there is a work of college exam",
      "updatedAt": "2026-05-15T18:25:59.559Z"
    }
  ],
  "topTags": [
    {
      "name": "exam",
      "count": 1
    },
    {
      "name": "bca",
      "count": 1
    }
  ],
  "aiUsageCount": 2,
  "weeklyActivity": [
    {
      "day": "2026-05-09",
      "count": 0
    },
    {
      "day": "2026-05-10",
      "count": 0
    },
    {
      "day": "2026-05-11",
      "count": 0
    },
    {
      "day": "2026-05-12",
      "count": 0
    },
    {
      "day": "2026-05-13",
      "count": 0
    },
    {
      "day": "2026-05-14",
      "count": 0
    },
    {
      "day": "2026-05-15",
      "count": 1
    }
  ]
}