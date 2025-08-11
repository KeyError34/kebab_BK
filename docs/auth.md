
POST /login

POST /request-reset

POST /reset-password



---

1. POST /login

Авторизация и получение JWT.

Method: POST

URL: http://localhost:3000/v2/login

Body → raw → JSON:

login (userName / email)
{
  "login": "testuser",
  "password": "testpassword"
}

---

2. POST /request-reset

Запрос на сброс пароля — письмо с токеном.
Valid 5 min
Method: POST

URL: http://localhost:3000/v2/request-reset

Body:


{
  "email": "test@example.com"
}


---

3. POST /reset-password

Сброс пароля по токену, который пришёл на почту.

Method: POST

URL: http://localhost:3000/v2/reset-password

Body:


{
  "token": "jwt_token_from_email",
  "newPassword": "newpass123"
}

