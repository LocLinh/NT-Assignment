const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");

if (sessionStorage.itemCount && Object.keys(JSON.parse(sessionStorage.itemCount)).length > 0) {
    var cartItems = JSON.parse(sessionStorage.itemCount);
    var sumItems = obj => Object.values(obj).reduce((sum, currValue) => sum + currValue, 0);
    var allItems = sumItems(cartItems);
    document.getElementById("cart-items-counter").innerHTML = allItems;
}
else {
    sessionStorage.setItem("itemCount", JSON.stringify({}))
    document.getElementById("cart-items-counter").innerHTML = 0;
}

searchBtn.onclick = () => {
    if (document.querySelector(".input-search").value.length == 0) {
        document.querySelector(".input-search").focus();
    }
    else {
        document.querySelector(".input-search").value = "";
        // do search request here
    }
}
