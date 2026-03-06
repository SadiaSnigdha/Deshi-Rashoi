
function showToast(message, type) {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    // Force reflow to trigger animation
    void toast.offsetWidth;
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Router - handles page navigation
const Router = {
    currentPage: '',
    
    init() {
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    },
    
    navigate() {
        const hash = window.location.hash.slice(1) || '/';
        const [path] = hash.split('?');
        
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
        // Navigation links click handlers
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const text = link.textContent.toLowerCase().trim();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Handle navigation
                if (text === 'home') {
                    window.selectedCategory = 'All';
                    const container = document.getElementById('page-container');
                    container.innerHTML = Pages.homePage();
                    this.attachEventListeners('/');
                    setTimeout(() => {
                        const header = document.querySelector('.header');
                        if (header) {
                            header.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }, 100);
                } else if (text === 'menu') {
                    window.selectedCategory = 'All';
                    const container = document.getElementById('page-container');
                    container.innerHTML = Pages.homePage();
                    this.attachEventListeners('/');
                    setTimeout(() => {
                        const foodDisplay = document.getElementById('food-display');
                        if (foodDisplay) {
                            foodDisplay.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                } else if (text === 'mobile-app') {
                    // Ensure we're on home page first
                    const container = document.getElementById('page-container');
                    if (!container.innerHTML.includes('app-download')) {
                        container.innerHTML = Pages.homePage();
                        this.attachEventListeners('/');
                    }
                    // Scroll to app download section
                    setTimeout(() => {
                        const appDownload = document.getElementById('app-download');
                        if (appDownload) {
                            appDownload.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                } else if (text === 'contact us') {
                    setTimeout(() => {
                        const footer = document.querySelector('footer') || document.querySelector('.footer');
                        if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }
                    }, 100);
                }
            });
        });
        
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
                window.selectedCategory = 'All';
                const container = document.getElementById('page-container');
                container.innerHTML = Pages.homePage();
                this.attachEventListeners('/');
                setTimeout(() => {
                    const foodDisplay = document.getElementById('food-display');
                    if (foodDisplay) {
                        foodDisplay.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
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
        // Category card clicks
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                window.selectedCategory = category;
                const container = document.getElementById('page-container');
                container.innerHTML = Pages.homePage();
                this.attachHomePageListeners();
                document.getElementById('food-display').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // View Menu button
        const viewMenuBtn = document.getElementById('view-menu-btn');
        if (viewMenuBtn) {
            viewMenuBtn.addEventListener('click', () => {
                window.selectedCategory = 'All';
                const container = document.getElementById('page-container');
                container.innerHTML = Pages.homePage();
                this.attachHomePageListeners();
                document.getElementById('food-display').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Add to cart buttons (Order Now)
        const addButtons = document.querySelectorAll('.add');
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const itemId = btn.dataset.id;
                Store.addToCart(itemId);
                showToast('Added to cart', 'success');
            });
        });
        
        // Add counter buttons
        const addCounters = document.querySelectorAll('.add-counter');
        addCounters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const itemId = btn.dataset.id;
                Store.addToCart(itemId);
                
                // Update counter value directly without re-render
                const counterValue = btn.parentElement.querySelector('.counter-value');
                if (counterValue) {
                    counterValue.textContent = Store.state.cartItems[itemId];
                }
            });
        });
        
        // Remove counter buttons
        const removeCounters = document.querySelectorAll('.remove-counter');
        removeCounters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const itemId = btn.dataset.id;
                Store.removeFromCart(itemId);
                
                // Update counter value directly without re-render
                const counterValue = btn.parentElement.querySelector('.counter-value');
                if (counterValue) {
                    counterValue.textContent = Store.state.cartItems[itemId];
                }
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
                
                // Build items array with full details
                const items = [];
                for (const itemId in Store.state.cartItems) {
                    if (Store.state.cartItems[itemId] > 0) {
                        const item = Store.state.food_list.find(food => food.id === itemId);
                        if (item) {
                            items.push({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                quantity: Store.state.cartItems[itemId],
                            });
                        }
                    }
                }
                
                // Wrap address fields in address object
                const formData = {
                    address: {
                        firstName: document.getElementById('fname').value,
                        lastName: document.getElementById('lname').value,
                        email: document.getElementById('email').value,
                        street: document.getElementById('street').value,
                        city: document.getElementById('city').value,
                        phone: document.getElementById('phone').value,
                    },
                    items: items,
                    amount: Store.getTotalCartAmount() + 2,
                };
                
                const response = await Store.placeOrder(formData);
                if (response.success) {
                    window.sessionStorage.setItem('orderId', response.orderId);
                    showToast('✓ Order placed successfully!', 'success');
                    console.log('Order successfully placed:', response.orderId);
                    // Wait 3.5 seconds then redirect to payment to show the message
                    setTimeout(() => {
                        window.location.href = response.session_url;
                    }, 3500);
                } else {
                    console.log("Order Error:", response);
                    showToast(response.message || 'Error placing order', 'error');
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
                            <p class="order-item">Address: ${order.address.street}, ${order.address.city}</p>
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

// Initialize the router
Router.init();
