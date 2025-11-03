        // Mobile menu drawer toggle
        const openMenuBtn = document.getElementById('openMenu');
        const menuDrawer = document.getElementById('menuDrawer');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.getElementById('closeMenu');

        if (openMenuBtn) {
            openMenuBtn.addEventListener('click', () => {
                menuDrawer.classList.add('active');
                menuOverlay.classList.add('active');
            });
        }
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                menuDrawer.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                menuDrawer.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }

        // Mobile submenu toggles
        const faceCareMenu = document.getElementById('faceCareMenu');
        const faceCareSubmenu = document.getElementById('faceCareSubmenu');
        const bodyCareMenu = document.getElementById('bodyCareMenu');
        const bodyCareSubmenu = document.getElementById('bodyCareSubmenu');

        if (faceCareMenu) {
            faceCareMenu.addEventListener('click', () => {
                faceCareSubmenu.classList.toggle('active');
            });
        }
        if (bodyCareMenu) {
            bodyCareMenu.addEventListener('click', () => {
                bodyCareSubmenu.classList.toggle('active');
            });
        }

        // Prevent dropdown from immediately closing if clicking inside (works with data-bs-auto-close="outside")
        // For desktop hover the CSS handles visibility; for mobile/touch, bootstrap handles toggling on click.
