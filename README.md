# TOMATO - Food Ordering Website

This repository hosts the source code for TOMATO, a dynamic food ordering website. 

**IMPORTANT**: This project has been **converted from React to Vanilla HTML/CSS/JavaScript**. No build tools or npm dependencies required for frontend and admin panels!

## 🎯 Project Status

✅ **Successfully converted from React to Vanilla HTML/CSS/JavaScript**
- Frontend: 100% vanilla (no React)
- Admin Panel: 100% vanilla (no React)
- Backend: Unchanged (Node.js/Express)
- All features preserved
- Better performance
- Zero build complexity

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[CONVERSION_GUIDE.md](CONVERSION_GUIDE.md)** - Detailed conversion information
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design patterns

## Demo

- User Panel: [https://food-delivery-frontend-s2l9.onrender.com/](https://food-delivery-frontend-s2l9.onrender.com/)
- Admin Panel: [https://food-delivery-admin-wrme.onrender.com/](https://food-delivery-admin-wrme.onrender.com/)

## Features

### User Panel
- ✅ Browse food items
- ✅ Filter by category
- ✅ Add/Remove items from cart
- ✅ User authentication (Login/Signup)
- ✅ Place orders
- ✅ Order tracking
- ✅ Responsive design
- ✅ Toast notifications

### Admin Panel
- ✅ Admin login
- ✅ Add new food items
- ✅ Upload food images
- ✅ View all food items
- ✅ Delete food items
- ✅ View orders
- ✅ Update order status
- ✅ Toast notifications

### Backend
- JWT Authentication
- Password Hashing (Bcrypt)
- Stripe Payment Integration
- MongoDB Database
- REST APIs
- Role-Based Access Control

## Project Structure

```
Food-Delivery-main/
├── frontend/                    # Customer app (Vanilla HTML/JS)
│   ├── index.html              # Main entry point
│   ├── js/                      # JavaScript modules
│   │   ├── app.js              # Initialization
│   │   ├── store.js            # State management
│   │   ├── api.js              # API client
│   │   ├── router.js           # Routing
│   │   ├── pages.js            # Page templates
│   │   └── toast.js            # Notifications
│   └── src/                     # CSS and assets
│
├── admin/                       # Admin panel (Vanilla HTML/JS)
│   ├── index.html              # Main entry point
│   ├── js/                      # JavaScript modules
│   └── src/                     # CSS and assets
│
├── backend/                     # Node.js API server
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
├── QUICK_START.md              # Quick start guide
├── CONVERSION_GUIDE.md         # Conversion details
└── ARCHITECTURE.md             # System design
```

## Quick Start (5 minutes)

### Option 1: Python HTTP Server
```bash
# Terminal 1 - Frontend
cd frontend
python -m http.server 8000

# Terminal 2 - Admin
cd admin
python -m http.server 8001

# Terminal 3 - Backend
cd backend
npm install
npm run server
```

### Option 2: Node.js HTTP Server
```bash
# Terminal 1 - Frontend
cd frontend
npx http-server

# Terminal 2 - Admin
cd admin
npx http-server -p 8001

# Terminal 3 - Backend
cd backend
npm install
npm run server
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `frontend/index.html` → "Open with Live Server"
3. Right-click `admin/index.html` → "Open with Live Server"
4. Start backend manually

**URLs:**
- Frontend: http://localhost:8000
- Admin: http://localhost:8001
- Backend: http://localhost:4000

## Conversion Benefits

### Before (React)
- Required Node.js and npm
- Required Vite build tool
- Required React, React Router, Axios
- ~40KB+ JavaScript bundle
- Complex setup process

### After (Vanilla)
✅ No build tools needed
✅ No frontend dependencies
✅ Tiny JavaScript files
✅ Instant development
✅ Better performance
✅ Easier to understand
✅ Direct file serving
✅ Works offline

## Technology Stack

### Frontend & Admin (Now)
- Vanilla HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API

### Backend (Unchanged)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Code Examples

### State Management
```javascript
// Simple and straightforward
Store.addToCart(itemId);
Store.removeFromCart(itemId);
const total = Store.getTotalCartAmount();

// Subscribe to changes
Store.subscribe(() => {
    // Re-render UI
});
```

### API Calls
```javascript
// Using Fetch API
const response = await API.getFoodList();
const response = await API.addToCart(itemId);
const response = await API.login(email, password);
```

### Notifications
```javascript
// Simple toast notifications
showToast('Item added to cart', 'success');
showToast('Login failed', 'error');
showToast('Processing...', 'info');
```

### Routing
```javascript
// Hash-based routing - no build tools needed
window.location.hash = '/cart'
window.location.hash = '/orders'
window.location.hash = '/'
```

## Setup Backend

### Clone the project
```bash
git clone https://github.com/Mshandev/Food-Delivery
cd Food-Delivery
```

### Install backend dependencies
```bash
cd backend
npm install
```

### Create .env file
```env
JWT_SECRET=your_secret_key
SALT=10
MONGO_URL=your_mongodb_url
STRIPE_SECRET_KEY=your_stripe_key
```

### Configure API URLs
- **Frontend**: `frontend/js/api.js`
  ```javascript
  baseURL: 'http://localhost:4000'
  ```
- **Admin**: `admin/js/api.js`
  ```javascript
  baseURL: 'http://localhost:4000'
  ```

### Start backend
```bash
npm run server
# Runs on http://localhost:4000
```

## Development Workflow

### Edit Frontend
1. Edit `frontend/js/*.js` or CSS files
2. Refresh browser (auto-reload if using Live Server)
3. Changes are instant

### Edit Admin
1. Edit `admin/js/*.js` or CSS files
2. Refresh browser
3. Changes are instant

### Edit Backend
```bash
cd backend
npm run server
# Uses nodemon for auto-restart
```

## Testing Checklist

- [ ] Frontend loads without errors
- [ ] Can browse food items
- [ ] Can filter by category
- [ ] Can add items to cart
- [ ] Cart total updates correctly
- [ ] Can login/signup
- [ ] Can place order
- [ ] Can view orders
- [ ] Admin panel loads
- [ ] Can add food in admin
- [ ] Can delete food items
- [ ] Can update order status

## Debugging

### Check API calls
- Press F12 → Network tab
- Look for red (failed) requests
- Check request headers and response

### Check errors
- Press F12 → Console tab
- Look for red error messages
- Check error details

### Check state
- In console: `console.log(Store.state)`
- See all application data

## Performance Tips

1. **Minify JS/CSS** for production
2. **Optimize images** before upload
3. **Enable caching** on server
4. **Use CDN** for static assets
5. **Compress responses** (gzip)

## Deployment

### Frontend & Admin
```bash
# Just serve the index.html on any server
- Apache / Nginx
- Express.js
- GitHub Pages
- Vercel
- Netlify
```

### Backend
```bash
# Deploy Node.js app normally
- Heroku
- AWS
- DigitalOcean
- Render
```

## What Changed During Conversion

| Component | Before | After |
|-----------|--------|-------|
| UI Framework | React | Vanilla JS |
| Routing | React Router | Hash Router |
| State | Context API | Store Object |
| HTTP | Axios | Fetch API |
| Notifications | react-toastify | Custom Toast |
| Build | Vite | None |
| Bundle Size | ~40KB | ~5KB |
| Setup Time | 5-10 min | <1 min |

## Migration Guide

If you need to add React back or modify the vanilla version:

See [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) for:
- How to convert components
- How to understand the new structure
- How to add new features
- How to deploy

## Architecture

For detailed architecture information:

See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- System design
- Data flow
- Module responsibilities
- Design patterns
- Extension points

## Contributing

Contributions are always welcome! Feel free to:
1. Report bugs
2. Suggest features
3. Submit pull requests
4. Improve documentation

## Feedback

[Contact me on LinkedIn](https://www.linkedin.com/in/muhammad-shan-full-stack-developer/)

## License

This project is open source and available under the MIT License.

---

**Happy Coding!** 🚀

For questions or issues, check:
1. [QUICK_START.md](QUICK_START.md) - Getting started
2. [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) - How it works
3. [ARCHITECTURE.md](ARCHITECTURE.md) - System design
4. Browser console (F12) for errors
