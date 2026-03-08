// Store - Global state management
const Store = {
    state: {
        food_list: [],
        cartItems: {},  // Start with empty cart on page load
        token: localStorage.getItem('token') || '',
        user: null,
    },
    
    
    subscribers: [],
    
    // Subscribe to state changes
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    },
    
    // Notify all subscribers of state change
    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    },
    
    // Initialize store
    async init() {
        await this.fetchFoodList();
        if (this.state.token) {
            await this.loadCartData();
        }
    },
    
    // Fetch food list from API
    async fetchFoodList() {
        const response = await API.getFoodList();
        if (response.success) {
            this.state.food_list = response.data;
            this.notify();
        }
    },
    
    // Add item to cart
    async addToCart(itemId) {
        if (!this.state.cartItems[itemId]) {
            this.state.cartItems[itemId] = 1;
        } else {
            this.state.cartItems[itemId]++;
        }
        
        
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
        
        if (this.state.token) {
            const response = await API.addToCart(itemId);
            if (response.success) {
                showToast('Item added to cart', 'success');
            } else {
                showToast('Something went wrong', 'error');
            }
        }
        this.notify();
    },
    
    // Remove item from cart
    async removeFromCart(itemId) {
        if (this.state.cartItems[itemId] > 0) {
            this.state.cartItems[itemId]--;
        }
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
        
        if (this.state.token) {
            const response = await API.removeFromCart(itemId);
            if (response.success) {
                showToast('Item removed from cart', 'success');
            } else {
                showToast('Something went wrong', 'error');
            }
        }
        this.notify();
    },
    
    // Load cart data from server
    async loadCartData() {
        const response = await API.getCart();
        if (response.success) {
            const serverCart = response.cartData || {};
            // Merge local cart with server cart (local items take priority)
            this.state.cartItems = { ...serverCart, ...this.state.cartItems };
            localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
            this.notify();
        }
    },
    
    // Get total cart amount
    getTotalCartAmount() {
        let totalAmount = 0;
        for (const itemId in this.state.cartItems) {
            if (this.state.cartItems[itemId] > 0) {
                const itemInfo = this.state.food_list.find(product => product.id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * this.state.cartItems[itemId];
                }
            }
        }
        return totalAmount;
    },
    
    // Get cart item count
    getCartItemCount() {
        let count = 0;
        for (const itemId in this.state.cartItems) {
            count += this.state.cartItems[itemId];
        }
        return count;
    },
    
    // Login
    async login(email, password) {
        const response = await API.login(email, password);
        if (response.success) {
            this.state.token = response.token;
            localStorage.setItem('token', response.token);
            await this.loadCartData();
            this.notify();
            return { success: true };
        } else {
            return { success: false, message: response.message };
        }
    },
    
    // Register
    async register(name, email, password) {
        const response = await API.register(name, email, password);
        if (response.success) {
            this.state.token = response.token;
            localStorage.setItem('token', response.token);
            await this.loadCartData();
            this.notify();
            return { success: true };
        } else {
            return { success: false, message: response.message };
        }
    },
    
    // Logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        this.state.token = '';
        this.state.cartItems = {};
        this.notify();
    },
    
    // Place order
    async placeOrder(orderData) {
        const response = await API.placeOrder(orderData);
        return response;
    },
    
    
    async verifyOrder(orderId, success) {
        const response = await API.verifyOrder(orderId, success);
        return response;
    },
    
    
    async getUserOrders() {
        const response = await API.getUserOrders();
        if (response.success) {
            return response.data;
        }
        return [];
    },
};
