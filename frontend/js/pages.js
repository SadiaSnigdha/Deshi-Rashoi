// Pages - HTML rendering for all pages
const Pages = {
    homePage() {
        return `
            <div id="home-page">
                ${this.headerComponent()}
                ${this.foodCategoriesComponent()}
                ${this.foodDisplayComponent()}
                ${this.appDownloadComponent()}
            </div>
        `;
    },
    
    headerComponent() {
        return `
            <div class="header">
                <div class="header-contents">
                    <h1 class="restaurant-name">Deshi Rasoi</h1>
                    <h2>Order your favourite food here</h2>
                    <p>Welcome to Deshi Rasoi! Discover authentic, delicious dishes prepared with the finest ingredients and traditional culinary expertise. From aromatic biryanis to creamy curries, refreshing drinks to delightful sweets - we bring you the best of culinary excellence. One meal at a time, we satisfy your cravings and elevate your dining experience.</p>
                    <button id="view-menu-btn">View Menu</button>
                </div>
            </div>
        `;
    },
    
    foodCategoriesComponent() {
        const categories = [
            { name: 'Biryani', image: 'src/assets/frontend_assets/menu_1.png', description: 'Aromatic rice dishes' },
            { name: 'Curry', image: 'src/assets/frontend_assets/menu_2.png', description: 'Rich and flavorful curries' },
            { name: 'Drink', image: 'src/assets/frontend_assets/menu_7.png', description: 'Refreshing beverages' },
            { name: 'Sweet', image: 'src/assets/frontend_assets/menu_5.png', description: 'Delightful desserts' }
        ];
        
        return `
            <div class="food-categories-section">
                <h2>Our Main Categories</h2>
                <div class="food-categories-grid">
                    ${categories.map(cat => `
                        <div class="category-card" data-category="${cat.name}">
                            <div class="category-card-image">
                                <img src="${cat.image}" alt="${cat.name}">
                            </div>
                            <div class="category-card-content">
                                <h3>${cat.name}</h3>
                                <p>${cat.description}</p>
                                <button class="explore-btn">Explore</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    exploreMenuComponent() {
        const menuItems = [
            { name: 'Salad', image: 'src/assets/frontend_assets/menu_1.png' },
            { name: 'Rolls', image: 'src/assets/frontend_assets/menu_2.png' },
            { name: 'Deserts', image: 'src/assets/frontend_assets/menu_3.png' },
            { name: 'Sandwich', image: 'src/assets/frontend_assets/menu_4.png' },
            { name: 'Cake', image: 'src/assets/frontend_assets/menu_5.png' },
            { name: 'Pure Veg', image: 'src/assets/frontend_assets/menu_6.png' },
            { name: 'Pasta', image: 'src/assets/frontend_assets/menu_7.png' },
            { name: 'Noodles', image: 'src/assets/frontend_assets/menu_8.png' },
        ];
        
        return `
            <div class="explore-menu" id="explore-menu">
                <h1>Explore our menu</h1>
                <p class="explore-menu-text">Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <div class="explore-menu-list">
                    ${menuItems.map((item, index) => `
                        <div class="explore-menu-list-item menu-item" data-category="${item.name}">
                            <img src="${item.image}" alt="${item.name}" class="menu-image">
                            <p>${item.name}</p>
                        </div>
                    `).join('')}
                </div>
                <hr/>
            </div>
        `;
    },
    
    foodDisplayComponent() {
        const foodItems = Store.state.food_list;
        const selectedCategory = window.selectedCategory || 'All';
        
        return `
            <div class="food-display" id="food-display">
                <h2>${selectedCategory === 'All' ? 'All Available Dishes' : selectedCategory + ' Dishes'}</h2>
                <div class="food-display-list">
                    ${foodItems.filter(item => selectedCategory === 'All' || selectedCategory === item.category).map(item => {
                        const itemCount = Store.state.cartItems[item.id] || 0;
                        return `
                            <div class="food-item">
                                <div class="food-item-img-container">
                                    <img class="food-item-image" src="${API.baseURL}/images/${item.image}" alt="${item.name}">
                                    ${itemCount === 0 ? 
                                        `<button class="order-now-btn add" data-id="${item.id}" title="Add to Cart">Order Now</button>` :
                                        `<div class="food-item-counter">
                                            <button class="remove-counter counter-btn" data-id="${item.id}">−</button>
                                            <p class="counter-value">${itemCount}</p>
                                            <button class="add-counter counter-btn" data-id="${item.id}">+</button>
                                        </div>`
                                    }
                                </div>
                                <div class="food-item-info">
                                    <div class="food-item-header">
                                        <h3>${item.name}</h3>
                                        <div class="food-rating">
                                            <img src="src/assets/frontend_assets/rating_starts.png" alt="Rating">
                                        </div>
                                    </div>
                                    <p class="food-item-desc">${item.description}</p>
                                    <div class="food-item-footer">
                                        <p class="food-item-price">$${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },
    
    appDownloadComponent() {
        return `
            <div class="app-download" id="app-download">
                <p>For better Experience download<br>Tomato App</p>
                <div class="app-download-platforms">
                    <img src="src/assets/frontend_assets/play_store.png" alt="Play Store">
                    <img src="src/assets/frontend_assets/app_store.png" alt="App Store">
                </div>
            </div>
        `;
    },
    
    cartPage() {
        const cartItems = Store.state.cartItems;
        const foodList = Store.state.food_list;
        const total = Store.getTotalCartAmount();
        const delivery = total === 0 ? 0 : 2;
        const grandTotal = total + delivery;
        
        let cartContent = '';
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const item = foodList.find(food => food.id === itemId);
                if (item) {
                    cartContent += `
                        <div>
                            <div class="cart-items-title cart-items-item">
                                <img src="${API.baseURL}/images/${item.image}" alt="${item.name}">
                                <p>${item.name}</p>
                                <p>$${item.price}</p>
                                <p>${cartItems[itemId]}</p>
                                <p>$${item.price * cartItems[itemId]}</p>
                                <p class="cross remove-item" data-id="${itemId}">x</p>
                            </div>
                            <hr>
                        </div>
                    `;
                }
            }
        }
        
        return `
            <div class="cart">
                <div class="cart-items">
                    <div class="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                    ${cartContent || '<p>Your cart is empty</p>'}
                </div>
                <div class="cart-bottom">
                    <div class="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div class="cart-total-details">
                                <p>Subtotals</p>
                                <p>$${total}</p>
                            </div>
                            <hr />
                            <div class="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>$${delivery}</p>
                            </div>
                            <hr />
                            <div class="cart-total-details">
                                <b>Total</b>
                                <b>$${grandTotal}</b>
                            </div>
                        </div>
                        <button id="checkout-btn" class="checkout-button">PROCEED TO CHECKOUT</button>
                    </div>
                    <div class="cart-promocode">
                        <div>
                            <p>If you have a promocode, Enter it here</p>
                            <div class="cart-promocode-input">
                                <input type="text" placeholder="promo code">
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    placeOrderPage() {
        const total = Store.getTotalCartAmount();
        const delivery = total === 0 ? 0 : 2;
        const grandTotal = total + delivery;
        
        return `
            <form class="place-order" id="place-order-form">
                <div class="place-order-left">
                    <p class="title">Delivery Information</p>
                    <div class="multi-fields">
                        <input id="fname" name="firstName" type="text" placeholder="First name" required>
                        <input id="lname" name="lastName" type="text" placeholder="Last name" required>
                    </div>
                    <input id="email" name="email" type="email" placeholder="Email address" required>
                    <input id="street" name="street" type="text" placeholder="Street" required>
                    <input id="city" name="city" type="text" placeholder="City" required>
                    <input id="phone" name="phone" type="text" placeholder="Phone" required>
                </div>
                <div class="place-order-right">
                    <div class="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div class="cart-total-details">
                                <p>Subtotals</p>
                                <p>$${total}</p>
                            </div>
                            <hr />
                            <div class="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>$${delivery}</p>
                            </div>
                            <hr />
                            <div class="cart-total-details">
                                <b>Total</b>
                                <b>$${grandTotal}</b>
                            </div>
                        </div>
                        <button type="submit" id="place-order-btn">PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        `;
    },
    
    verifyPage() {
        return `
            <div class="verify" id="verify">
                <div class="spinner"></div>
            </div>
        `;
    },
    
    myOrdersPage() {
        return `
            <div class="my-orders">
                <p id="orders-title">My Orders</p>
                <div id="orders-container" class="container"></div>
            </div>
        `;
    },
};
