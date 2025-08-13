
1. Базовый URL

http://localhost:3000/products

(замени порт и префикс, если в твоём проекте другие)


---

1. Получить все товары

Метод: GET
URL: /all
Авторизация: не требуется

Пример в Postman:

GET http://localhost:3000/products/all

Ответ (200 OK):

[
  {
    "_id": "66b6d5d4f0...",
    "title": "Example Product",
    "price": 100,
    "image": "https://example.com/image.jpg"
  }
]


---

2. Получить товар по ID

Метод: GET
URL: /:id
Авторизация: не требуется

Пример:

GET http://localhost:3000/products/66b6d5d4f0a2...

Возможные ответы:

200 OK – найден товар

404 Not Found – товар не найден



---

3. Создать товар

Метод: POST
URL: prodact/v1/create
Авторизация: JWT + роль admin
Тип запроса: form-data (если загружается изображение) или raw JSON (если без файла)

Headers:

Authorization: Bearer <ВАШ_JWT_ТОКЕН>

Вариант 1: С изображением

Key: title → Text

Key: price → Number

Key: image → File (тип image или video)

Key: description:(описание )

Key: category ('main', 'drink', 'dessert' )

Key: isAvailable (true/false)

Вариант 2: Без файла Тип запроса → raw → JSON:

{
    "title": "Himbeerspritz2",
    "description": "1 Schuss\tSirup (Himbeer-)\n1 Glas\tProsecco\neinige\tHimbeeren, am besten frische",
    "price": 12.5,
    "image": "https://res.cloudinary.com/drwrhviwk/image/upload/v1754912828/nahjq51skhmyf5xlikhb.webp",
    "category": "drink",
    "isAvailable": true,
    "_id": "6899d83d90868a2c7d5c978d",
    "createdAt": "2025-08-11T11:47:09.020Z",
    "updatedAt": "2025-08-11T11:47:09.020Z",
    "__v": 0
}

Ответ (201 Created):

{
  "_id": "66b6e2b9a...",
  "title": "New Product",
  "price": 150,
  "image": "https://res.cloudinary.com/.../image.jpg"
}


---

4. Обновить товар

Метод: PUT
URL: /v1/update/:id
Авторизация: JWT + роль admin

Пример:

PUT http://localhost:3000/products/v1/update/66b6d5d4f0a2...

Body → raw JSON:

{
  "title": "Updated Product",
  "price": 200
}

Ответ (200 OK):

{
  "_id": "66b6d5d4f0a2...",
  "title": "Updated Product",
  "price": 200
}


---

5. Удалить товар

Метод: DELETE
URL: /v1/del/:id
Авторизация: JWT + роль admin

Пример:

DELETE http://localhost:3000/products/v1/del/66b6d5d4f0a2...

Ответ (200 OK):

{
  "message": "Product deleted"
}


---

🔑 Примечания для тестирования в Postman

1. Для POST, PUT, DELETE запросов нужен JWT токен с ролью admin.


2. Если тестируешь загрузку файлов, в Postman выбери form-data и укажи image → File.


3. Ответы приходят в формате JSON.


4. Если будет ошибка 401 Unauthorized, проверь токен.


5. Если будет ошибка 403 Forbidden, проверь, что у пользователя роль admin.




---
