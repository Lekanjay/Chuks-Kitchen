# Chuks Kitchen
# A food ordering API

## Description
This is a node.js amd express backend API for a food ordeering platform. 
Users can signup, login, and place orders.
Asdmins can add and update food items and their prices.

## Features
- User Authentication using JWT
- Admin Authorization 
- Food Addition and Price update
- Order placement
- Database integration

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## API Endpoints
### Auth
- POST /auth/signup
- POST /auth/login

### Food
- GET /foods
- POST /foods (admins only)

### Orders
- GET /orders
- POST /orders
