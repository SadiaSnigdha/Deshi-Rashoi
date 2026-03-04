// Admin API Module
const AdminAPI = {
    baseURL: 'http://localhost:4000',
    
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
    
    async login(email, password) {
        return this.request('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },
    
    async addFood(formData) {
        const token = localStorage.getItem('token');
        const headers = {
            'token': token,
        };
        
        try {
            const response = await fetch(`${this.baseURL}/api/food/add`, {
                method: 'POST',
                headers,
                body: formData,
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, message: 'Network error' };
        }
    },
    
    async getFoodList() {
        return this.request('/api/food/list', { method: 'GET' });
    },
    
    async removeFood(foodId) {
        return this.request('/api/food/remove', {
            method: 'POST',
            body: JSON.stringify({ id: foodId }),
        });
    },
    
    async getOrders() {
        return this.request('/api/order/list', {
            method: 'GET',
        });
    },
    
    async updateOrderStatus(orderId, status) {
        return this.request('/api/order/status', {
            method: 'POST',
            body: JSON.stringify({ orderId, status }),
        });
    },
};
