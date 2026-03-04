// Admin App - initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize store
    await AdminStore.init();
    
    // Initialize router
    AdminRouter.init();
    AdminRouter.attachSidebarListeners();
    
    // Subscribe to store changes
    AdminStore.subscribe(() => {
        if (!AdminStore.state.token || !AdminStore.state.admin) {
            AdminRouter.renderPage('login');
        }
    });
});
