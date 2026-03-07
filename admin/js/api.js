// Admin API Module
const AdminAPI = {
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
        
        const url = `${this.baseURL}${endpoint}`;
        console.log('🔗 Fetch URL:', url);
        console.log('📤 Request options:', { method: options.method, headers });
        
        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });
            
            console.log('📥 Response status:', response.status);
            const data = await response.json();
            console.log('📦 Response data:', data);
            return data;
        } catch (error) {
            console.error('❌ API Error:', error);
            return { success: false, message: 'Network error: ' + error.message };
        }
    },
    
    async login(email, password) {
        console.log('🌐 AdminAPI.login called, baseURL:', this.baseURL);
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
