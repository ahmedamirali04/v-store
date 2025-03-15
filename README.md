This is my final project for MERN stack- Library Management System, titled "V-Store" (as in Volume-Store, like volumes of books)

It's using MongoDB as the backend, ReactJS as frontend and Node.jS with express in backend

None of this was taken from anywhere, it's all my code, but some parts of it were made using chatGPT wherever I got stuck (some of the design elements like the search bar that works simultaneously as you type, or the hover animations)

do note that you need to fill out the database to be able to use the application, I'll write steps as needed

Step 1) Make an admin/staff user in the database, this can't be done via the website, but can be done either in the database or by using a REST api and using a backend route to do so. made this way for security purposes. MAKE SURE ROLL IS "staff" AND NOT ADMIN.

eg: (using REST API)

POST http://localhost:3000/admin-api/staff 
Content-Type: application/json

{
    "role":"staff",
    "name":"Fenrir",
    "staffId":"123123",
    "email":"Fenrir123@gmail.com"
}

Step 2)Make sure to populate the database as the admin using the website, as admin has the ability to add books in the Book Catalogue page

Step 3)Any other person that signs in using the webpage is automatically a "user", and can freely use the system

Enjoy
