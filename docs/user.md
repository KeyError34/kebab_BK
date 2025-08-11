
📌 Инструкция по проверке API UserController через Postman

1. Базовый URL

http://localhost:3000/users

(замени порт и префикс, если они другие)


---

1. Получить всех пользователей

Метод: GET
URL: /v1/getall
Авторизация: JWT + роль admin

Headers:

Authorization: Bearer <ВАШ_JWT_ТОКЕН>

Пример:

GET http://localhost:3000/users/v1/getall

Ответ (200 OK):

[
  {
    "_id": "66b7f3e4a7...",
    "userName": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "fullName": "John Doe",
    "createdAt": "2025-08-10T12:34:56.000Z",
    "updatedAt": "2025-08-10T12:34:56.000Z"
  }
]


---

2. Создать пользователя

Метод: POST
URL: /v2/create
Авторизация: не требуется

Body → raw JSON:

{
  "userName": "new_user",
  "email": "new@example.com",
  "password": "password123",
  "fullName": "New User",
  "profile": "66b7f5a0e7..." 
}

(поле profile — это ObjectId профиля, если оно используется, можно передавать null)

Ответ (201 Created):

{
  "_id": "66b7f8a7e4...",
  "userName": "new_user",
  "fullName": "New User",
  "role": "user",
  "createdAt": "2025-08-11T10:15:30.000Z",
  "updatedAt": "2025-08-11T10:15:30.000Z"
}


---

3. Обновить пользователя

Метод: PUT
URL: /v2/update/:id
Авторизация: JWT + роль admin или сам пользователь

Пример:

PUT http://localhost:3000/users/v2/update/66b7f8a7e4...

Body → raw JSON:

{
  "fullName": "Updated Name",
  "password": "newpassword123"
}

Ответ (200 OK):

{
  "message": "User updated",
  "updated": {
    "_id": "66b7f8a7e4...",
    "userName": "new_user",
    "fullName": "Updated Name",
    "email": "new@example.com",
    "role": "user",
    "createdAt": "2025-08-11T10:15:30.000Z",
    "updatedAt": "2025-08-11T10:20:45.000Z"
  }
}


---

4. Получить пользователя по ID

Метод: GET
URL: /v2/:id
Авторизация: JWT + роль admin

Пример:

GET http://localhost:3000/users/v2/66b7f8a7e4...

Ответ (200 OK):

{
  "_id": "66b7f8a7e4...",
  "userName": "new_user",
  "email": "new@example.com",
  "role": "user",
  "fullName": "Updated Name",
  "createdAt": "2025-08-11T10:15:30.000Z",
  "updatedAt": "2025-08-11T10:20:45.000Z"
}


---

5. Удалить пользователя

Метод: DELETE
URL: /v2/:id
Авторизация: JWT (может удалить админ или сам пользователь)

Пример:

DELETE http://localhost:3000/users/v2/66b7f8a7e4...

Ответ (200 OK):

{
  "message": "User deleted",
  "deletedUser": {
    "_id": "66b7f8a7e4...",
    "userName": "new_user",
    "email": "new@example.com",
    "role": "user"
  }
}


---

🔑 Примечания для тестирования

1. Для GET /v1/getall и GET /v2/:id нужен токен с ролью admin.


2. Для PUT /v2/update/:id и DELETE /v2/:id токен может принадлежать или админу, или самому пользователю.


3. Пароль при создании/обновлении должен быть минимум 8 символов.


4. Ошибки уникальности:

Username already taken — имя пользователя занято.

Email already registered — почта уже используется.





---