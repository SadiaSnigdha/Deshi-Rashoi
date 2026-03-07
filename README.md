# Deshi Rashoi - Food Delivery Application

## 📖 About the Project

**Deshi Rashoi** is a full-stack food delivery web application built with modern web technologies. The project consists of three main components:

- **Frontend**: Customer-facing application for browsing food items, placing orders, and tracking deliveries
- **Admin Panel**: Management interface for restaurant administrators to manage food items, view orders, and handle deliveries
- **Backend**: RESTful API server handling authentication, database operations, and business logic

The application is designed to provide a seamless food ordering experience with features like user authentication, cart management, order tracking, and real-time updates.

### 🛠️ Technology Stack

**Frontend & Admin:**
- Vite (Build tool)
- Vanilla JavaScript (ES6+)
- HTML5 & CSS3
- Axios (HTTP client)
- React Router DOM (Client-side routing)

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- SQLite Database
- JWT Authentication
- Bcrypt (Password hashing)
- Multer (File uploads)
- Nodemailer (Email service)
- Stripe (Payment integration)

---

## ✨ What the Project Does

### Customer Features (Frontend)
1. **User Authentication**: Secure registration and login system with JWT tokens
2. **Browse Food Menu**: Explore food items organized by categories
3. **Search & Filter**: Find food items by name, category, or dietary preferences
4. **Shopping Cart**: Add/remove items, adjust quantities, and view total cost
5. **Place Orders**: Complete checkout process with delivery details
6. **Order Tracking**: View order history and current order status
7. **User Profile**: Manage personal information and delivery addresses

### Admin Features (Admin Panel)
1. **Dashboard**: Overview of orders, revenue, and statistics
2. **Food Management**: 
   - Add new food items with images, descriptions, and pricing
   - Edit existing food items
   - Delete food items from the menu
3. **Order Management**:
   - View all incoming orders
   - Update order status (Processing, Out for delivery, Delivered)
   - Track delivery progress
4. **Category Management**: Organize food items by categories

### Backend Features (API)
1. **RESTful API**: Well-structured endpoints for all operations
2. **Authentication & Authorization**: JWT-based secure access control
3. **Database Management**: SQLite database with Sequelize ORM
4. **File Upload**: Image upload and storage for food items
5. **Email Notifications**: Order confirmations and updates
6. **Payment Processing**: Stripe integration for secure payments
7. **CORS Enabled**: Cross-origin resource sharing for frontend integration

---

## 🚀 How to Run the Project

### Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js** (v14.x or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone https://github.com/SadiaSnigdha/Deshi-Rashoi.git
cd Deshi-Rashoi
```

### Step 2: Install Dependencies

Install dependencies for all three components:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install admin panel dependencies
cd ../admin
npm install
```

### Step 3: Environment Configuration

Configure the backend environment variables:

```bash
cd backend
```

The `.env` file should contain:
```env
# SQLite Configuration
DB_PATH=./food_delivery.db

# JWT Secret for token authentication
JWT_SECRET=your_jwt_secret_key_here

# Bcrypt Salt Rounds
SALT=10

# Server Port
PORT=4000

# Stripe (optional)
STRIPE_API_KEY=your_stripe_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Node Environment
NODE_ENV=development

# Email Configuration (Gmail - optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Note**: Update `JWT_SECRET` with a strong secret key. Email and Stripe configurations are optional for basic functionality.

### Step 4: Start the Application

You need to run all three components simultaneously in separate terminal windows/tabs:

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm run server
```
Backend will run on: **http://localhost:4000**

#### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

#### Terminal 3 - Start Admin Panel
```bash
cd admin
npm run dev
```
Admin panel will run on: **http://localhost:5174**

### Step 5: Access the Application

- **Customer Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **Admin Panel**: Open [http://localhost:5174](http://localhost:5174) in your browser
- **API Endpoint**: Backend is accessible at [http://localhost:4000](http://localhost:4000)

---

## 📁 Project Structure

```
Deshi-Rashoi/
├── backend/           # Backend API server
│   ├── config/        # Database configuration
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Authentication middleware
│   ├── utils/         # Utility functions (email service)
│   ├── uploads/       # Uploaded images storage
│   └── server.js      # Entry point
│
├── frontend/          # Customer-facing application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── assets/      # Images and static files
│   ├── js/            # JavaScript modules (API, routing, state)
│   └── index.html     # Main HTML file
│
└── admin/             # Admin panel
    ├── src/
    │   ├── components/  # Admin UI components
    │   ├── pages/       # Admin pages
    │   └── assets/      # Admin assets
    ├── js/            # Admin JavaScript modules
    └── index.html     # Admin HTML file
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **Port Already in Use**
   ```bash
   # Kill process on port 4000 (backend)
   lsof -ti:4000 | xargs kill -9
   
   # Kill process on port 5173 (frontend)
   lsof -ti:5173 | xargs kill -9
   ```

2. **SQLite3 Binding Issues**
   ```bash
   cd backend
   npm rebuild sqlite3
   ```

3. **Node Version Compatibility**
   - If you encounter errors, ensure you're using Node.js v14.x to v20.x
   - For newer Node versions, dependencies will be automatically updated

4. **Email Service Errors**
   - Email functionality is optional
   - The app will work without email configuration
   - To enable: Use Gmail app passwords (not regular password)

---

## 📝 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login

### Food Items
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add new food item (Admin)
- `DELETE /api/food/remove/:id` - Remove food item (Admin)

### Cart
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/get` - Get user cart
- `DELETE /api/cart/remove` - Remove from cart

### Orders
- `POST /api/order/place` - Place new order
- `GET /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)
- `PUT /api/order/status` - Update order status (Admin)

---

## 👥 Contributors

- **Sadia Snigdha** - Project Owner
- **Mrinmoy Poit** - Project Leader
- [GitHub Repository](https://github.com/SadiaSnigdha/Deshi-Rashoi)

---

## 📄 License

This project is available for educational purposes.

---

## 🎯 Future Enhancements

- Real-time order tracking with WebSocket
- Payment gateway integration (Stripe/PayPal)
- Mobile responsive design improvements
- Restaurant ratings and reviews
- Multi-restaurant support
- Advanced search and filtering
- Promotional codes and discounts
- Push notifications for order updates

---

**Happy Coding! 🍕🍔🍜** 
