Unicart – E-commerce Web Application

Unicart is a full-stack e-commerce web application that enables users to browse products, manage their shopping cart, and place orders. The project demonstrates core concepts of modern web development including backend APIs, authentication, and frontend integration.

🚀 Features
User Authentication (Login/Register)
Product Browsing
Add to Cart Functionality
Order Management
Modular Backend (MVC Structure)
RESTful API Integration
Tech Stack
-Frontend
HTML, CSS, JavaScript
Backend
Node.js
Express.js
Database
MongoDB
📂 Project Structure
UNICART/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── admin/
│   ├── Cart/
│   ├── Images/
│   ├── Login/
│   ├── My Order/
│   ├── Product/
│   ├── home.html
│   ├── homefunction.js
│   └── homestyle.css
│
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/InnocentSG/unicart-ecommerce.git
cd unicart-ecommerce
2️⃣ Install dependencies
cd backend
npm install
3️⃣ Setup environment variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4️⃣ Run the server
npm start
5️⃣ Open frontend

Open frontend/home.html in your browser


🎯 Future Improvements
Payment Integration (Stripe/Razorpay)
Admin Dashboard
Responsive UI Enhancements
Deployment (Frontend + Backend)
Author

Sumit Kumar
🔗 LinkedIn: https://www.linkedin.com/in/sumit-kumar-sg/
