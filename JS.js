document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("menubutton1");
    const menu = document.getElementById("menu1");
    const menuItems = menu.querySelectorAll("[role='menuitem']");
    let currentIndex = 0;
    let menuOpen = false;

    function openMenu() {
        menu.style.display = "block";
        button.setAttribute("aria-expanded", "true");
        menuItems[currentIndex].focus();
        menuOpen = true;
    }

    function closeMenu() {
        menu.style.display = "none";
        button.setAttribute("aria-expanded", "false");
        button.focus();
        menuOpen = false;
    }

    function updateFocus(newIndex) {
        menuItems[currentIndex].setAttribute("tabindex", "-1");
        menuItems[newIndex].setAttribute("tabindex", "0");
        menuItems[newIndex].focus();
        currentIndex = newIndex;
    }

    // Keyboard Navigation
    button.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openMenu();
        }
    });

    menu.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            updateFocus((currentIndex + 1) % menuItems.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            updateFocus((currentIndex - 1 + menuItems.length) % menuItems.length);
        } else if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("action_output").value = menuItems[currentIndex].textContent;
            closeMenu();
        } else if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Mouse Events
    button.addEventListener("click", () => {
        menuOpen ? closeMenu() : openMenu();
    });

    menuItems.forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            updateFocus(index);
        });

        item.addEventListener("click", () => {
            document.getElementById("action_output").value = item.textContent;
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!button.contains(event.target) && !menu.contains(event.target)) {
            closeMenu();
        }
    });
});
