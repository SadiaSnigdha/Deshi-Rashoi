# Architecture & Implementation Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        HTML/CSS/JavaScript                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 index.html (DOM)                         │  │
│  │  ┌─────────────┬──────────────┬──────────────────────┐   │  │
│  │  │  Navbar     │  Login Modal  │  Page Container     │   │  │
│  │  │             │              │                      │   │  │
│  │  │ ┌─────────┐ │              │  (Rendered pages)   │   │  │
│  │  │ │Cart Dot │ │              │                      │   │  │
│  │  │ └─────────┘ │              │                      │   │  │
│  │  └─────────────┴──────────────┴──────────────────────┘   │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │                    Footer                            │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ▲                                     │
│                            │ Updates DOM                         │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   JavaScript Modules                     │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │ app.js - Main Entry Point & Initialization        │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │           ▲              ▲              ▲                │  │
│  │           │              │              │                │  │
│  │  ┌────────┴──┐  ┌────────┴──┐  ┌──────┴──────┐         │  │
│  │  │ store.js  │  │ router.js │  │  pages.js   │         │  │
│  │  │           │  │           │  │             │         │  │
│  │  │• State    │  │• Navigation│  │• Templates  │         │  │
│  │  │• Data     │  │• Pages     │  │• Rendering  │         │  │
│  │  │• Methods  │  │• Listeners │  │• HTML       │         │  │
│  │  └─────┬─────┘  └─────┬──────┘  └──────┬──────┘         │  │
│  │        │              │               │                  │  │
│  │        └──────────────┼───────────────┘                  │  │
│  │                       │                                  │  │
│  │  ┌────────────────────┴─────────────────────────────┐   │  │
│  │  │              api.js & toast.js                   │   │  │
│  │  │  • Fetch API calls    • Notifications           │   │  │
│  │  └────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ▲                                     │
│                            │ API Calls                           │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                    Network/Internet
                             │
                             ▼
                    ┌────────────────────┐
                    │   Backend API      │
                    │   (Node.js)        │
                    │   (Express)        │
                    │   (MongoDB)        │
                    └────────────────────┘
```

## Data Flow

### Page Initialization
```
1. DOMContentLoaded Event
   ↓
2. app.js executes
   ↓
3. Store.init()
   └─ Fetches food list from API
   └─ Loads cached data from localStorage
   ↓
4. Router.init()
   └─ Checks current URL hash
   └─ Renders appropriate page
   ↓
5. Attach Event Listeners
   └─ Setup click handlers
   └─ Setup form submissions
```

### User Action Flow
```
User clicks button
   ↓
Event listener triggers
   ↓
Call Store method (e.g., addToCart)
   ↓
Store updates state
   └─ Call API if needed
   └─ Notify subscribers
   ↓
Subscribers update UI
   ↓
User sees changes
```

### State Management Flow
```
Store.state = {
    food_list: [],
    cartItems: {},
    token: '',
    user: null
}
   ↓
Component subscribes: Store.subscribe(callback)
   ↓
State changes: Store.addToCart(itemId)
   ↓
Store.notify() called
   ↓
All subscribers' callbacks executed
   ↓
Components update their UI
```

## Module Responsibilities

### app.js
```javascript
// Entry point and initialization
- Initialize DOM when ready
- Set up Store
- Set up Router
- Configure login form behavior
```

### store.js
```javascript
// Centralized state management
- Maintain application state
- Provide state update methods
- API integration
- Observer pattern implementation
- localStorage persistence
```

### router.js
```javascript
// Client-side navigation
- Hash-based URL routing
- Page rendering
- Event listener attachment
- Authentication checks
- Sidebar navigation
```

### pages.js
```javascript
// HTML template generation
- Generate HTML for each page
- Return template strings
- Use current state to render
- Component composition
```

### api.js
```javascript
// API client
- Fetch requests to backend
- Error handling
- Token management
- Request/response formatting
```

### toast.js
```javascript
// User notifications
- Show toast messages
- Customize message type (success, error, info, warning)
- Auto-dismiss after timeout
- Animation handling
```

## Event Flow Details

### Form Submission
```
1. User fills form and clicks submit
   ↓
2. Form event listener catches submission
   ↓
3. preventDefault() stops page reload
   ↓
4. Extract form data
   ↓
5. Call Store method (e.g., Store.login)
   ↓
6. Store method calls API
   ↓
7. API returns response
   ↓
8. Update Store.state
   ↓
9. Show toast notification
   ↓
10. Trigger re-render or navigation
```

### Navigation
```
1. User clicks link or button
   ↓
2. Set window.location.hash = '/new-page'
   ↓
3. hashchange event fires
   ↓
4. Router.navigate() called
   ↓
5. Extract page from hash
   ↓
6. Render appropriate page
   ↓
7. Attach event listeners
   ↓
8. Scroll to top
```

## State Management Patterns

### Reading State
```javascript
// Direct access
const total = Store.state.cartItems;

// Derived state
const cartAmount = Store.getTotalCartAmount();
```

### Updating State
```javascript
// With API call
Store.addToCart(itemId)
  ├─ Update local state
  ├─ Call API if logged in
  └─ Notify subscribers

// Direct update (when no API needed)
Store.state.someField = value
Store.notify()
```

### Subscribing to Changes
```javascript
// Subscribe to all state changes
Store.subscribe(() => {
    console.log('State changed!', Store.state);
    updateUI();
});

// One-time use
const unsubscribe = Store.subscribe(callback);
// Later: unsubscribe();
```

## Authentication Flow

### Login Process
```
Login Form
   ↓
Store.login(email, password)
   ├─ Call API.login()
   ├─ Check if response.success
   ├─ If success:
   │  ├─ Save token to localStorage
   │  ├─ Update Store.state.token
   │  ├─ Load cart data
   │  └─ Call Store.notify()
   └─ Return {success, message}
   
   ↓
Notify subscribers
   ├─ Update navbar (show profile, hide signin)
   ├─ Update cart data
   └─ Enable checkout
```

### Authorization Checks
```
Protected Actions (Checkout, Orders):
  if (!Store.state.token) {
    → Show login popup
    → Don't proceed
  } else {
    → Allow action
    → Proceed normally
  }
```

## API Communication

### Request Pattern
```javascript
const response = await API.request('/endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        'token': token  // Added if exists
    }
})

// Response
{
    success: true/false,
    data: {...},
    message: "...",
    token: "...",  // If auth endpoint
    role: "admin"  // If login endpoint
}
```

### Error Handling
```javascript
// API layer catches fetch errors
try {
    const response = await fetch(...)
    const data = await response.json()
} catch (error) {
    return { success: false, message: 'Network error' }
}

// Component layer handles API errors
if (!response.success) {
    showToast(response.message, 'error')
}
```

## Rendering System

### Static Content
```html
<!-- In index.html -->
<div class="navbar">...</div>
<footer>...</footer>
```

### Dynamic Content
```javascript
// In pages.js
function cartPage() {
    return `
        <div class="cart">
            ${generateCartItems()}
        </div>
    `
}

// Inserted into DOM
document.getElementById('page-container').innerHTML = Pages.cartPage()
```

### Event Delegation Patterns
```javascript
// Attach to newly rendered button
document.getElementById('my-button').addEventListener('click', handler)

// Or use class selectors
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', handler)
})
```

## Performance Considerations

### Re-rendering
```javascript
// Full page re-render (used for cart, etc.)
Router.renderPage(page)

// Selective updates (could be added)
// Currently no selective rendering - entire page re-renders
```

### State Subscriptions
```javascript
// All subscribers called on ANY state change
Store.notify()

// Potential improvement: selective subscriptions
Store.subscribe('cartItems', callback)  // Only on cart change
```

### DOM Updates
```javascript
// innerHTML replaces entire content
container.innerHTML = newHTML

// Potential improvement: Use createElement + appendChild
// for better performance with large lists
```

## Comparison: React vs Vanilla

| Feature | React | Vanilla JS |
|---------|-------|-----------|
| Component | JSX Function | String Template |
| State | useState Hook | Store object |
| State Update | setCount() | Store.notify() |
| Routing | React Router | Hash + Router object |
| Notifications | react-toastify | Custom showToast() |
| API Calls | Axios | Fetch API |
| Re-render | Automatic | Manual renderPage() |
| Bundle Size | ~40KB | 0KB (vanilla) |
| Learning Curve | Steep | Shallow |
| Performance | Good | Better |

## Debugging Tips

### Check Current State
```javascript
// In browser console
console.log(Store.state)
```

### Check Current Page
```javascript
console.log(Router.currentPage)
```

### Monitor State Changes
```javascript
Store.subscribe(() => {
    console.log('State updated:', Store.state)
})
```

### API Request Debugging
```javascript
// Network tab shows all requests
// Check:
// - Request headers (token)
// - Request body (data)
// - Response status
// - Response body
```

### Event Listener Issues
```javascript
// If event not firing:
// 1. Check element exists in DOM
// 2. Check listener attached after rendering
// 3. Check console for errors
// 4. Use DevTools debugger
```

## Extension Points

### Adding New Feature
1. Create Store method for state
2. Create API method for backend call
3. Create page template in pages.js
4. Add route in router.js
5. Add navigation link
6. Attach event listeners

### Using Existing Infrastructure
```javascript
// Use Store
Store.addToCart(itemId)

// Use API
const response = await API.getFoodList()

// Use Toast
showToast('Success!', 'success')

// Subscribe to changes
Store.subscribe(() => updateUI())
```

---

This architecture is simple, maintainable, and performs well for small to medium-sized applications!
