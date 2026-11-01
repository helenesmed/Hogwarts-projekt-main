# Pseudokode for endpoints

Pseudokoden beskriver API'ets tilsigtede flow. `:id` og `:studentId` er værdier fra URL'en; request-body er JSON, hvor det er relevant.

## Forside

### `GET /`

```text
Vis Hogwarts-forsiden med links til fag, lærere, studerende og huse
```

## Houses

### `GET /houses`

```text
Hent alle huse fra databasen
Returner listen med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `GET /houses/:id`

```text
Hent kollegiet med det angivne id
Hvis kollegiet ikke findes, returner status 404
Ellers returner kollegiet med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

## Teachers

### `GET /teachers`

```text
Hent alle lærere fra databasen
Returner listen med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `GET /teachers/:id`

```text
Hent læreren med det angivne id
Hvis læreren ikke findes, returner status 404
Ellers returner læreren med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `POST /teachers`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opret læreren med name og eventuel house_id
Returner den oprettede lærer med status 201
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `PUT /teachers/:id`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opdater læreren med id'et med name og house_id
Hvis læreren ikke findes, returner status 404
Ellers returner den opdaterede lærer med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `DELETE /teachers/:id`

```text
Slet læreren med det angivne id
Hvis ingen lærer blev slettet, returner status 404
Ellers returner beskeden "Teacher deleted" med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

## Students

### `GET /students`

```text
Hent alle studerende fra databasen
Returner listen med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `GET /students/:id`

```text
Hent den studerende med det angivne id
Hvis den studerende ikke findes, returner status 404
Ellers returner den studerende med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `POST /students`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opret den studerende med name, year og house_id
Returner den oprettede studerende med status 201
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `PUT /students/:id`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opdater den studerende med id'et med name, year og house_id
Hvis den studerende ikke findes, returner status 404
Ellers returner den opdaterede studerende med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `DELETE /students/:id`

```text
Slet den studerende med det angivne id
Hvis ingen studerende blev slettet, returner status 404
Ellers returner beskeden "Student deleted" med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

## Courses

### `GET /courses`

```text
Hent alle fag fra databasen
Returner listen med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `GET /courses/:id`

```text
Hent faget og dets læreroplysninger
Hvis faget ikke findes, returner status 404
Hent de studerende, der er tilmeldt faget
Returner fag, lærer og studerende samlet med status 200
Hvis et databasekald fejler, log fejlen og returner status 500
```

### `POST /courses`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opret faget med name og eventuel teacher_id
Returner det oprettede fag med status 201
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `PUT /courses/:id`

```text
Kontroller at request-body indeholder name
Hvis name mangler, returner status 400
Opdater fagets navn
Hvis faget ikke findes, returner status 404
Ellers returner det opdaterede fag med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `DELETE /courses/:id`

```text
Slet faget med det angivne id
Hvis intet fag blev slettet, returner status 404
Ellers returner beskeden "Course deleted" med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `PUT /courses/:id/teacher`

```text
Kontroller at request-body indeholder teacher_id
Hvis teacher_id mangler, returner status 400
Kontroller at læreren findes
Hvis læreren ikke findes, returner status 404
Skift lærer på faget
Hvis faget ikke findes, returner status 404
Ellers returner det opdaterede fag med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```

### `POST /courses/:id/students`

```text
Kontroller at request-body indeholder student_id
Hvis student_id mangler, returner status 400
Kontroller at faget findes; ellers returner status 404
Kontroller at den studerende findes; ellers returner status 404
Opret tilmeldingen mellem den studerende og faget
Hvis tilmeldingen allerede findes, returner status 409
Ellers returner tilmeldingen med status 201
Hvis et andet databasekald fejler, log fejlen og returner status 500
```

### `DELETE /courses/:id/students/:studentId`

```text
Fjern tilmeldingen for den studerende på faget
Hvis tilmeldingen ikke findes, returner status 404
Ellers returner beskeden "Student removed from course" med status 200
Hvis databasekaldet fejler, log fejlen og returner status 500
```
