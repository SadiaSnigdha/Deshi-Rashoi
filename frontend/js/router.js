// Router - handles page navigation
const Router = {
    currentPage: '',
    
    init() {
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    },
    
    navigate() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, ...query] = hash.split('?');
        
        this.currentPage = path || '/';
        this.renderPage(path);
    },
    
    renderPage(page) {
        const container = document.getElementById('page-container');
        let content = '';
        
        switch (page) {
            case '/':
                window.selectedCategory = 'All';
                content = Pages.homePage();
                break;
            case '/cart':
                content = Pages.cartPage();
                break;
            case '/order':
                if (!Store.state.token) {
                    showToast('Please login first', 'error');
                    window.location.hash = '/';
                    return;
                }
                content = Pages.placeOrderPage();
                break;
            case '/verify':
                content = Pages.verifyPage();
                break;
            case '/myorders':
                if (!Store.state.token) {
                    showToast('Please login first', 'error');
                    window.location.hash = '/';
                    return;
                }
                content = Pages.myOrdersPage();
                break;
            default:
                content = Pages.homePage();
        }
        
        container.innerHTML = content;
        this.attachEventListeners(page);
        window.scrollTo(0, 0);
    },
    
    attachEventListeners(page) {
        // Global event listeners
        this.attachNavbarListeners();
        this.attachAuthListeners();
        
        if (page === '/') {
            this.attachHomePageListeners();
        } else if (page === '/cart') {
            this.attachCartPageListeners();
        } else if (page === '/order') {
            this.attachPlaceOrderListeners();
        } else if (page === '/verify') {
            this.attachVerifyPageListeners();
        } else if (page === '/myorders') {
            this.attachMyOrdersListeners();
        }
    },
    
    attachNavbarListeners() {
        // Menu item active state
        const menuItems = document.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                menuItems.forEach(m => m.classList.remove('active'));
                item.classList.add('active');
            });
        });
        
        // View menu button
        const viewMenuBtn = document.getElementById('view-menu-btn');
        if (viewMenuBtn) {
            viewMenuBtn.addEventListener('click', () => {
                document.getElementById('explore-menu').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Menu category selection
        const menuItems2 = document.querySelectorAll('.menu-item');
        menuItems2.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                const img = item.querySelector('.menu-image');
                
                document.querySelectorAll('.menu-item .menu-image').forEach(i => i.classList.remove('active'));
                img.classList.add('active');
                
                window.selectedCategory = category;
                const container = document.getElementById('page-container');
                container.innerHTML = Pages.homePage();
                this.attachEventListeners('/');
                document.getElementById('food-display').scrollIntoView({ behavior: 'smooth' });
            });
        });
    },
    
    attachAuthListeners() {
        const loginPopup = document.getElementById('login-popup');
        const closeLogin = document.getElementById('close-login');
        const authContainer = document.getElementById('auth-container');
        
        closeLogin.addEventListener('click', () => {
            loginPopup.style.display = 'none';
        });
        
        loginPopup.addEventListener('click', (e) => {
            if (e.target === loginPopup) {
                loginPopup.style.display = 'none';
            }
        });
        
        this.updateAuthUI();
        
        // Subscribe to store changes
        Store.subscribe(() => this.updateAuthUI());
    },
    
    updateAuthUI() {
        const authContainer = document.getElementById('auth-container');
        const cartDot = document.getElementById('cart-dot');
        
        if (Store.getCartItemCount() > 0) {
            cartDot.style.display = 'block';
        } else {
            cartDot.style.display = 'none';
        }
        
        if (Store.state.token) {
            authContainer.innerHTML = `
                <div class="navbar-profile">
                    <img src="src/assets/frontend_assets/profile_icon.png" alt="Profile">
                    <ul class="nav-profile-dropdown">
                        <li class="orders-link">
                            <img src="src/assets/frontend_assets/bag_icon.png" alt="Orders">
                            <p>Orders</p>
                        </li>
                        <hr>
                        <li class="logout-link">
                            <img src="src/assets/frontend_assets/logout_icon.png" alt="Logout">
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>
            `;
            
            document.querySelector('.orders-link').addEventListener('click', () => {
                window.location.hash = '/myorders';
            });
            
            document.querySelector('.logout-link').addEventListener('click', () => {
                Store.logout();
                window.location.hash = '/';
                showToast('Logout Successfully', 'success');
            });
        } else {
            authContainer.innerHTML = `<button id="signin-btn">sign in</button>`;
            document.getElementById('signin-btn').addEventListener('click', () => {
                document.getElementById('login-popup').style.display = 'block';
            });
        }
    },
    
    attachHomePageListeners() {
        // Add to cart buttons
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.id;
                Store.addToCart(itemId);
            });
        });
    },
    
    attachCartPageListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.id;
                Store.removeFromCart(itemId);
                this.renderPage('/cart');
            });
        });
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (!Store.state.token) {
                    document.getElementById('login-popup').style.display = 'block';
                } else {
                    window.location.hash = '/order';
                }
            });
        }
    },
    
    attachPlaceOrderListeners() {
        const form = document.getElementById('place-order-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    firstName: document.getElementById('fname').value,
                    lastName: document.getElementById('lname').value,
                    email: document.getElementById('email').value,
                    street: document.getElementById('street').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zipCode: document.getElementById('zipcode').value,
                    country: document.getElementById('country').value,
                    phone: document.getElementById('phone').value,
                    items: Store.state.cartItems,
                    amount: Store.getTotalCartAmount() + 2,
                };
                
                const response = await Store.placeOrder(formData);
                if (response.success) {
                    window.sessionStorage.setItem('orderId', response.orderId);
                    // Redirect to Stripe payment
                    window.location.href = response.session_url;
                } else {
                    showToast('Error placing order', 'error');
                }
            });
        }
    },
    
    attachVerifyPageListeners() {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const orderId = window.sessionStorage.getItem('orderId');
        
        if (orderId) {
            Store.verifyOrder(orderId, success === 'true').then(() => {
                if (success === 'true') {
                    Store.state.cartItems = {};
                    Store.notify();
                    window.location.hash = '/myorders';
                } else {
                    window.location.hash = '/cart';
                }
            });
        }
    },
    
    attachMyOrdersListeners() {
        const loadOrders = async () => {
            const orders = await Store.getUserOrders();
            const container = document.getElementById('orders-container');
            
            if (orders && orders.length > 0) {
                container.innerHTML = orders.map(order => `
                    <div class="my-orders-order">
                        <img src="src/assets/frontend_assets/parcel_icon.png" alt="Parcel">
                        <div>
                            <p class="order-item">${order.items.map(item => `${item.name}x${item.quantity}`).join(', ')}</p>
                            <p class="order-item">Items: ${order.items.length}</p>
                            <p class="order-item">Address: ${order.address.street}, ${order.address.city}, ${order.address.state}</p>
                        </div>
                        <p>${order.status}</p>
                        <button class="track-order">Track Order</button>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<p>No orders placed yet</p>';
            }
        };
        
        loadOrders();
    },
};
