// Admin Store
const AdminStore = {
    state: {
        token: localStorage.getItem('token') || '',
        admin: localStorage.getItem('admin') === 'true',
        foodList: [],
        orders: [],
    },
    
    subscribers: [],
    
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    },
    
    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    },
    
    async init() {
        if (this.state.token && this.state.admin) {
            await this.fetchFoodList();
        }
    },
    
    async login(email, password) {
        console.log('AdminStore.login called with email:', email);
        const response = await AdminAPI.login(email, password);
        console.log('API Response:', response);
        
        if (response.success) {
            console.log('Login successful, role:', response.role);
            if (response.role === 'admin') {
                this.state.token = response.token;
                this.state.admin = true;
                localStorage.setItem('token', response.token);
                localStorage.setItem('admin', 'true');
                this.notify();
                console.log('Admin state saved');
                return { success: true };
            } else {
                console.log('User is not admin, role:', response.role);
                return { success: false, message: 'You are not an admin' };
            }
        } else {
            console.log('Login failed:', response.message);
            return { success: false, message: response.message };
        }
    },
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        this.state.token = '';
        this.state.admin = false;
        this.notify();
    },
    
    async fetchFoodList() {
        const response = await AdminAPI.getFoodList();
        if (response.success) {
            this.state.foodList = response.data;
            this.notify();
        }
    },
    
    async addFood(formData) {
        const response = await AdminAPI.addFood(formData);
        if (response.success) {
            await this.fetchFoodList();
        }
        return response;
    },
    
    async removeFood(foodId) {
        const response = await AdminAPI.removeFood(foodId);
        if (response.success) {
            await this.fetchFoodList();
        }
        return response;
    },
    
    async fetchOrders() {
        const response = await AdminAPI.getOrders();
        if (response.success) {
            this.state.orders = response.data;
            this.notify();
        }
    },
    
    async updateOrderStatus(orderId, status) {
        const response = await AdminAPI.updateOrderStatus(orderId, status);
        if (response.success) {
            await this.fetchOrders();
        }
        return response;
    },
};
