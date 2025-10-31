# IBM-NJ-User-Authentication

**### _

[`[this is my first project that i created it own without any help of @person]

]( https://ibm-nj-user-authentication-7.onrender.com/ )

( https://github.com/Harivasan16/IBM-NJ-User-Authentication.git )

_**
My project/
├── server.js
├── package.json
├── .env
├── public/
│ ├── home.html
│ ├── login.html
│ ├── register.html
│ ├── style.css
│ └── script.js

Features

User Registration & Login
Password Hashing using bcryptjs
Secure Authentication with JWT Tokens
Environment-based Configuration using dotenv
Database Connection using MongoDB (Mongoose)
RESTful API Architecture
Error Handling & Validation

Tech Stack

Category
Technology

Backend
Node.js, Express.js

Database
MongoDB (Mongoose ODM)

Authentication
JWT, bcryptjs

Environment
dotenv

Deployment
Render / Vercel

Version Control
Git & GitHub

Step 1: Clone the repository
git clone (https://github.com/Harivasan16/IBM-NJ-User-Authentication.git)
cd ibm-nj-user-auth-system
Step 2: Install dependencies
npm install
Step 3: Create a .env file
env
PORT=5000
MONGO_URI=mongodb+srv://:@cluster0.xxxxx.mongodb.net/auth_system
JWT_SECRET=your_jwt_secret_key
Never commit your .env file to GitHub.
Step 4: Run the server
npm start
Step 5: Test the API
Use Postman or cURL to test:
➤ Register a new user
POST /api/auth/register
json
{
"name": "John Doe",
"email": "john@example.com",
"password": "123456"
}
➤ Login
POST /api/auth/login
json
{
"email": "john@example.com",
"password": "123456"
}
API Documentation
Method Endpoint Description
POST /api/auth/register Register a new user
POST /api/auth/login Authenticate user and return JWT
GET /api/auth/user Get logged-in user info (protected route)
Screenshots
User Registration Output

Login Success Message

MongoDB Database View

Challenges & Solutions
Challenge Solution
MongoDB connection failed Ensured correct URI and user authentication setup
JWT verification errors Used proper token handling and middleware
Environment variable issues Implemented dotenv for secure config management
Project Report Includes
Final Demo Walkthrough
API Documentation
Source Code Explanation
Screenshots of Outputs
Challenges & Solutions
Deployment Setup Guide
GitHub & Render Links
Author
Project Name: IBM NJ – User Authentication System
Developed by: [HARIVASAN P]
GitHub: ]
Final Submission
Phase 5 – IBM NJ Project Completed
Includes:
Working Authentication System
Full Documentation
Deployment Link   = https://ibm-nj-user-authentication-7.onrender.com/
GitHub Repository = https://github.com/Harivasan16/IBM-NJ-User-Authentication.git

