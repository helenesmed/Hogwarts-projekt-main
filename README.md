# Hogwarts API

Et lille REST API bygget med Node.js, Express og PostgreSQL.

## Krav

- Node.js
- PostgreSQL
- Bruno (til endpoint-requests)

## Kom i gang

1. Opret en PostgreSQL-database, fx `Hogwarts`.
2. Åbn `hogwarts-query.sql` i pgAdmin eller DataGrip, vælg databasen, og kør filen. Den opretter tabellerne og indsætter eksempeldata. Kør den kun én gang på en tom database; filen nulstiller ikke eksisterende tabeller.
3. Kopiér `.env.example` til `.env`, og indsæt dine egne PostgreSQL-oplysninger:

   ```env
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=Hogwarts
   PG_USER=postgres
   PG_PASSWORD=your_local_postgres_password
   ```

4. Installer pakker, og start serveren:

   ```bash
   npm install
   npm run dev
   ```

   Alternativt kan serveren startes med `npm start`. API'et lytter på `http://localhost:3000`.

Hold `.env` privat; den er ignoreret af Git. Del eller commit ikke databaseadgangskoder.

## Endpoints

Alle svar er JSON, undtagen `GET /`, som viser en simpel HTML-forside.

| Method | Route | Beskrivelse |
|---|---|---|
| GET | `/` | Vis API-forsiden |
| GET | `/houses` | Hent alle huse |
| GET | `/houses/:id` | Hent ét hus |
| GET | `/teachers` | Hent alle lærere |
| GET | `/teachers/:id` | Hent én lærer |
| POST | `/teachers` | Opret en lærer |
| PUT | `/teachers/:id` | Opdater en lærer |
| DELETE | `/teachers/:id` | Slet en lærer |
| GET | `/students` | Hent alle studerende |
| GET | `/students/:id` | Hent én studerende |
| POST | `/students` | Opret en studerende |
| PUT | `/students/:id` | Opdater en studerende |
| DELETE | `/students/:id` | Slet en studerende |
| GET | `/courses` | Hent alle fag |
| GET | `/courses/:id` | Hent ét fag med lærer og studerende |
| POST | `/courses` | Opret et fag |
| PUT | `/courses/:id` | Opdater et fags navn |
| DELETE | `/courses/:id` | Slet et fag |
| PUT | `/courses/:id/teacher` | Skift lærer på et fag |
| POST | `/courses/:id/students` | Tilmeld en studerende til et fag |
| DELETE | `/courses/:id/students/:studentId` | Fjern en studerende fra et fag |

Eksempler på JSON-body:

```json
{ "name": "New Teacher", "house_id": 1 }
```

```json
{ "name": "New Student", "year": 1, "house_id": 1 }
```

```json
{ "name": "New Course", "teacher_id": 1 }
```

```json
{ "teacher_id": 2 }
```

```json
{ "student_id": 3 }
```

## Endpoint-tests med Bruno

1. Start API'et og sørg for, at PostgreSQL kører, og at `hogwarts-query.sql` er kørt.
2. Åbn mappen `Hogwarts-bruno` som en Bruno collection.
3. Send requests fra mapperne `Home`, `House`, `Teacher`, `Student` og `Course`. De bruger som standard `http://localhost:3000` og eksempeldata fra SQL-filen.
4. Hver request har en test af den forventede HTTP-status. Bruno viser testresultat, status og response body.

Requests med `POST`, `PUT` og `DELETE` ændrer data. Især DELETE-requests sletter eksempelrækker, så nulstil databasen før en ny gennemgang, eller vælg andre eksisterende ID'er. Requestene opretter ikke automatisk nye testdata.

## Projektstruktur

- `Routes/`: HTTP-metoder og URL'er.
- `Controllers/`: request/response, validering og statuskoder.
- `Repository/`: SQL-forespørgsler til PostgreSQL.
- `db.js`: opretter databaseforbindelsen.
- `app.js` og `server.js`: konfigurerer og starter Express-appen.
- `hogwarts-query.sql`: tabeller og eksempeldata.
- `Hogwarts-bruno/`: Bruno-collection med endpoint-requests.

## GitHub

Før aflevering skal projektet pushes til et GitHub-repository. Indsæt repository-linket her, når det er oprettet: **[https://github.com/helenesmed/Hogwarts-projekt-main.git]**.
