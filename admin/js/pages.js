// Admin Pages
const AdminPages = {
    loginPage() {
        return `
            <div class="login-popup">
                <form id="admin-login-form" class="login-popup-container">
                    <div class="login-popup-title">
                        <h2>Admin Login</h2>
                    </div>
                    <div class="login-popup-inputs">
                        <input id="admin-email" name="email" type="email" placeholder="Your email" required>
                        <input id="admin-password" name="password" type="password" placeholder="Your password" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    },
    
    addPage() {
        return `
            <div class="add">
                <form id="add-food-form" class="flex-col">
                    <div class="add-img-upload flex-col">
                        <p>Upload image</p>
                        <label for="food-image">
                            <img id="image-preview" src="src/assets/upload_area.png" alt="Upload">
                        </label>
                        <input type="file" id="food-image" hidden required accept="image/*">
                    </div>
                    <div class="add-product-name flex-col">
                        <p>Product name</p>
                        <input id="food-name" type="text" name="name" placeholder="Type here" required>
                    </div>
                    <div class="add-product-description flex-col">
                        <p>Product description</p>
                        <textarea id="food-desc" name="description" rows="6" placeholder="Write content here" required></textarea>
                    </div>
                    <div class="add-category-price">
                        <div class="add-category flex-col">
                            <p>Product category</p>
                            <select id="food-category" name="category" required>
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        <div class="add-price flex-col">
                            <p>Product price</p>
                            <input id="food-price" type="number" name="price" placeholder="$20" required>
                        </div>
                    </div>
                    <button type="submit" class="add-btn">ADD</button>
                </form>
            </div>
        `;
    },
    
    listPage() {
        const foodList = AdminStore.state.foodList;
        
        return `
            <div class="list add flex-col">
                <p>All Food List</p>
                <div class="list-table">
                    <div class="list-table-format title">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>
                    ${foodList.map(item => `
                        <div class="list-table-format">
                            <img src="${AdminAPI.baseURL}/images/${item.image}" alt="${item.name}">
                            <p>${item.name}</p>
                            <p>${item.category}</p>
                            <p>$${item.price}</p>
                            <p class="cursor remove-food" data-id="${item._id}">X</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    ordersPage() {
        const orders = AdminStore.state.orders;
        
        return `
            <div class="order add">
                <h3>Order Page</h3>
                <div class="order-list">
                    ${orders.map(order => `
                        <div class="order-item">
                            <img src="src/assets/parcel_icon.png" alt="Parcel">
                            <div>
                                <p class="order-item-food">
                                    ${order.items.map((item, idx) => 
                                        `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
                                    ).join('')}
                                </p>
                                <p class="order-item-name">${order.address.firstName} ${order.address.lastName}</p>
                                <div class="order-item-address">
                                    <p>${order.address.street},</p>
                                    <p>${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}</p>
                                </div>
                                <p class="order-item-phone">${order.address.phone}</p>
                            </div>
                            <p>Items: ${order.items.length}</p>
                            <p>$${order.amount}</p>
                            <select class="order-status" data-id="${order._id}" value="${order.status}">
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
};
