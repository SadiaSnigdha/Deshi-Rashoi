# Quick Start Guide - Vanilla HTML/JS Version

## Prerequisites
- No build tools required!
- Just need a simple HTTP server
- Modern web browser

## Setup (5 minutes)

### Option 1: Using Python
```bash
# Frontend
cd frontend
python -m http.server 8000

# In new terminal - Admin
cd admin
python -m http.server 8001

# In new terminal - Backend
cd backend
npm install
npm run server
```

### Option 2: Using Node.js
```bash
# Frontend
cd frontend
npx http-server

# In new terminal - Admin  
cd admin
npx http-server -p 8001

# In new terminal - Backend
cd backend
npm install
npm run server
```

### Option 3: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `frontend/index.html` → "Open with Live Server"
3. Right-click `admin/index.html` → "Open with Live Server" (different port)

## URLs
- **Frontend**: http://localhost:8000
- **Admin**: http://localhost:8001 (or 8002 if using Live Server)
- **Backend API**: http://localhost:4000

## Key Files to Understand

### Frontend
```
frontend/
├── index.html              ← Main entry point
├── js/app.js              ← Initialization
├── js/store.js            ← State management
├── js/api.js              ← API calls
├── js/router.js           ← Navigation
└── js/pages.js            ← Page templates
```

### Admin
```
admin/
├── index.html              ← Main entry point
├── js/app.js              ← Initialization
├── js/store.js            ← State management
├── js/api.js              ← API calls
├── js/router.js           ← Navigation
└── js/pages.js            ← Page templates
```

## Project Structure

```
Food-Delivery-main/
├── frontend/               ← Customer app (Vanilla HTML/JS)
├── admin/                  ← Admin panel (Vanilla HTML/JS)
├── backend/                ← Node.js API server
└── CONVERSION_GUIDE.md     ← Detailed conversion info
```

## Frontend Features

| Feature | Status |
|---------|--------|
| Browse foods | ✅ |
| Filter by category | ✅ |
| Add to cart | ✅ |
| Cart management | ✅ |
| User login/signup | ✅ |
| Order placement | ✅ |
| Order tracking | ✅ |
| Responsive design | ✅ |

## Admin Features

| Feature | Status |
|---------|--------|
| Admin login | ✅ |
| Add food items | ✅ |
| View food list | ✅ |
| Delete food items | ✅ |
| Manage orders | ✅ |
| Update order status | ✅ |

## How to Add Features

### Adding a New Page

**1. Add UI in `js/pages.js`:**
```javascript
myNewPage() {
    return `
        <div id="my-page">
            <h1>My Page</h1>
            <button id="my-btn">Click me</button>
        </div>
    `;
}
```

**2. Add route in `js/router.js`:**
```javascript
case '/mypage':
    content = Pages.myNewPage();
    this.attachMyPageListeners();
    break;
```

**3. Add event listeners in `js/router.js`:**
```javascript
attachMyPageListeners() {
    document.getElementById('my-btn').addEventListener('click', () => {
        showToast('Button clicked!', 'success');
    });
}
```

**4. Add navigation link in HTML:**
```html
<a href="#/mypage">My Page</a>
```

### Adding API Call

**1. Add to `js/api.js`:**
```javascript
async getMyData() {
    return this.request('/api/mydata', { method: 'GET' });
}
```

**2. Use in `js/store.js` or page:**
```javascript
const response = await API.getMyData();
if (response.success) {
    // Handle data
}
```

### Adding State

**1. Add to `Store.state` in `js/store.js`:**
```javascript
state: {
    myNewState: [],
}
```

**2. Add method:**
```javascript
updateMyState(value) {
    this.state.myNewState = value;
    this.notify(); // Notify subscribers
}
```

**3. Subscribe in page:**
```javascript
Store.subscribe(() => {
    console.log('State changed!', Store.state.myNewState);
});
```

## Debugging

### View Console
Press `F12` to open browser DevTools

### Check API Calls
- Network tab shows all requests
- Look for errors in request/response

### Debug State
```javascript
// In browser console
console.log(Store.state);
```

### Debug Router
```javascript
// In browser console
console.log(Router.currentPage);
```

## Common Tasks

### Change API URL
Edit `js/api.js`:
```javascript
const API = {
    baseURL: 'https://your-api.com',
    // ...
};
```

### Change UI Text
Edit `js/pages.js` - find the HTML template and change text

### Add New Product Category
Edit categories in `js/pages.js`:
```javascript
const menuItems = [
    { name: 'Your Category', image: 'path/to/image.png' },
    // ...
];
```

### Customize Colors
Edit `src/index.css` or component CSS files

## No Build Required!

Benefits of vanilla HTML/JS:
- ✅ No npm install needed (except backend)
- ✅ No build step
- ✅ No bundler configuration
- ✅ Direct file serving
- ✅ Instant updates on file save
- ✅ Smaller bundle size
- ✅ Better performance

## Testing Checklist

- [ ] Frontend loads without errors
- [ ] Can view food items
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can login
- [ ] Can place order
- [ ] Admin login works
- [ ] Can add food items in admin
- [ ] Can delete food items
- [ ] Can update order status

## Deployment

### Frontend
Simply serve the `frontend/index.html` with any web server:
- Apache
- Nginx
- Node.js Express
- GitHub Pages
- Vercel
- Netlify

### Admin
Same as frontend - serve `admin/index.html`

### Backend
Deploy Node.js application normally:
- Heroku
- AWS
- DigitalOcean
- etc.

## Performance Tips

1. **Minify CSS/JS** for production
2. **Optimize images** before upload
3. **Use CDN** for static assets
4. **Enable caching** on web server
5. **Compress responses** (gzip)

## Browser DevTools Tips

1. **Responsive design mode** - Ctrl+Shift+M
2. **Network throttling** - Test slow connections
3. **Performance tab** - Profile performance
4. **Storage** - Check localStorage
5. **Console** - View errors and debug

## Getting Help

1. Check browser console (F12) for errors
2. Check Network tab for failed requests
3. Verify API is running
4. Check that CSS/JS files are loading
5. Review CONVERSION_GUIDE.md for details

---

**You're ready to go! Happy coding!** 🚀
