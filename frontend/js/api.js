const API = {
    baseURL: typeof __API_URL__ !== 'undefined' ? __API_URL__ : 'http://localhost:3000',
    
    
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        
        if (token) {
            headers['token'] = token;
        }
        
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers,
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, message: 'Network error' };
        }
    },
    
    async getFoodList() {
        return this.request('/api/food/list', { method: 'GET' });
    },
    
    // Cart endpoints
    async addToCart(itemId) {
        return this.request('/api/cart/add', {
            method: 'POST',
            body: JSON.stringify({ itemId }),
        });
    },
    
    async removeFromCart(itemId) {
        return this.request('/api/cart/remove', {
            method: 'POST',
            body: JSON.stringify({ itemId }),
        });
    },
    
    async getCart() {
        return this.request('/api/cart/get', {
            method: 'POST',
            body: JSON.stringify({}),
        });
    },
    
    // User endpoints
    async login(email, password) {
        return this.request('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },
    
    async register(name, email, password) {
        return this.request('/api/user/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },
    
    // Order endpoints
    async placeOrder(data) {
        return this.request('/api/order/place', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    
    async verifyOrder(orderId, success) {
        return this.request('/api/order/verify', {
            method: 'POST',
            body: JSON.stringify({ orderId, success }),
        });
    },
    
    async getUserOrders() {
        return this.request('/api/order/userorders', {
            method: 'POST',
            body: JSON.stringify({}),
        });
    },
};
