let isHamburgerOpen = false
const openHamburger = () => {
    let hamburgerItemsElement = document.getElementById("hamburger-items")

    if (!isHamburgerOpen) {
        hamburgerItemsElement.style.display = "block";
        isHamburgerOpen = true
    } else {
        hamburgerItemsElement.style.display = "none";
        isHamburgerOpen = false
    }
};