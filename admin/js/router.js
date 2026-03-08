// Admin Router
const AdminRouter = {
    currentPage: 'login',
    
    init() {
        this.checkAuth();
    },
    
    checkAuth() {
        if (!AdminStore.state.token || !AdminStore.state.admin) {
            this.currentPage = 'login';
            this.renderPage('login');
        } else {
            this.currentPage = 'add';
            this.renderPage('add');
        }
    },
    
    renderPage(page) {
        const container = document.getElementById('page-container');
        const sidebar = document.getElementById('sidebar');
        
        if (page === 'login') {
            sidebar.style.display = 'none';
            container.innerHTML = AdminPages.loginPage();
            this.attachLoginListeners();
        } else {
            sidebar.style.display = 'block';
            
            switch (page) {
                case 'add':
                    container.innerHTML = AdminPages.addPage();
                    this.attachAddPageListeners();
                    break;
                case 'list':
                    AdminStore.fetchFoodList().then(() => {
                        container.innerHTML = AdminPages.listPage();
                        this.attachListPageListeners();
                    });
                    break;
                case 'orders':
                    AdminStore.fetchOrders().then(() => {
                        container.innerHTML = AdminPages.ordersPage();
                        this.attachOrdersPageListeners();
                    });
                    break;
            }
            
            // Update sidebar active state
            document.querySelectorAll('.sidebar-menu li').forEach(li => {
                li.classList.remove('active');
            });
            document.querySelector(`.sidebar-menu li[data-page="${page}"]`).classList.add('active');
        }
        
        this.currentPage = page;
    },
    
    attachLoginListeners() {
        const form = document.getElementById('admin-login-form');
        if (!form) {
            console.error('Login form not found!');
            return;
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Login form submitted');
            
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            
            console.log('Email:', email);
            console.log('Password length:', password.length);
            
            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            console.log('Calling AdminStore.login...');
            const result = await AdminStore.login(email, password);
            console.log('Login result:', result);
            
            if (result.success) {
                showToast('Login Successfully', 'success');
                this.renderPage('add');
            } else {
                showToast(result.message || 'Login failed', 'error');
            }
        });
    },
    
    attachAddPageListeners() {
        const imageInput = document.getElementById('food-image');
        const imagePreview = document.getElementById('image-preview');
        const imageUploadDiv = document.querySelector('.add-img-upload');
        const form = document.getElementById('add-food-form');
        
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                imagePreview.src = URL.createObjectURL(file);
            }
        });
        
        // Click anywhere on the upload box to open file picker
        imageUploadDiv.addEventListener('click', (e) => {
            imageInput.click();
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('name', document.getElementById('food-name').value);
            formData.append('description', document.getElementById('food-desc').value);
            formData.append('price', Number(document.getElementById('food-price').value));
            formData.append('category', document.getElementById('food-category').value);
            formData.append('image', imageInput.files[0]);
            
            const response = await AdminStore.addFood(formData);
            if (response.success) {
                showToast(response.message, 'success');
                form.reset();
                imagePreview.src = 'src/assets/upload_area.png';
            } else {
                showToast(response.message, 'error');
            }
        });
    },
    
    attachListPageListeners() {
        const removeButtons = document.querySelectorAll('.remove-food');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const foodId = btn.dataset.id;
                const response = await AdminStore.removeFood(foodId);
                if (response.success) {
                    showToast(response.message, 'success');
                    this.renderPage('list');
                } else {
                    showToast('Error', 'error');
                }
            });
        });
    },
    
    attachOrdersPageListeners() {
        const statusSelects = document.querySelectorAll('.order-status');
        statusSelects.forEach(select => {
            select.addEventListener('change', async (e) => {
                const orderId = select.dataset.id;
                const status = e.target.value;
                const response = await AdminStore.updateOrderStatus(orderId, status);
                if (response.success) {
                    showToast(response.message, 'success');
                    // Refresh the orders page to show updated status
                    setTimeout(() => {
                        this.renderPage('orders');
                    }, 500);
                } else {
                    showToast('Error', 'error');
                }
            });
        });
    },
    
    attachSidebarListeners() {
        document.querySelectorAll('.sidebar-menu li').forEach(li => {
            li.addEventListener('click', () => {
                const page = li.dataset.page;
                this.renderPage(page);
            });
        });
    },
};
