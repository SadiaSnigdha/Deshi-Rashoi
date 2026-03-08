// Admin App - initialize
document.addEventListener('DOMContentLoaded', async () => {
    await AdminStore.init();
    
    AdminRouter.init();
    AdminRouter.attachSidebarListeners();
    
    AdminStore.subscribe(() => {
        if (!AdminStore.state.token || !AdminStore.state.admin) {
            AdminRouter.renderPage('login');
        }
    });
});
