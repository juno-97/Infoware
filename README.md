# Infoware

# POSTMAN IMPORT IF INTERESTED

imort this link using post man
https://www.getpostman.com/collections/f6d46c6aa813eb2c23b8

# API DOCUMENTATION

# Tasks: Build Node.js Endpoints

# A) For Website Owner:

---

# ADD ACCOUNT

POST : localhost:3000/api/register

Body : {
"email": "rafeeq@gmail.com",
"password": "12345",
"role": "admin"
}

---

# LOGIN

POST: localhost:3000/api/login

Body: {
"email": "test@gmail.com",
"password": "12345"
}
Also check for x-auth-token in response headers (required for authorization)

---

# ADD PRODUCTS

POST: localhost:3000/api/products

Body: {
"product": "product 13",
"description": "Description",
"price": 233.24,
"image": "Image Url",
"countInStock": 300
}
Headers: x-auth-token :
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdiOWIzNDk5YTYyZDcxMDYxNDk1MjYiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM1NTE5MTQ3fQ.CCs_S0W2eZ9l3q5a3va-98oOtg5MbaJlgRsi8ynPHI8

---

# VIEW ORDERS

GET: localhost:3000/api/orders/allorders?page=0&limit=10
Headers: x-auth-token : {pass auth token}

# B) For End Customers

---

# ADD ACCOUNT

POST : localhost:3000/api/register

Body : {
"email": "rafeeq@gmail.com",
"password": "12345",
"role": "user"
}

---

# LOGIN

POST: localhost:3000/api/login

Body: {
"email": "test@gmail.com",
"password": "12345"
}
Also check for x-auth-token in response headers (required for authorization)

---

# BROWSE PRODUCTS

GET: localhost:3000/api/products?page=0&limit=10
Headers: x-auth-token : {pass auth token}

---

# ORDER PRODUCTS(no payment integration)

POST : localhost:3000/api/orders/617c12a9811f871ba9cbb6a8 (product Id - params)
BODY : {
"count": 5
}
Headers: x-auth-token : {pass auth token}

---

# VIEW ORDERS

GET : localhost:3000/api/orders/?page=0&limit=10
Headers: x-auth-token : {pass auth token}
