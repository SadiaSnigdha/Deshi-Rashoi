// Pages - HTML rendering for all pages
const Pages = {
    homePage() {
        return `
            <div>
                ${this.headerComponent()}
                ${this.exploreMenuComponent()}
                ${this.foodDisplayComponent()}
                ${this.appDownloadComponent()}
            </div>
        `;
    },
    
    headerComponent() {
        return `
            <div class="header">
                <div class="header-contents">
                    <h2>Order your favourite food here</h2>
                    <p>Choose from a diverse menu featuring a detectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                    <button id="view-menu-btn">View Menu</button>
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
                <h2>Top dishes near you</h2>
                <div class="food-display-list">
                    ${foodItems.filter(item => selectedCategory === 'All' || selectedCategory === item.category).map(item => `
                        <div class="food-item">
                            <div class="food-item-img-container">
                                <img class="food-item-img" src="${API.baseURL}/images/${item.image}" alt="${item.name}">
                                <img class="add-btn" src="src/assets/frontend_assets/add_icon_white.png" alt="Add" data-id="${item._id}">
                            </div>
                            <div class="food-item-info">
                                <div class="food-item-name-rating">
                                    <p>${item.name}</p>
                                    <img src="src/assets/frontend_assets/rating_starts.png" alt="Rating">
                                </div>
                                <p class="food-item-desc">${item.description}</p>
                                <p class="food-item-price">$${item.price}</p>
                            </div>
                        </div>
                    `).join('')}
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
                const item = foodList.find(food => food._id === itemId);
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
                    <div class="multi-fields">
                        <input id="city" name="city" type="text" placeholder="City" required>
                        <input id="state" name="state" type="text" placeholder="State" required>
                    </div>
                    <div class="multi-fields">
                        <input id="zipcode" name="zipCode" type="text" placeholder="Zip code" required>
                        <input id="country" name="country" type="text" placeholder="Country" required>
                    </div>
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
            <div class="myorders">
                <p id="orders-title">My Orders</p>
                <div id="orders-container" class="orders-container"></div>
            </div>
        `;
    },
};
