const addItem = (categoryId) => {
    var badge = document.getElementById("cart-items-counter");
    var cartItems = JSON.parse(sessionStorage.itemCount);

    if (categoryId in cartItems) {
        cartItems[categoryId] += 1;
    }
    else {
        cartItems[categoryId] = 1;
    }

    var sumItems = obj => Object.values(obj).reduce((sum, currValue) => sum + currValue, 0);
    var allItems = sumItems(cartItems)

    if (allItems >= 99) {
        badge.innerHTML = "99+";
    }
    else {
        badge.innerHTML = allItems;
    }
    sessionStorage.setItem("itemCount", JSON.stringify(cartItems))
    //console.log(sessionStorage.itemCount);
}